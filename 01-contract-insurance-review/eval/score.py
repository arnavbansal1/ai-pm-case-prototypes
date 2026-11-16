import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
"""Score a Contract B extraction against the frozen answer_key_b_v2.json.
Stage 1 = extraction; Stage 2 = statuses from the app's own (unchanged) rules, computed by loading the app headlessly."""
import json, sys, re
from playwright.sync_api import sync_playwright
KEY = json.load(open(ROOT / "eval/answer_key_b_v2.json"))
ext = json.load(open(sys.argv[1]))
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"]); pg = b.new_page()
    pg.goto((ROOT / "app/index.html").as_uri() + "#contract-b")
    app = pg.evaluate("(x)=>{build(x,'claude'); return {F:FINDINGS.map(({loc,...f})=>({...f, locRef: loc&&loc.ref, verified: !!loc})), EXT:EXT.map(({loc,...e})=>({...e, locRef: loc&&loc.ref})), OOS:OOS.map(({loc,...o})=>({...o, locRef: loc&&loc.ref}))}}", ext)
    b.close()
F, EXT, OOS = app["F"], app["EXT"], app["OOS"]
reqs = ext.get("requirements", [])
out = {"stage1": {}, "stage2": [], "details": {}}
used = set(); rows = []
for k in KEY["in_scope_requirements"]:
    cands = [f for f in F if f["type"] == k["type"] and (k.get("line") is None or f.get("line") == k["line"])]
    rows.append((k, cands))
    for c in cands: used.add(c["id"])
found = [r for r in rows if r[1]]
# GL conflict
glk, glc = rows[0]
gl_refs = {c["locRef"] for c in glc}
gl_vals = [c.get("extracted", {}) for c in glc]
eff = any(v.get("per_occurrence") == 2000000 and v.get("aggregate") == 4000000 for v in gl_vals)
txt = json.dumps(glc).lower()
flag = bool(re.search(r"conflict|more stringent|stricter|1\.3|exhibit d|inconsisten|differ", txt))
if eff and {"12.2(a)", "D.2"} <= gl_refs | set(re.findall(r"12\.2\(a\)|d\.2", txt.upper().replace("D.2","D.2"))) and flag: gl = "FULL (a)"
elif {"12.2(a)", "D.2"} <= gl_refs and flag: gl = "FULL (b)"
elif glc: gl = "PARTIAL"
else: gl = "FAIL"
# AI ambiguity
aik, aic = rows[1]
if not aic: ai = "FAIL (not extracted)"
else:
    c = aic[0]; scope = (c.get("extracted") or {}).get("scope")
    asserts_specific = scope in (["ongoing"], ["completed"])
    ai = "FAIL (asserted specific scope)" if asserts_specific else ("FAIL (marked Met)" if c["status"] == "met" else "PASS")
    out["details"]["ai_scope_extracted"] = scope; out["details"]["ai_confidence"] = c.get("confidence"); out["details"]["ai_plain"] = c.get("plain")
# out of scope surfaced
all_refs = {o["locRef"] for o in OOS} | {f["locRef"] for f in F}
oos_rows = [(k["key"], any(r in all_refs for r in k["refs"])) for k in KEY["out_of_scope_requirements_must_be_surfaced"]]
ext_found = any(e["locRef"] == "12.8" for e in EXT)
trap = "6.2" in all_refs or any("6.2" == (e.get("locRef")) for e in EXT)
key_refs = {r for k in KEY["in_scope_requirements"] + KEY["out_of_scope_requirements_must_be_surfaced"] + KEY["external_references"] for r in k["refs"]}
extra_reqs = [f"{f['title']} ({f['type']}, {f['locRef'] or f.get('ref')})" for f in F if f["id"] not in used]
extra_oos = [f"{o.get('title')} ({o['locRef'] or o.get('ref')})" for o in OOS if o["locRef"] not in key_refs]
extra_ext = [f"{e.get('document')} ({e['locRef'] or e.get('ref')})" for e in EXT if e["locRef"] != "12.8"]
total = len(KEY["in_scope_requirements"]) + len(oos_rows) + 1
nfound = len(found) + sum(1 for _, x in oos_rows if x) + (1 if ext_found else 0)
verified = [c for _, cs in found for c in cs]
out["stage1"] = {"FOUND/TOTAL": f"{nfound}/{total}",
  "in_scope_found": f"{len(found)}/{len(rows)}", "out_of_scope_surfaced": f"{sum(1 for _,x in oos_rows if x)}/{len(oos_rows)}",
  "MISSED": [k["key"] for k, c in rows if not c] + [k for k, x in oos_rows if not x] + ([] if ext_found else ["External ref 12.8"]),
  "EXTRA": extra_reqs + extra_oos + extra_ext,
  "quotes_verified (in-scope items)": f"{sum(1 for c in verified if c['verified'])}/{len(verified)}",
  "refs_correct (in-scope)": f"{sum(1 for k,cs in found if any(c['locRef'] in k['refs'] for c in cs))}/{len(found)}",
  "unverified_oos_or_ext_quotes": [o.get("title") for o in OOS if not o["locRef"]] + [e.get("document") for e in EXT if not e["locRef"]],
  "GL_conflict": gl, "GL_entries": [{"ref": c["locRef"], "values": c.get("extracted"), "status": c["status"], "conf": c.get("confidence")} for c in glc],
  "AI_ambiguity": ai, "external_ref_12.8": "FOUND" if ext_found else "MISSED", "false_positive_trap_6.2": "TRIGGERED" if trap else "AVOIDED",
  "WOS_lines": [ (c.get("extracted") or {}).get("lines") for c in rows[2][1] ],
  "excess_allowed_term": ext.get("contract_terms", {}).get("excess_allowed")}
for k, cs in rows:
    if not cs: out["stage2"].append({"item": k["key"], "result": "not scorable (missed in stage 1)"}); continue
    for c in cs:
        st = c["status"]; res = "correct" if st in k["correct_status"] else ("acceptable" if st in k["acceptable_status"] else "INCORRECT")
        out["stage2"].append({"item": k["key"], "ref": c["locRef"], "status": st, "result": res, "reason": c["reason"]})
print(json.dumps(out, indent=1, ensure_ascii=False))
