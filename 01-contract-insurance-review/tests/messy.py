import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"]); pg=b.new_page(); errs=[]
    pg.on("pageerror", lambda e: errs.append(str(e)))
    pg.goto((ROOT / "app/index.html").as_uri())
    print("empty state:", pg.inner_text("#cards")[:60], "| progress:", pg.inner_text("#progress-text"))
    r=pg.evaluate("""()=>{ const x=JSON.parse(JSON.stringify(SAMPLE_EXTRACTION));
      x.requirements[1].quote=x.requirements[1].quote.replace(/\\u2019/g,"'");           // straight apostrophe
      delete x.requirements[3].confidence;                                               // missing confidence on WOS
      x.requirements[4].quote="Professional liability of at least three million dollars"; // hallucinated quote
      x.requirements.push({id:"gl",type:"insurer_rating",title:"Insurer rating A- VII",ref:"11.1",quote:"with insurers rated A- VII or better by A.M. Best."}); // dup id + unknown type
      x.requirements.splice(5,1);                                                        // drop cyber -> should be MISSED
      build(x,"claude"); return {s:EVAL.summary, st:FINDINGS.map(f=>f.id+':'+f.status), oos:OOS.map(o=>o.title)}; }""")
    print("messy eval:", r["s"]); print("statuses:", r["st"]); print("oos:", r["oos"]); print("eval header:", pg.inner_text(".eval summary")); print("errors:", errs or "none"); b.close()
