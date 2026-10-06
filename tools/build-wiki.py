#!/usr/bin/env python3
"""Собрать вики: wiki-src/{en,ru}/*.md → wiki/*.html и wiki/ru/*.html,
и проставить версии CSS и JS на всех страницах сайта.

Нужен пакет markdown (pip install markdown). Запуск из корня сайта:
    python3 tools/build-wiki.py
"""

import hashlib
import html
import json
import re
from pathlib import Path

import markdown
from markdown.extensions.toc import slugify_unicode

ROOT = Path(__file__).resolve().parents[1]
ORDER = ["index", "launcher", "keys", "windows", "desktop", "modes", "themes", "assistant",
         "settings", "troubleshooting", "developers"]
LANGS = {
    "en": {"out": ROOT / "wiki", "site": "../", "other": "ru/", "other_name": "Русский",
           "search": "Search the wiki", "contents": "On this page", "wiki": "Wiki",
           "edit": "Edit this page", "nothing": "Nothing found", "back": "HypeDE"},
    "ru": {"out": ROOT / "wiki/ru", "site": "../../ru/", "other": "../", "other_name": "English",
           "search": "Поиск по вики", "contents": "На этой странице", "wiki": "Вики",
           "edit": "Исправить страницу", "nothing": "Ничего не найдено", "back": "HypeDE"},
}
TEMPLATE = """<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title} — HypeDE {wiki}</title>
<meta name="description" content="{description}">
<link rel="icon" href="{assets}img/logo.svg" type="image/svg+xml">
<link rel="alternate" hreflang="{other_lang}" href="{other}{page}.html">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Figtree:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap">
<link rel="stylesheet" href="{assets}site.css?v={v_site_css}">
<link rel="stylesheet" href="{assets}wiki.css?v={v_wiki_css}">
<script type="module" src="{assets}wiki.js?v={v_wiki_js}"></script>
</head>
<body class="wiki" data-index="{index_url}" data-nothing="{nothing}">
<header class="wiki-top">
  <a class="brand" href="{site}"><img src="{assets}img/logo.svg" alt="" width="28" height="28">HypeDE <span>{wiki}</span></a>
  <label class="wiki-search"><span class="visually-hidden">{search}</span>
    <input type="search" placeholder="{search}" autocomplete="off"></label>
  <a class="lang" href="{other}{page}.html" hreflang="{other_lang}" lang="{other_lang}">{other_name}</a>
</header>
<div class="wiki-layout">
  <nav class="wiki-nav" aria-label="{wiki}">
    <ul>{nav}</ul>
    <ol class="wiki-results" hidden></ol>
  </nav>
  <main class="wiki-page">
{body}
    <p class="wiki-edit"><a href="https://github.com/hypede/hypede.github.io/edit/main/wiki-src/{lang}/{page}.md">{edit}</a></p>
  </main>
  <aside class="wiki-toc" aria-label="{contents}">
    <span>{contents}</span>
    {toc}
  </aside>
</div>
</body>
</html>
"""


# Версия файла по содержимому: без неё браузер может взять новую страницу и
# старый CSS из кэша (GitHub Pages разрешает кэшировать на 10 минут).
def version(name):
    return hashlib.sha256((ROOT / "assets" / name).read_bytes()).hexdigest()[:10]


VERSIONS = {f"v_{n.replace('.', '_')}": version(n) for n in ("site.css", "site.js", "wiki.css", "wiki.js")}


def stamp_pages():
    for page in (ROOT / "index.html", ROOT / "ru/index.html"):
        text = page.read_text(encoding="utf-8")
        for name in ("site.css", "site.js"):
            text = re.sub(r'(assets/%s)(\?v=\w+)?"' % re.escape(name),
                          lambda m, n=name: f'{m.group(1)}?v={VERSIONS["v_" + n.replace(".", "_")]}"', text)
        page.write_text(text, encoding="utf-8")


def read(path):
    text = path.read_text(encoding="utf-8")
    meta = {}
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    if m:
        for line in m.group(1).splitlines():
            k, _, v = line.partition(":")
            meta[k.strip()] = v.strip()
        text = text[m.end():]
    return meta, text


def build(lang, cfg):
    src = ROOT / "wiki-src" / lang
    out = cfg["out"]
    out.mkdir(parents=True, exist_ok=True)
    assets = "../assets/" if lang == "en" else "../../assets/"
    pages = []
    for name in ORDER:
        meta, text = read(src / f"{name}.md")
        pages.append((name, meta, text))
    index = []
    for name, meta, text in pages:
        md = markdown.Markdown(extensions=["tables", "fenced_code", "toc"],
                               extension_configs={"toc": {"slugify": slugify_unicode, "toc_depth": "2-3"}})
        body = md.convert(text)
        # Кнопка «Копировать» у каждого блока кода.
        body = body.replace("<pre><code>", '<pre class="code"><code>')
        current = ' aria-current="page"'
        nav = "".join(
            f'<li><a href="{n}.html"{current if n == name else ""}>{html.escape(m["title"])}</a></li>'
            for n, m, _ in pages)
        first = re.sub(r"<[^>]+>", "", body.split("</p>", 1)[0].split("</h1>")[-1]).strip()
        page_html = TEMPLATE.format(
            lang=lang, title=html.escape(meta["title"]), wiki=cfg["wiki"], description=html.escape(first[:160]),
            assets=assets, other=cfg["other"], other_lang="ru" if lang == "en" else "en",
            other_name=cfg["other_name"], page=name, site=cfg["site"], search=cfg["search"],
            nav=nav, body=body, toc=md.toc, contents=cfg["contents"], edit=cfg["edit"],
            nothing=cfg["nothing"], index_url="search.json", **VERSIONS)
        (out / f"{name}.html").write_text(page_html, encoding="utf-8")
        for section in re.split(r"(?=<h2)", body):
            h = re.search(r'<h[12][^>]*id="([^"]*)"[^>]*>(.*?)</h[12]>', section)
            plain = html.unescape(re.sub(r"<[^>]+>", " ", section))
            index.append({"page": f"{name}.html", "title": meta["title"],
                          "section": html.unescape(re.sub(r"<[^>]+>", "", h.group(2))) if h else meta["title"],
                          "anchor": h.group(1) if h and h.group(0).startswith("<h2") else "",
                          "text": re.sub(r"\s+", " ", plain).strip()[:2000]})
    (out / "search.json").write_text(json.dumps(index, ensure_ascii=False), encoding="utf-8")
    print(f"{lang}: {len(pages)} pages → {out.relative_to(ROOT)}")


for lang, cfg in LANGS.items():
    build(lang, cfg)
stamp_pages()
