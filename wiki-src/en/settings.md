---
title: Settings
---
# Settings

One window for everything, laid out like Chrome OS: search at the top, pages on the left.

| Page | What is there |
|---|---|
| Network, Bluetooth | Wi‑Fi, Ethernet, VPN, Bluetooth devices, proxy |
| Device | displays, mouse, touchpad, keyboard and shortcuts, sound and printers, power, storage |
| Personalization | themes, theme store, wallpaper, live wallpaper, desktop, widgets, style, animations |
| Shelf and launcher | position, style, size, what the launcher searches |
| Lock screen | clock style, colours, waves, cards, wallpaper, message |
| Security and privacy | history of recent files, protection |
| Apps | installed apps, default apps, notifications |
| AI assistant | provider and sign-in |
| Accessibility | text size, contrast, zoom, screen reader |
| System preferences | date and time, languages, boot splash, hardware, accounts, GNOME services, focus modes, session, startup apps, HypeDE configuration |

## VPN

*Settings → Network → Add VPN…*:

- **Import a file…** — the file your VPN provider gave you: WireGuard `.conf`, OpenVPN `.ovpn`,
  Cisco `.pcf` and others. OpenVPN and Cisco need the NetworkManager plugin (`networkmanager-openvpn`,
  `networkmanager-vpnc`); WireGuard works without plugins.
- **Paste WireGuard settings…** — paste the `[Interface]` and `[Peer]` text and give it a name.

Turn a VPN on with its switch or in quick settings. Click a VPN for **Connect automatically** and
**Remove**.

## Search

Type in the search field at the top: it finds pages and individual settings, in English and Russian.

## Backup

*System preferences → HypeDE configuration* saves all HypeDE settings to a file and restores them. HypeDE's settings
live in their own database, `~/.config/dconf/hypede`, separate from regular GNOME.
