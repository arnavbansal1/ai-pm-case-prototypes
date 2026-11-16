"""Build: assemble app/src (template, stylesheet, script) into the single page app/index.html."""
import pathlib
HERE = pathlib.Path(__file__).resolve().parent
def assemble(src):
    """Put the page back together from its source parts: template + stylesheet + script."""
    return ((src/'app.html').read_text()
            .replace('/*__STYLES__*/', (src/'styles.css').read_text().rstrip('\n'))
            .replace('/*__SCRIPT__*/', (src/'app.js').read_text().rstrip('\n')))
out = assemble(HERE/'src'); (HERE/'index.html').write_text(out); print('built', len(out), 'bytes')
