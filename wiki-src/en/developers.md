---
title: For developers
---
# For developers

## Build from source

```
git clone https://github.com/hypede/hypede
cd hypede
make && sudo make install
```

`make install-user` installs only the shell extension into `~/.local` for use in regular GNOME.

## Layout

```
shell/extension/   shell: shelf, launcher, widgets, window effects, gestures, lock screen
shell/theme/       stylesheet template (tools/gen-shell-css.py writes light and dark)
session/           session startup, systemd units, password check
apps/settings/     Settings (C++, QML, KCMUtils)
apps/files/        Files (Python, GTK 4)
apps/assistant/    AI assistant (Python, WebKitGTK)
apps/theme/        hypede-theme: themes, store, file checks
store/             theme store catalogue and built-in store themes
data/              schemas, icons, sounds, wallpapers, themes
tools/             generators, translations, dev scripts
```

## Running the shell without a session

`tools/dev/shell-headless.sh start 1600x900` runs a nested headless GNOME Shell with HypeDE;
`eval` runs JavaScript in it, `shot FILE` takes a screenshot.

## Translations

English is the source. Russian strings live in `tools/i18n/settings_ru.py` (Settings) and
`tools/i18n/po_ru.py` (shell). `make pot` regenerates `po/`.

## Tests

```
python3 -m unittest discover -s apps/theme/tests -t apps/theme
```

## Contributing

Pull requests and issues are welcome on [GitHub](https://github.com/hypede/hypede). Themes go through
the [theme store](themes.html#publishing-your-theme), not pull requests.
