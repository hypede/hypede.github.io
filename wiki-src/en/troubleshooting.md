---
title: Troubleshooting
---
# Troubleshooting

## An app shows only a close button

HypeDE writes the button layout for GTK 3, GTK 4 and libadwaita apps at sign-in. If one still shows
only ×:

- sign out and back in once after installing or updating HypeDE;
- check *Settings → Personalization → Windows → Window buttons*;
- restart Flatpak apps after changing the layout;
- Qt apps need `qadwaitadecorations-qt6` for GNOME-style title bars.

## The desktop feels slow

- turn on **Lite mode** in *Personalization → Animations and effects*: no blur, live wallpapers,
  rounded-corner effect or lock screen waves;
- turn off live wallpaper, or keep *Pause under maximized windows* on;
- lower *Animation speed* or switch off *Genie minimize* and *Jelly windows*.

## A setting does nothing

HypeDE keeps its own settings database. Running `gsettings` from a terminal outside the HypeDE session
changes regular GNOME, not HypeDE. Inside a HypeDE session it works as expected.

## Start from scratch

Reset all HypeDE settings (regular GNOME is untouched), then sign out and back in:

```
DCONF_PROFILE=hypede dconf reset -f /
```

## The theme store is empty

The store loads from GitHub. Without a connection Settings shows the last list it saw. Press
**Refresh** once you are online.

## Logs

```
journalctl --user -b | grep -i -E "hypede|gnome-shell"
```

Attach the relevant lines when you [report a problem](https://github.com/hypede/hypede/issues).
