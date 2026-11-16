import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
import json
from playwright.sync_api import sync_playwright
cases = {
 "boolean code map (the live bug)": "x=>{x.mappings.find(m=>m.column==='Sprinklered').transform={type:'code_map',map:{'Y':true,'N':false}};return x}",
 "unknown conversion type": "x=>{x.mappings.find(m=>m.column==='Emp').transform={type:'round_up'};return x}",
 "factor as string '12'": "x=>{x.mappings.find(m=>m.column==='Payroll').transform={type:'multiply',factor:'12'};return x}",
 "factor invalid 'twelve'": "x=>{x.mappings.find(m=>m.column==='Payroll').transform={type:'multiply',factor:'twelve'};return x}",
 "transform null": "x=>{x.mappings.find(m=>m.column==='City').transform=null;return x}",
 "field not in schema": "x=>{x.mappings.find(m=>m.column==='Sq Ft').field='floor_area';return x}",
 "duplicate column entries": "x=>{x.mappings.push({...x.mappings[0],field:'city'});return x}",
 "column not in file": "x=>{x.mappings.push({column:'Ghost',field:'city',transform:{type:'none'},confidence:'high'});return x}",
 "missing columns (AI skipped 3)": "x=>{x.mappings=x.mappings.slice(3);return x}",
 "confidence 'HIGH' / garbage": "x=>{x.mappings[0].confidence='HIGH';x.mappings[1].confidence=7;return x}",
 "mappings not an array": "x=>({mappings:'oops'})",
 "empty object": "x=>({})",
 "code map as array": "x=>{x.mappings.find(m=>m.column==='Const').transform={type:'code_map',map:['NC','JM']};return x}",
 "two columns -> same field": "x=>{x.mappings.find(m=>m.column==='Contents').field='building_value';return x}",
}
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome",args=["--no-sandbox"]); allok=True
    for name, mut in cases.items():
        pg=b.new_page(); errs=[]; pg.on("pageerror",lambda e: errs.append(str(e)))
        pg.goto((ROOT / "app/index.html").as_uri())
        try:
            r=pg.evaluate(f"()=>{{const x=JSON.parse(JSON.stringify(SAMPLE_MAPPING)); build(({mut})(x),'claude'); return {{n:COLS.length, wrongAuto: EVAL?EVAL.wrongAuto:null, tiers: COLS.reduce((a,c)=>(a[c.tier]=(a[c.tier]||0)+1,a),{{}}), cards: document.querySelectorAll('article.card').length}}}}")
            ok = not errs and r["n"]==16 and r["cards"]==16 and (r["wrongAuto"] in (0,None))
        except Exception as e:
            r=str(e)[:120]; ok=False
        allok&=ok; print(("PASS " if ok else "FAIL ")+name, "|", r, "|", errs[:1])
        pg.close()
    b.close(); print("ALL PASS" if allok else "SOME FAILED")
