#!/usr/bin/env python3
"""Builds preview/ — the same site shaped for the Artifact viewer, which
supplies its own document skeleton. Generated from index.html so the hosted
preview and the site cannot drift.    python3 build-preview.py"""
import pathlib, re, shutil
here = pathlib.Path(__file__).parent
out  = here / 'preview'
src  = (here / 'index.html').read_text(encoding='utf-8')
title = re.search(r'<title>(.*?)</title>', src, re.S).group(1)
fonts = re.search(r'<link href="https://fonts\.googleapis\.com[^>]*>', src).group(0)
body  = re.search(r'<body>(.*)</body>', src, re.S).group(1).strip()
page = (f'<title>{title}</title>\n{fonts}\n'
        '<link rel="stylesheet" href="css/style.css">\n'
        "<script>document.documentElement.classList.add('js')</script>\n\n"
        f'{body}\n')
out.mkdir(exist_ok=True)
(out / 'index.html').write_text(page, encoding='utf-8')
for d in ('css','js','images'):
    shutil.rmtree(out / d, ignore_errors=True)
    shutil.copytree(here / d, out / d)
print('preview/index.html written —', len(page)//1024, 'KB')
