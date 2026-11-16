import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
"""Offline engine test: dev saved run, blind oracle extraction, forced-high, adversarial variants.
Usage: python3 -I engine_test.py"""
import json, copy
from playwright.sync_api import sync_playwright
APP = (ROOT / "app/index.html").as_uri()
oracle = json.load(open(ROOT / "tests/blind_oracle_extraction.json"))
dev_saved = json.load(open(ROOT / "case/dev_saved_extraction.json"))

def run(pg, ds, ex):
    return pg.evaluate("""([ds,ex])=>{const E=window.__engine;const D=E.DATA[ds];const X=E.validateExtraction(D,ex);const R=E.runEngine(D,X,{});const sc=E.score(ds,R);
      return {S:sc.S,problems:X.problems,rows:sc.rows.map(r=>({id:r.id,label:r.label,st:r.st,fin:r.fin,why:r.why,exp:r.k.expected_status})),extras:sc.extras,
        whys:Object.fromEntries(Object.values(R.fields).map(f=>[f.id,f.ruleStatus+" :: "+f.why]))}}""", [ds, ex])

def show(name, res, verbose=False):
    S = res['S']
    print(f"\n== {name}: wrongAuto={S['wrongAuto']} mustRouted={S['mustRouted']}/{S['must']} status={S['statusOk']}/{S['n']} prov={S['provOk']}/{S['autoKey']} matFlag={S['matFlag']} problems={len(res['problems'])}")
    for r in res['rows']:
        if verbose or r['label'] != 'Pass':
            print(f"   {r['id']:<26} key={r['exp']:<16} got={str(r['st']):<16} {r['label']} {r['why'] or ''}")
    if res['extras']: print('   extras:', res['extras'])

with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
    pg = b.new_page(viewport={"width": 1500, "height": 950})
    errs = []; pg.on("pageerror", lambda e: errs.append(str(e))); pg.on("console", lambda m: m.type == "error" and errs.append(m.text))
    pg.goto(APP); pg.wait_for_timeout(1200)
    r = run(pg, 'dev', dev_saved); show('DEV saved', r, verbose=True)
    r = run(pg, 'blind', oracle); show('BLIND oracle', r, verbose=True)
    for k, v in r['whys'].items(): print('     ', k, '->', v[:170])
    # forced high + forced low
    for conf in ['high', 'low']:
        x = copy.deepcopy(oracle)
        for o in x['observations']: o['confidence'] = conf
        show(f'BLIND oracle, confidence forced {conf}', run(pg, 'blind', x))
    # adversarial cases: each must give 0 wrong auto-resolutions
    adv = {}
    x = copy.deepcopy(oracle); x['observations'][14]['quote'] = 'Dayton headcount is 44, not 35'; adv['fake quote on the Dayton email'] = x
    x = copy.deepcopy(oracle); x['observations'][14]['location'] = None; adv['Dayton email mis-scoped to the whole account'] = x
    x = copy.deepcopy(oracle); del x['observations'][15]; adv['AI drops the vague fleet email'] = x
    x = copy.deepcopy(oracle); del x['observations'][12]; adv['AI drops the Columbus monthly-payroll email'] = x
    x = copy.deepcopy(oracle); x['observations'][12]['period'] = 'annual'; adv['AI mislabels monthly payroll as annual'] = x
    x = copy.deepcopy(oracle); x['observations'][13]['doc'] = 'email_9'; adv['unknown document id'] = x
    x = copy.deepcopy(oracle); x['observations'][14]['value'] = 'forty-two'; adv['non-numeric value'] = x
    x = copy.deepcopy(oracle); x['observations'][14]['explicit'] = 'true'; x['observations'][14]['value'] = '42'; adv['string booleans and numbers'] = x
    x = copy.deepcopy(oracle); x['loss_lines'].append({"doc": "loss_runs", "line": "WC", "valued": "2026-10-01", "quote": "Workers comp clean", "claims": []}); adv['AI invents WC loss runs'] = x
    x = copy.deepcopy(oracle); x['loss_lines'][1]['claims'] = x['loss_lines'][1]['claims'][:1]; adv['AI drops the open auto claim'] = x
    x = copy.deepcopy(oracle); x['observations'] = [o for o in x['observations'] if o['doc'] != 'prior_policy']; adv['AI drops all prior-year values'] = x
    x = copy.deepcopy(oracle); x['observations'].append(dict(x['observations'][14])); adv['duplicate observation'] = x
    adv['empty output'] = {}
    adv['not an object'] = []
    x = copy.deepcopy(oracle); x['observations'][13]['value'] = 18; x['observations'][15]['value'] = 18; x['observations'][15]['explicit'] = True; x['observations'][15]['quote'] = 'we may be adding a couple more trucks before January'; adv['AI over-reads the vague email as explicit 18'] = x
    print('\n== ADVERSARIAL (each must have wrongAuto=0 and full must-review routing)')
    bad = 0
    for name, x in adv.items():
        res = run(pg, 'blind', x); S = res['S']; ok = S['wrongAuto'] == 0 and S['mustRouted'] == S['must']
        bad += 0 if ok else 1
        print(f"   {'PASS' if ok else 'FAIL'} {name:<52} wrongAuto={S['wrongAuto']} routed={S['mustRouted']}/{S['must']} status={S['statusOk']}/{S['n']} problems={len(res['problems'])}")
        if not ok:
            for r in res['rows']:
                if r['label'] not in ('Pass',) : print('        ', r['id'], r['label'], r['why'])
    print('\nadversarial failures:', bad, '| page errors:', errs)
    b.close()
