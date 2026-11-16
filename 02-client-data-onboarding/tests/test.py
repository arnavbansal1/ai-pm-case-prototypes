import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
import sys
from playwright.sync_api import sync_playwright
ok=True
def check(n,c):
    global ok; ok&=bool(c); print(("PASS " if c else "FAIL ")+n)
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"]); errs=[]
    pg=b.new_page(viewport={"width":1440,"height":900}); pg.on("pageerror",lambda e: errs.append(str(e))); pg.on("console",lambda m: errs.append(m.text) if m.type=="error" else None)
    pg.goto((ROOT / "app/index.html").as_uri() + "#sample")
    n=pg.locator("article.card").count(); check(f"16 column cards ({n})", n==16)
    tiers=pg.evaluate("()=>COLS.map(c=>c.column+'='+c.tier)"); print("  ", tiers)
    print("  chips:", pg.inner_text("#chips").replace("\n"," "), "| progress:", pg.inner_text("#progress-text"))
    print("  eval:", pg.evaluate("()=>{const {rows,...s}=EVAL; return s}"))
    pay=pg.evaluate("()=>{const c=COLS.find(c=>c.column==='Payroll'); return [c.tier,c.reasons,c.suggestion&&c.suggestion.label]}"); print("  Payroll:", pay)
    check("Payroll routed to Review with x12 fix", pay[0]=="review" and pay[2] and "12" in pay[2])
    for col in ["TIV","Const","Region Mgr","Postal","ST"]:
        print("  ", col, pg.evaluate(f"()=>{{const c=COLS.find(c=>c.column==='{col}'); return c.tier+' | '+c.reasons.join('; ')}}"))
    # click card highlights source column
    idx=pg.evaluate("()=>COLS.find(c=>c.column==='Payroll').idx")
    pg.locator(f"#card-{idx} .card-head h2").click(); check("card click highlights source column", pg.locator("#source-view th.hl").inner_text().endswith("Payroll"))
    # approve with fix
    pg.click(f"#card-{idx} button[data-act=approve-fix]"); check("approve with fix recorded", "Multiply by 12" in pg.inner_text(f"#card-{idx} .decision"))
    # ignore unknown
    ui=pg.evaluate("()=>COLS.find(c=>c.column==='Region Mgr').idx"); pg.click(f"#card-{ui} button[data-act=ignore]"); check("ignore recorded", "Ignored" in pg.inner_text(f"#card-{ui} .decision"))
    # change field then undo
    ti=pg.evaluate("()=>COLS.find(c=>c.column==='TIV').idx"); pg.click(f"#card-{ti} button[data-act=change]"); pg.select_option(f"#chg-{ti}","building_value"); pg.click(f"#card-{ti} button[data-act=save-change]")
    check("change recorded", "Changed" in pg.inner_text(f"#card-{ti} .decision")); pg.click(f"#card-{ti} button[data-act=undo]"); check("undo restores", pg.locator(f"#card-{ti} button[data-act=approve]").count()==1)
    pg.click(f"#card-{ti} button[data-act=approve]")
    print("  progress:", pg.inner_text("#progress-text"))
    pg.click(".tab[data-tab=preview]"); print("  preview:", pg.inner_text(".pv-sum"))
    check("payroll annualized in preview", "$738,000" in pg.inner_text("#preview-view"))
    check("ZIP normalized (02134, 80202)", "02134" in pg.inner_text("#preview-view") and "80202" in pg.inner_text("#preview-view"))
    pg.screenshot(path=str(ROOT / "docs/img") + "/" + "shot_preview.png")
    pg.click(".tab[data-tab=source]"); pg.evaluate("document.getElementById('findings-pane').scrollTop=0"); pg.screenshot(path=str(ROOT / "docs/img") + "/" + "shot_main.png")
    check("no console errors", not errs); print("  errors:", errs[:3])
    b.close()
print("ALL PASS" if ok else "SOME FAILED")
