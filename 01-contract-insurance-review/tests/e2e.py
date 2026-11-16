import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
import sys
from playwright.sync_api import sync_playwright
url = (ROOT / "app/index.html").as_uri() + "#sample"
errs = []
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/usr/bin/google-chrome", args=["--no-sandbox"])
    pg = b.new_page(viewport={"width": 1440, "height": 900})
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
    pg.goto(url)
    cards = pg.locator("article.card")
    print("cards:", cards.count())
    for i in range(cards.count()):
        c = cards.nth(i)
        print(" ", c.get_attribute("id"), "|", c.locator(".pill").first.inner_text(), "|", c.locator("h2").inner_text(), "|", c.locator(".ref-link").inner_text(), "| method:", c.locator(".method").inner_text())
    print("chips:", pg.inner_text("#chips").replace("\n"," "), "| progress:", pg.inner_text("#progress-text"))
    print("marks:", pg.locator("mark").count(), "(expect 6 req + 1 ext + 2 oos = 9)")
    print("banner:", pg.locator(".banner").count(), pg.locator(".banner h3").inner_text())
    pg.screenshot(path=str(ROOT / "tests") + "/" + "01_initial.png")

    # click-to-highlight for each finding
    for i in range(cards.count()):
        cid = cards.nth(i).get_attribute("id").replace("card-","")
        pg.locator(f"#card-{cid} .plain").click()
        active = pg.locator("mark.active")
        ok = active.count()==1 and active.get_attribute("id")==f"mark-{cid}"
        print(f"  highlight {cid}: {'OK' if ok else 'FAIL'}")
    # banner click
    pg.locator(".banner").click()
    print("  banner highlight:", pg.locator("mark.active").get_attribute("id"))
    pg.wait_for_timeout(600)
    pg.screenshot(path=str(ROOT / "tests") + "/" + "02_banner.png")
    # contract mark click -> selects card
    pg.locator("#mark-pnc").click()
    print("  contract->card selected:", pg.locator("article.card.selected").get_attribute("id"))

    # Accept first card
    first = cards.nth(0).get_attribute("id").replace("card-","")
    pg.click(f"#card-{first} button[data-act=accept]")
    print("accept:", pg.locator(f"#card-{first} .decision").inner_text().replace("\n"," "), "| progress:", pg.inner_text("#progress-text"))
    # Override gl: review -> met
    pg.click("#card-gl button[data-act=override]")
    pg.select_option("#ov-status-gl", "met"); pg.select_option("#ov-outcome-gl", "satisfied")
    pg.fill("#ov-note-gl", "Umbrella dec page confirms follow form")
    pg.click("#card-gl button[data-act=save-override]")
    print("override:", pg.locator("#card-gl .decision").inner_text().replace("\n"," "), "| pills:", [x for x in pg.locator("#card-gl .pill").all_inner_texts()], "| chips:", pg.inner_text("#chips").replace("\n"," "))
    # Escalate ai
    pg.click("#card-pl button[data-act=escalate]")
    pg.fill("#es-note-pl", "Need carrier confirmation on completed-ops endorsement")
    pg.click("#card-pl button[data-act=save-escalate]")
    print("escalate:", pg.locator("#card-pl .decision").inner_text().replace("\n"," "), "| progress:", pg.inner_text("#progress-text"))
    pg.screenshot(path=str(ROOT / "tests") + "/" + "03_decisions.png", full_page=False)
    # Undo
    pg.click("#card-pl button[data-act=undo]")
    print("undo ai -> buttons back:", pg.locator("#card-pl button[data-act=accept]").count()==1, "| progress:", pg.inner_text("#progress-text"))
    # Cancel form
    pg.click("#card-pnc button[data-act=override]"); pg.click("#card-pnc button[data-act=cancel]")
    print("cancel form ok:", pg.locator("#card-pnc .form").count()==0)
    print("ERRORS:", errs or "none")
    b.close()
