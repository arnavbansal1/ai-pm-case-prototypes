import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
import sys
from playwright.sync_api import sync_playwright
url=sys.argv[1] if len(sys.argv)>1 else (ROOT / "app/index.html").as_uri()
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"]);pg=b.new_page(viewport={"width":1600,"height":1000})
    pg.goto(url);pg.wait_for_timeout(1000)
    kp=lambda: " | ".join(t.strip().replace("\n"," ") for t in pg.locator("#evalBody .kpi").all_inner_texts()[:4])
    print("at load:   ",kp())
    pg.locator("tr.row",has_text="Indianapolis · employees").click();pg.locator("#detail input[name=pick]").first.check();pg.fill("#decNote","x");pg.locator("#resolveBtn").click();pg.wait_for_timeout(200)
    pg.locator("tr.row",has_text="Workers compensation losses").click();pg.wait_for_timeout(200);pg.locator("#simBtn").click();pg.wait_for_timeout(300)
    print("after demo:",kp())
    b.close()
