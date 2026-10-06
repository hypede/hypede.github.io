---
title: Getting started
---
# Getting started

HypeDE is a Chrome OS–style desktop that runs on top of an unmodified GNOME Shell. It installs as a
separate session: your regular GNOME stays as it was, and HypeDE keeps its own settings.

## Install

Arch Linux, CachyOS and other Arch-based systems with GNOME Shell 48–50:

```
git clone https://github.com/hypede/hypede
cd hypede/packaging
makepkg -si
```

KDE modules for Settings are optional. Without one, its row in Settings names the package to install:

```
sudo pacman -S plasma-nm bluedevil plasma-pa print-manager plasma-workspace \
               plasma-desktop kde-cli-tools flatpak-kcm kinfocenter power-profiles-daemon
```

The AI assistant needs `webkitgtk-6.0`. Other distributions: `make && sudo make install`, see the
[README](https://github.com/hypede/hypede#other-distributions) for dependencies.

## First sign-in

1. Log out and pick **HypeDE** on the login screen (GDM, SDDM, greetd and LightDM all show it).
2. HypeDE copies your keyboard layouts, mouse, touchpad, accessibility and shortcut settings from GNOME.
3. A short greeting appears; turn it off in **Settings → Personalization → Animations and effects**.

## Where things are

| Part | Where |
|---|---|
| Launcher | the circle at the start of the shelf, or the <kbd>Super</kbd> key |
| Quick settings | click the clock in the corner of the shelf |
| Calendar and notifications | click the date next to it |
| Settings | the gear on the shelf, or type a setting's name in the launcher |
| Files | the folder icon on the shelf |

## Next

- [Shelf and launcher](launcher.html) — commands you can type into the launcher
- [Keys and gestures](keys.html)
- [Themes and the theme store](themes.html)
- [Troubleshooting](troubleshooting.html)
