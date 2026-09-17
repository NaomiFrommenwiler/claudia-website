#!/usr/bin/env python3
"""Builds a single self-contained .html — stylesheet, script and every
photograph inlined. One file, opens anywhere.
    python3 build-standalone.py [output-name.html]"""
import base64, mimetypes, pathlib, re, sys
here = pathlib.Path(__file__).parent
out  = here / (sys.argv[1] if len(sys.argv) > 1 else 'claudia-website-standalone.html')
html = (here/'index.html').read_text(encoding='utf-8')
css  = (here/'css/style.css').read_text(encoding='utf-8')
js   = (here/'js/main.js').read_text(encoding='utf-8')

def data_uri(rel):
    p = here/rel
    mime = mimetypes.guess_type(p.name)[0] or 'application/octet-stream'
    return 'data:%s;base64,%s' % (mime, base64.b64encode(p.read_bytes()).decode())

# plain replace, not re.sub: the CSS and JS contain backslashes a regex
# replacement template would read as escapes
html = html.replace('<link rel="stylesheet" href="css/style.css">', '<style>\n'+css+'\n</style>')
html = html.replace('<script src="js/main.js"></script>', '<script>\n'+js+'\n</script>')
# images referenced from the HTML, and from inside the now-inlined CSS
for rel in sorted({m for m in re.findall(r'(?:src|href)="(images/[^"]+)"', html)}):
    html = html.replace('"%s"' % rel, '"%s"' % data_uri(rel))
for rel in sorted({m for m in re.findall(r"url\('\.\./(images/[^']+)'\)", html)}):
    html = html.replace("url('../%s')" % rel, "url('%s')" % data_uri(rel))
out.write_text(html, encoding='utf-8')
print('%s — %.1f MB' % (out.name, out.stat().st_size/1024/1024))
