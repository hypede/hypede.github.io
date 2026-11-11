#!/usr/bin/env python3
"""Собирает assets/try/icons.svg — значки демо HypeDE из темы значков HypeDE.

    python3 tools/build-try-icons.py ../hypede

Значки — Material Symbols из data/icons/HypeDE/symbolic основного
репозитория (Apache License 2.0). В демо они подключаются как <use href="…#имя">.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
NAMES = """
system-search edit-find emblem-system utilities-terminal network-wireless bluetooth audio-volume-high
display-brightness dark-mode notifications-disabled night-light system-lock-screen system-shutdown
window-minimize window-maximize window-restore window-close go-previous go-next go-up go-home
view-grid view-list media-playback-start media-playback-pause media-skip-forward media-skip-backward alarm
accessories-calculator web-browser utilities-system-monitor network-vpn battery-full input-keyboard
view-app-grid hypede-assistant applications-graphics object-select list-add starred
preferences-desktop-wallpaper hypede-device help-about view-more dialog-information
hypede-trash hypede-filetype-image hypede-filetype-text hypede-filetype-audio hypede-filetype-video
hypede-filetype-pdf hypede-filetype-archive hypede-filetype-code hypede-filetype-document
hypede-filetype-spreadsheet hypede-filetype-presentation preferences-system-notifications
power-profile-balanced keyboard-brightness preferences-desktop-display document-open-recent
""".split()

# Папка — Material Symbols «folder» (Apache 2.0): в теме HypeDE папки цветные.
EXTRA = {
    "folder": '<path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 '
              '0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Z"/>',
}


def main(repo: str) -> None:
    src = Path(repo) / "data/icons/HypeDE/symbolic"
    symbols = []
    for name in NAMES:
        svg = (src / f"{name}-symbolic.svg").read_text()
        box = re.search(r'viewBox="([^"]+)"', svg).group(1)
        body = re.sub(r"^.*?<svg[^>]*>|</svg>\s*$", "", svg, flags=re.S).strip()
        body = re.sub(r'\sfill="(?!none)[^"]*"', "", body)
        symbols.append(f'<symbol id="{name}" viewBox="{box}">{body}</symbol>')
    for name, body in EXTRA.items():
        symbols.append(f'<symbol id="{name}" viewBox="0 -960 960 960">{body}</symbol>')
    out = ROOT / "assets/try/icons.svg"
    out.write_text('<svg xmlns="http://www.w3.org/2000/svg">\n<!-- Material Symbols, Apache License 2.0 -->\n'
                   + "\n".join(symbols) + "\n</svg>\n", encoding="utf-8")
    print(f"{out}: {len(symbols)} icons")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "../hypede")
