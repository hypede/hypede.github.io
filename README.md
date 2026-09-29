# hypede.github.io

The website of [HypeDE](https://github.com/hypede/hypede): GNOME, reshaped into a Chrome OS–style desktop.

Plain static HTML, served by GitHub Pages from the `main` branch.

```
index.html          English page
ru/index.html       Russian page
assets/site.css     styles (light and dark)
assets/site.js      the page's shelf: clock, launcher search, copy buttons
assets/calculator.js  the same calculator HypeDE's launcher uses
assets/img/         screenshots (WebP) and artwork from the main repository
```

Preview locally with `python3 -m http.server` and open http://localhost:8000.

Screenshots come from `docs/images` in the main repository
(`tools/dev/screenshots.sh`), converted to WebP.
