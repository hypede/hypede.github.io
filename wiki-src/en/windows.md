---
title: Windows
---
# Windows

## Title bar buttons

Minimise, maximise and close are shown for GTK 3, GTK 4 and libadwaita apps. Qt apps get GNOME-style
title bars with `qadwaitadecorations-qt6` (AUR). Change the buttons in *Settings → Personalization →
Windows*. If an app still shows only a close button, see [Troubleshooting](troubleshooting.html).

## Effects

| Effect | What it does | Switch |
|---|---|---|
| Soft animations | windows grow in with a slight spring and fade out | *Window animations* |
| Genie minimise | the window flows into its shelf icon | *Genie minimize* |
| Jelly windows | the window bends a little while you drag it and springs back | *Jelly windows* |
| Rounded corners | for apps that draw square corners without a shadow | *Rounded window corners* |

All are in *Settings → Personalization → Animations and effects*. **Lite mode** turns off blur and the
heavier effects on slower computers.

## Useful tricks

- <kbd>Super</kbd>+<kbd>Z</kbd> floats a window: it becomes small and stays above the others —
  handy for a video or a calculator.
- <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>T</kbd> reopens the last ten closed windows, newest first.

## Session restore

HypeDE remembers which windows are open, on which desk, where and how big. At sign-in it offers to
reopen them. Choose *Ask*, *Always* or *Never* in *Settings → System preferences → Session*. You can
also type `save session` or `restore session` in the launcher.

Apps reopen as new windows: documents inside them are restored only if the app itself does that.
