import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
"""End-to-end UI test on the demo client: every field renders, evidence highlights, resolve / acknowledge / undo,
Missing can't be overridden, gate blocks until everything is resolved, document-received flow, export, no console errors."""
import json
from playwright.sync_api import sync_playwright
APP = (ROOT / "app/index.html").as_uri()
out = str(ROOT / "docs/img") + "/"
def check(cond, msg):
    print(("PASS " if cond else "FAIL ") + msg); return cond
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
    pg = b.new_page(viewport={"width": 1600, "height": 1000}, device_scale_factor=1.25)
    errs = []; pg.on("pageerror", lambda e: errs.append(str(e))); pg.on("console", lambda m: m.type == "error" and errs.append(m.text))
    pg.goto(APP); pg.wait_for_timeout(1200)
    ok = True
    rows = pg.locator("tr.row"); ok &= check(rows.count() == 16, f"16 field rows rendered ({rows.count()})")
    rb = pg.locator("#readyBtn"); ok &= check(rb.is_disabled(), "Ready to market disabled at start: " + rb.inner_text())
    pg.screenshot(path=out + "ui_01_start.png")
    # Fort Wayne payroll: email supersedes
    pg.locator("tr.row", has_text="Fort Wayne · payroll").click(); pg.wait_for_timeout(300)
    ok &= check("all 5 hold" in pg.locator("#detail").inner_text(), "Fort Wayne payroll shows all 5 conditions hold")
    pg.locator("#detail tr.clk", has_text="Email").first.click(); pg.wait_for_timeout(400)
    ok &= check(pg.locator("#docs mark.on").count() >= 1, "clicking email evidence highlights the quote in the source")
    pg.screenshot(path=out + "ui_02_email_supersedes.png")
    # Indianapolis employees: unauthorized sender conflict -> resolve
    pg.locator("tr.row", has_text="Indianapolis · employees").click(); pg.wait_for_timeout(300)
    ok &= check("not an authorized client contact" in pg.locator("#detail").inner_text(), "unauthorized sender explained")
    pg.screenshot(path=out + "ui_03_authority_conflict.png")
    pg.locator("#resolveBtn").click(); pg.wait_for_timeout(200)
    ok &= check("Indianapolis · employees" in pg.locator("#detail h3").inner_text() and pg.locator("#resolveBtn").count() == 1, "resolve without a pick is refused")
    pg.locator("#detail input[name=pick]").first.check(); pg.locator("#resolveBtn").click(); pg.wait_for_timeout(200)
    ok &= check(pg.locator("#resolveBtn").count() == 1, "resolve without a note is refused")
    pg.fill("#decNote", "Confirmed 64 with Elena; AP mailbox count included contractors."); pg.locator("#resolveBtn").click(); pg.wait_for_timeout(300)
    ok &= check(pg.locator("#undoBtn").count() == 1, "conflict resolved with note")
    # undo then redo
    pg.locator("#undoBtn").click(); pg.wait_for_timeout(200); ok &= check(pg.locator("#resolveBtn").count() == 1, "undo restores the conflict")
    pg.locator("#detail input[name=pick]").first.check(); pg.fill("#decNote", "Confirmed 64 with Elena; AP mailbox count included contractors."); pg.locator("#resolveBtn").click(); pg.wait_for_timeout(300)
    # total employees should now reconcile (149 = sum) -> Minor change after child resolved
    pg.locator("tr.row", has_text="Total employees").click(); pg.wait_for_timeout(300)
    st = pg.locator("#detail .pill").first.inner_text(); ok &= check(st in ("Minor change", "Confirmed", "Material change"), f"total employees recomputed after the location was resolved -> {st}")
    # total payroll: sum mismatch -> resolve with computed sum
    pg.locator("tr.row", has_text="Total payroll").click(); pg.wait_for_timeout(300)
    txt = pg.locator("#detail").inner_text(); ok &= check("add up to $7,580,000" in txt, "total payroll conflict shows locations sum $7,580,000")
    pg.screenshot(path=out + "ui_04_totals_conflict.png")
    pg.locator("#detail label.opt", has_text="Sum of locations").locator("input").check(); pg.fill("#decNote", "File total predates the Fort Wayne correction; use the sum."); pg.locator("#resolveBtn").click(); pg.wait_for_timeout(300)
    # acknowledge material changes
    for name in ["Lafayette · new location", "Commercial auto losses"]:
        pg.locator("tr.row", has_text=name).click(); pg.wait_for_timeout(250); pg.locator("#ackBtn").click(); pg.wait_for_timeout(250)
        ok &= check(pg.locator("#undoBtn").count() == 1, f"acknowledged: {name}")
    pg.locator("tr.row", has_text="Lafayette · new location").click(); pg.wait_for_timeout(250)
    pg.screenshot(path=out + "ui_05_material_ack.png")
    # Missing WC: no override path; gate still blocked
    pg.locator("tr.row", has_text="Workers compensation losses").click(); pg.wait_for_timeout(300)
    ok &= check(pg.locator("#resolveBtn").count() == 0 and pg.locator("#ovBtn").count() == 0, "Missing has no resolve/override")
    ok &= check(rb.is_disabled() and "(1)" in rb.inner_text(), "gate still blocked by the missing document: " + rb.inner_text())
    pg.screenshot(path=out + "ui_06_missing_blocks.png")
    # follow-ups panel
    pg.locator("#fuBox summary").click(); pg.wait_for_timeout(200)
    ok &= check("loss runs" in pg.locator("#fuBody").inner_text().lower(), "client follow-up drafted for the missing loss runs")
    # document received -> gate opens
    pg.locator("#simBtn").click(); pg.wait_for_timeout(500)
    st = pg.locator("tr.row", has_text="Workers compensation losses").locator(".pill").inner_text()
    ok &= check(st in ("Minor change", "Confirmed"), f"WC re-reconciled after the document arrived -> {st}")
    ok &= check(not rb.is_disabled(), "Ready to market enabled once everything is resolved: " + rb.inner_text())
    pg.locator("tr.row", has_text="Workers compensation losses").click(); pg.wait_for_timeout(300)
    pg.screenshot(path=out + "ui_07_ready.png")
    rb.click(); pg.wait_for_timeout(300)
    ok &= check(pg.locator("#modal.show").count() == 1 and "Submission package" in pg.locator("#mbox").inner_text(), "submission package opens")
    pg.locator("#copyJson").click(); pg.wait_for_timeout(200)
    js = json.loads(pg.locator("#jsonOut").inner_text()); ok &= check(len(js["facts"]) == 16 and all(f["value"] is not None for f in js["facts"]), "export has 16 facts, all with values and sources")
    pg.screenshot(path=out + "ui_08_package.png", full_page=False)
    pg.locator("#closeM").click()
    # blind client: inject oracle, gate blocked by WC missing, no simulate button
    pg.evaluate("ex=>window.__engine.load('blind',ex)", json.load(open(ROOT / "tests/blind_oracle_extraction.json"))); pg.wait_for_timeout(500)
    pg.locator("tr.row", has_text="Dayton · employees").click(); pg.wait_for_timeout(300)
    pg.screenshot(path=out + "ui_09_blind_dayton.png")
    pg.locator("tr.row", has_text="Power units").click(); pg.wait_for_timeout(300)
    pg.screenshot(path=out + "ui_10_blind_fleet.png")
    pg.locator("tr.row", has_text="Workers compensation losses").click(); pg.wait_for_timeout(300)
    ok &= check(pg.locator("#simBtn").count() == 0 and rb.is_disabled(), "blind: WC missing blocks; no demo shortcut")
    pg.locator("#evalBox summary").scroll_into_view_if_needed(); pg.wait_for_timeout(200)
    pg.locator("#forceBtn").click(); pg.wait_for_timeout(300)
    ok &= check("16/16 fields unchanged" in pg.locator("#evalBody").inner_text(), "forced-high replay: 16/16 unchanged")
    pg.locator("#evalBox").screenshot(path=out + "ui_11_scorecard.png")
    ok &= check(not errs, f"no console errors {errs}")
    print("ALL PASS" if ok else "SOME FAILED")
    b.close()
