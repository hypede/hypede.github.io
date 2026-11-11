# hypede.github.io

The website of [HypeDE](https://github.com/hypede/hypede): a Chrome OS–style desktop built on GNOME Shell.

Plain static HTML, served by GitHub Pages from the `main` branch.

```
index.html          English page
ru/index.html       Russian page
assets/site.css     styles (light and dark)
assets/site.js      copy buttons for the install commands
assets/img/         screenshots (WebP) and artwork from the main repository
try/, ru/try/       the in-browser demo of HypeDE
assets/try/         its code (demo.js, demo.css), icons, app icons and wallpapers
```

Preview locally with `python3 -m http.server` and open http://localhost:8000.

Screenshots come from `docs/images` in the main repository
(`tools/dev/screenshots.sh`), converted to WebP.

## Wiki

Pages are written in Markdown in `wiki-src/en` and `wiki-src/ru`. Build them into `wiki/` with:

```
pip install markdown
python3 tools/build-wiki.py
```

The build also stamps `?v=` versions of the site and demo assets into the pages.

## Demo

`try/` is a small imitation of the desktop that runs in the browser: shelf,
launcher (with the calculator and search), quick settings, calendar, Dynamic
Island, windows that snap and minimize, and simplified Files, Terminal,
Settings, Weather, Task Manager and Assistant. Things a browser cannot do
(Wi‑Fi, Bluetooth, installing programs, real files) open a dialog that suggests
installing HypeDE.

The symbolic icons come from the main repository. Rebuild the sprite with:

```
python3 tools/build-try-icons.py ../hypede
```
