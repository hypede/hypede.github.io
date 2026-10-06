---
title: Начало работы
---
# Начало работы

HypeDE — рабочий стол в духе Chrome OS поверх нетронутого GNOME Shell. Он ставится отдельным сеансом:
обычный GNOME остаётся как был, а у HypeDE свои настройки.

## Установка

Arch Linux, CachyOS и другие системы на базе Arch с GNOME Shell 48–50:

```
git clone https://github.com/hypede/hypede
cd hypede/packaging
makepkg -si
```

Модули KDE для «Настроек» необязательны. Если модуля нет, его строка в «Настройках» подскажет, какой
пакет поставить:

```
sudo pacman -S plasma-nm bluedevil plasma-pa print-manager plasma-workspace \
               plasma-desktop kde-cli-tools flatpak-kcm kinfocenter power-profiles-daemon
```

ИИ-помощнику нужен `webkitgtk-6.0`. Другие дистрибутивы: `make && sudo make install`, зависимости —
в [README](https://github.com/hypede/hypede#other-distributions).

## Первый вход

1. Выйдите из системы и выберите **HypeDE** на экране входа (его видят GDM, SDDM, greetd и LightDM).
2. HypeDE перенесёт из GNOME раскладки, настройки мыши, тачпада, специальных возможностей и сочетания клавиш.
3. Появится короткое приветствие; отключается в *Настройки → Персонализация → Анимации и эффекты*.

## Где что находится

| Что | Где |
|---|---|
| Лаунчер | кружок в начале полки или клавиша <kbd>Super</kbd> |
| Быстрые настройки | нажмите на часы в углу полки |
| Календарь и уведомления | нажмите на дату рядом |
| Настройки | шестерёнка на полке или название настройки в лаунчере |
| Файлы | значок папки на полке |

## Дальше

- [Полка и лаунчер](launcher.html) — команды, которые можно набрать в лаунчере
- [Клавиши и жесты](keys.html)
- [Темы и магазин тем](themes.html)
- [Если что-то не так](troubleshooting.html)
