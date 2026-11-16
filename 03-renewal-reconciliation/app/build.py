import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
import json, hashlib, pathlib, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from content import HOW_HTML, PROD_HTML
C = pathlib.Path(ROOT / 'case')
def j(n): return json.loads((C / n).read_text())
def sha(n): return hashlib.sha256((C / n).read_bytes()).hexdigest()
data = {"dev": j('dev_sources.json'), "blind": j('blind_sources_v1.json')}
keys = {"dev": j('dev_key.json'), "blind": j('blind_key_v1.json')}
saved_path = C / 'dev_saved_extraction.json'
sv = json.loads(saved_path.read_text()); held = sv.pop("held", {})
saved = {"dev": sv, "blind": None}
block = (f"const DATA={json.dumps(data)};\nconst KEYS={json.dumps(keys)};\n"
         f"const KEY_SHA={json.dumps({'blind': sha('blind_key_v1.json'), 'dev': sha('dev_key.json')})};\n"
         f"const SAVED={json.dumps(saved)};\nconst SAVED_HELD={json.dumps({'dev': held})};\nconst HOW_HTML={json.dumps(HOW_HTML)};\nconst PROD_HTML={json.dumps(PROD_HTML)};\n")
def assemble(src):
    """Put the page back together from its source parts: template + stylesheet + script."""
    return ((src/'app.html').read_text()
            .replace('/*__STYLES__*/', (src/'styles.css').read_text().rstrip('\n'))
            .replace('/*__SCRIPT__*/', (src/'app.js').read_text().rstrip('\n')))
body = assemble(ROOT / 'app' / 'src')
out = body.replace('/*__DATA__*/', block)
pathlib.Path(ROOT / 'app/index.html').write_text(out)
print('built', len(out), 'bytes; blind key sha', sha('blind_key_v1.json')[:12])
