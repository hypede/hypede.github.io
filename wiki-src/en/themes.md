---
title: Themes and the theme store
---
# Themes and the theme store

A theme sets the whole look in one click: colours, wallpaper, shelf, launcher, windows, lock screen,
fonts, icons and sounds. Everything is in *Settings → Personalization*.

## Using themes

- **Apply**: click a theme under *Themes*.
- **Save your look**: *Save current look as a theme*. Your own wallpapers are copied next to it.
- **Export**: *Export current look* writes a `.json` file with your wallpapers packed inside — send
  it to anyone. **Import** adds such a file to your themes.
- **Delete**: hover over your own theme and click the bin.

## The theme store

*Theme store* lists themes published on GitHub. **Install** downloads, checks and applies a theme;
it then appears among your themes. **Reviewed by HypeDE** means a maintainer looked at that exact
version; *Not reviewed yet* themes passed the automatic checks only.

You can also paste any repository link into the field under the store and press **Install**.

## Publishing your theme

1. Set up the look you want and choose *Export current look*.
2. Create a public GitHub repository and put the file in its root as **`theme.json`**.
3. Optionally add **`preview.png`** — a 16:9 screenshot, up to 4 MB.
4. In *Theme store*, paste the repository link and press **Publish**.
5. HypeDE checks the repository and opens a ready request on GitHub. Submit it: within a minute a bot
   checks the theme again, adds it to the store and closes the request.

The store keeps the exact commit it checked. To publish changes, push them and open a new request
(**Publish** again): the bot moves the store to your new commit.

## What is checked

A theme is data, never code, and HypeDE treats every downloaded theme as untrusted:

- only appearance settings from a fixed list are applied, each checked by type and allowed range;
- a picture must really be the format its name says; it is decoded and re-encoded in a separate
  process with memory and time limits, so only the pixels survive;
- SVG files may not contain scripts, event handlers, external links, entities or embedded files;
- videos must be MP4, WebM, MKV or MOV and are probed before use; files are limited to 64 MB;
- if ClamAV is installed, every file is scanned with it;
- a downloaded theme may use wallpapers only from system folders and its own folder;
- the store pins each theme to a commit, so an author cannot silently change a published theme.

## File format

A theme is a JSON file with `"hypede-theme": 1`, a `name` and any of these groups:

| Group | Fields |
|---|---|
| `colors` | `scheme` (`default`, `prefer-dark`), `accent` (`#rrggbb`), `gnome-accent`, `shelf`, `menus` |
| `wallpaper` | `light`, `dark`, `fit`, `color`, `live`, `live-speed` |
| `shelf` | `position`, `alignment`, `style`, `size`, `icon-size`, `opacity`, `blur`, `indicator`, `hover-zoom`, `show-date` |
| `launcher` | `style`, `columns`, `icon-size`, `labels`, `opacity`, `blur` |
| `desktop` | `icons`, `icon-size`, `show-home`, `show-trash` |
| `windows` | `corner-radius`, `rounded-windows`, `window-radius`, `animations`, `animation-speed`, `genie`, `jelly`, `buttons`, `notifications`, `greeting` |
| `lockscreen` | `style`, `clock`, `clock-color`, `clock-size`, `message`, `wallpaper`, `blur`, `dim`, `waves`, `cards` |
| `fonts` | `interface`, `documents`, `monospace` |
| `icons` | `theme`, `cursor`, `cursor-size` |
| `sounds` | `theme` |

Wallpapers are `file:///usr/share/…` paths or `embedded:NAME` pointing into a `files` object of
base64-encoded pictures. Example:

```
{
  "hypede-theme": 1,
  "name": "Deep Forest",
  "author": "you",
  "description": "Moss green on dark pine.",
  "colors": { "scheme": "prefer-dark", "gnome-accent": "green", "accent": "#9bd77c",
              "shelf": "#0e1a12", "menus": "#132219" },
  "wallpaper": { "light": "file:///usr/share/hypede/wallpapers/forest.svg",
                 "dark": "file:///usr/share/hypede/wallpapers/forest.svg" },
  "shelf": { "style": "floating", "opacity": 82 },
  "windows": { "corner-radius": 20, "genie": true }
}
```

From a terminal: `hypede-theme list`, `apply`, `save`, `export`, `import`, `install`, `check`.
