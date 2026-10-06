---
title: Разработчикам
---
# Разработчикам

## Сборка из исходников

```
git clone https://github.com/hypede/hypede
cd hypede
make && sudo make install
```

`make install-user` ставит только расширение оболочки в `~/.local` — для обычного GNOME.

## Устройство

```
shell/extension/   оболочка: полка, лаунчер, виджеты, эффекты окон, жесты, экран блокировки
shell/theme/       шаблон стилей (tools/gen-shell-css.py пишет светлый и тёмный)
session/           запуск сеанса, юниты systemd, проверка пароля
apps/settings/     «Настройки» (C++, QML, KCMUtils)
apps/files/        «Файлы» (Python, GTK 4)
apps/assistant/    ИИ-помощник (Python, WebKitGTK)
apps/theme/        hypede-theme: темы, магазин, проверка файлов
store/             каталог магазина тем и его встроенные темы
data/              схемы, значки, звуки, обои, темы
tools/             генераторы, переводы, скрипты для разработки
```

## Оболочка без сеанса

`tools/dev/shell-headless.sh start 1600x900` запускает вложенный GNOME Shell с HypeDE без экрана;
`eval` выполняет в нём JavaScript, `shot ФАЙЛ` делает снимок.

## Переводы

Исходный язык — английский. Русские строки лежат в `tools/i18n/settings_ru.py` («Настройки») и
`tools/i18n/po_ru.py` (оболочка). `make pot` пересобирает `po/`.

## Тесты

```
python3 -m unittest discover -s apps/theme/tests -t apps/theme
```

## Участие

Запросы на слияние и сообщения об ошибках — на [GitHub](https://github.com/hypede/hypede). Темы
публикуются через [магазин тем](themes.html#как-опубликовать-свою-тему), а не через запросы на слияние.
