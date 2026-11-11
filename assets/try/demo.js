// Демо HypeDE в браузере.
//
// Рабочий стол HypeDE на одной странице: полка, лаунчер с калькулятором,
// быстрые настройки, календарь, динамический остров, уведомления, окна,
// которые двигаются, прилипают к краям и сворачиваются в значок, и
// несколько программ: «Файлы», «Терминал», «Настройки», «Погода»,
// «Диспетчер задач». То, для чего нужна настоящая система (Wi‑Fi, VPN,
// установка программ, ИИ-помощник…), показывает окно «Работает в
// установленном HypeDE» со ссылкой на установку.

import {evaluate, looksLikeMath} from '../calculator.js';

const BASE = new URL('./', import.meta.url).href;
const SITE = new URL('../../', import.meta.url);
const ICONS = `${BASE}icons.svg`;
const NS = 'http://www.w3.org/2000/svg';
const lang = document.documentElement.lang.startsWith('ru') ? 'ru' : 'en';
const INSTALL_URL = new URL(lang === 'ru' ? 'ru/#install' : '#install', SITE).href;
const HOME_URL = new URL(lang === 'ru' ? 'ru/' : './', SITE).href;
const GITHUB_URL = 'https://github.com/hypede/hypede';

// ---------------------------------------------------------------- строки

const STRINGS = {
    en: {
        files: 'Files', terminal: 'Terminal', settings: 'Settings', weather: 'Weather', tasks: 'Task Manager',
        assistant: 'AI assistant', passwords: 'Passwords',
        search: 'Search your device, apps, settings, web…', continue: 'Continue where you left off',
        apps: 'Apps', settingsSec: 'Settings', filesSec: 'Files', web: 'Web', searchWeb: 'Search the web',
        calcHint: 'Press Enter to copy the result', copied: 'Copied',
        demoBar: 'HypeDE demo in your browser — some features need the full version',
        install: 'How to install', back: 'Back to the site', keepTrying: 'Keep exploring', demo: 'Demo',
        fullTitle: 'This works in the installed HypeDE',
        fullText: '%s needs a real system. In the demo you can try the shelf, the launcher, windows, Files, Terminal and Settings.',
        wifi: 'Wi‑Fi', bluetooth: 'Bluetooth', dark: 'Dark style', dnd: 'Do Not Disturb', night: 'Night light',
        vpn: 'VPN', saver: 'Save battery', focus: 'Focus', on: 'On', off: 'Off', connected: 'HypeDE-Demo',
        volume: 'Volume', brightness: 'Brightness', screenshot: 'Screenshot', lock: 'Lock', power: 'Power off',
        battery: 'Battery %s %', version: 'HypeDE 0.7 · demo',
        powerTitle: 'Power', powerText: 'In the demo you can leave to the site; shutting down needs a real computer.',
        leave: 'Leave the demo', restart: 'Restart', shutdown: 'Shut down',
        welcomeTitle: 'Welcome to HypeDE', welcomeBody: 'This is a live demo. Try the launcher (the ring on the left), quick settings (the clock on the right) and the apps on the shelf.',
        gotIt: 'Got it',
        lockHint: 'Press any key or click to unlock', guest: 'Guest', signIn: 'Sign in', noPassword: 'No password in the demo',
        home: 'Home', recent: 'Recent', trash: 'Trash', devices: 'Devices', fileSystem: 'File System',
        items: '%s items', item: '1 item', emptyFolder: 'This folder is empty', emptyTrash: 'Trash is empty',
        noRecent: 'Nothing opened yet', grid: 'Grid', list: 'List', openWith: 'Opening %s',
        playing: 'Demo track', artist: 'HypeDE · Dynamic Island', timer: 'Timer', start: 'Start', pause: 'Pause',
        reset: 'Reset', timerDone: 'Time is up', timerBody: 'The island timer has finished.', notes: 'Notes',
        notesPh: 'A note for later…', record: 'Record screen', ocr: 'Text from screen', picker: 'Color picker',
        // Настройки
        network: 'Network', networkS: 'Wi‑Fi, VPN, proxy', btS: 'Devices nearby', device: 'Device',
        deviceS: 'Displays, keyboard, mouse', personal: 'Personalization', personalS: 'Themes, wallpaper, dark style',
        shelf: 'Shelf and launcher', shelfS: 'Shelf, launcher, search', lockScreen: 'Lock screen',
        lockS: 'Clock, wallpaper, unlock', security: 'Security and privacy', securityS: 'History, permissions',
        appsS: 'Default apps, startup', ai: 'AI assistant', aiS: 'Provider, chat', a11y: 'Accessibility',
        a11yS: 'Text, cursor, keyboard', about: 'About HypeDE', aboutS: 'Updates, help',
        darkS: 'Dark panels, windows and apps', accent: 'Accent color', accentS: 'Shelf, apps and these settings',
        wallpaper: 'Wallpaper', liveWall: 'Live wallpaper', liveWallS: 'Animated colors or your own video',
        glass: 'Liquid Glass', glassS: 'Blur everywhere, with light bending at the edges',
        autohide: 'Auto-hide the shelf', autohideS: 'The shelf hides under windows; point at the edge to bring it back',
        align: 'Shelf alignment', center: 'Center', left: 'Left', tooltips: 'App names on hover',
        previews: 'Window previews on hover', bigText: 'Larger text', bigTextS: 'Everything in the demo gets bigger',
        fullPage: '%s is in the installed HypeDE',
        fullPageText: 'This page talks to your real system: NetworkManager, BlueZ, displays, KDE modules and more.',
        aboutText: 'GNOME, reshaped into a Chrome OS–style desktop. You are running it in your browser.',
        browser: 'Browser', screen: 'Screen', source: 'Source on GitHub',
        // Погода
        city: 'London', demoData: 'Demo data. The installed HypeDE shows the forecast for your city (Open-Meteo).',
        partly: 'Partly cloudy', feels: 'Feels like %s°', now: 'Now',
        // Диспетчер задач
        task: 'Task', cpu: 'CPU', memory: 'Memory', end: 'End process', shellTask: 'HypeDE shell',
        islandTask: 'Dynamic Island', desktopTask: 'HypeDE desktop', cantEnd: 'The shell keeps the session running and cannot be ended.',
        cpuHint: 'CPU is the share of the whole processor: all cores are 100 %.',
        // Помощник
        aiTitle: 'The AI assistant is in the installed HypeDE',
        aiText: 'Claude, Gemini, ChatGPT and others in a side panel, with your own account — or a small local model that works offline. It can change HypeDE settings after you confirm.',
        // Терминал
        termHelp: 'Commands: help, ls, cd, pwd, cat, echo, clear, date, whoami, uname, fastfetch, history, open, install, exit',
        termFull: '%s works in the installed HypeDE. This demo terminal knows: help, ls, cd, cat, fastfetch…',
        termNotFound: '%s: command not found. Try help',
        termNoFile: '%s: no such file or directory',
        termIsDir: '%s: is a directory',
        termInstall: 'Install HypeDE on Arch Linux or CachyOS:',
    },
    ru: {
        files: 'Файлы', terminal: 'Терминал', settings: 'Настройки', weather: 'Погода', tasks: 'Диспетчер задач',
        assistant: 'ИИ-помощник', passwords: 'Пароли',
        search: 'Поиск по устройству, приложениям, настройкам, интернету…', continue: 'Продолжить с того же места',
        apps: 'Приложения', settingsSec: 'Настройки', filesSec: 'Файлы', web: 'Интернет', searchWeb: 'Искать в интернете',
        calcHint: 'Enter — скопировать результат', copied: 'Скопировано',
        demoBar: 'Демо HypeDE в браузере — часть функций работает только после установки',
        install: 'Как установить', back: 'На сайт', keepTrying: 'Продолжить демо', demo: 'Демо',
        fullTitle: 'Это работает в установленном HypeDE',
        fullText: '«%s» требует настоящей системы. В демо можно попробовать полку, лаунчер, окна, «Файлы», «Терминал» и «Настройки».',
        wifi: 'Wi‑Fi', bluetooth: 'Bluetooth', dark: 'Тёмная тема', dnd: 'Не беспокоить', night: 'Ночной свет',
        vpn: 'VPN', saver: 'Экономия заряда', focus: 'Фокус', on: 'Вкл.', off: 'Выкл.', connected: 'HypeDE-Demo',
        volume: 'Громкость', brightness: 'Яркость', screenshot: 'Снимок экрана', lock: 'Заблокировать', power: 'Выключение',
        battery: 'Батарея %s %', version: 'HypeDE 0.7 · демо',
        powerTitle: 'Выключение', powerText: 'Из демо можно уйти на сайт, а выключать и перезагружать — настоящий компьютер.',
        leave: 'Выйти из демо', restart: 'Перезагрузить', shutdown: 'Выключить',
        welcomeTitle: 'Добро пожаловать в HypeDE', welcomeBody: 'Это живое демо. Попробуйте лаунчер (кольцо слева), быстрые настройки (часы справа) и программы на полке.',
        gotIt: 'Понятно',
        lockHint: 'Нажмите любую клавишу или щёлкните, чтобы разблокировать', guest: 'Гость', signIn: 'Войти',
        noPassword: 'В демо пароль не нужен',
        home: 'Домашняя папка', recent: 'Недавние', trash: 'Корзина', devices: 'Устройства', fileSystem: 'Файловая система',
        items: 'Объектов: %s', item: 'Объектов: 1', emptyFolder: 'Папка пуста', emptyTrash: 'Корзина пуста',
        noRecent: 'Пока ничего не открывали', grid: 'Сетка', list: 'Список', openWith: 'Открываю «%s»',
        playing: 'Демо-трек', artist: 'HypeDE · Динамический остров', timer: 'Таймер', start: 'Старт', pause: 'Пауза',
        reset: 'Сброс', timerDone: 'Время вышло', timerBody: 'Таймер на острове закончился.', notes: 'Заметки',
        notesPh: 'Заметка на потом…', record: 'Запись экрана', ocr: 'Текст с экрана', picker: 'Пипетка',
        network: 'Сеть', networkS: 'Wi‑Fi, VPN, прокси', btS: 'Устройства рядом', device: 'Устройство',
        deviceS: 'Мониторы, клавиатура, мышь', personal: 'Персонализация', personalS: 'Темы, обои, тёмная тема',
        shelf: 'Полка и лаунчер', shelfS: 'Полка, лаунчер, поиск', lockScreen: 'Экран блокировки',
        lockS: 'Часы, обои, разблокировка', security: 'Безопасность', securityS: 'История, разрешения',
        appsS: 'Приложения по умолчанию, автозапуск', ai: 'ИИ-помощник', aiS: 'Провайдер, чат',
        a11y: 'Специальные возможности', a11yS: 'Текст, курсор, клавиатура', about: 'О HypeDE', aboutS: 'Обновления, помощь',
        darkS: 'Тёмные панели, окна и приложения', accent: 'Цвет акцента', accentS: 'Им окрашены полка, приложения и эти настройки',
        wallpaper: 'Обои', liveWall: 'Живые обои', liveWallS: 'Переливающиеся цвета или своё видео',
        glass: 'Жидкое стекло', glassS: 'Размытие везде и преломление света у краёв',
        autohide: 'Прятать полку', autohideS: 'Полка уходит под окна; подведите указатель к краю — вернётся',
        align: 'Положение значков', center: 'По центру', left: 'Слева', tooltips: 'Названия при наведении',
        previews: 'Эскизы окон при наведении', bigText: 'Крупный текст', bigTextS: 'Всё в демо становится крупнее',
        fullPage: 'Раздел «%s» — в установленном HypeDE',
        fullPageText: 'Этот раздел работает с настоящей системой: NetworkManager, BlueZ, мониторами, модулями KDE и другим.',
        aboutText: 'GNOME в облике Chrome OS. Сейчас он работает у вас в браузере.',
        browser: 'Браузер', screen: 'Экран', source: 'Исходники на GitHub',
        city: 'Москва', demoData: 'Демо-данные. В установленном HypeDE — прогноз Open-Meteo для вашего города.',
        partly: 'Переменная облачность', feels: 'Ощущается как %s°', now: 'Сейчас',
        task: 'Задача', cpu: 'ЦП', memory: 'Память', end: 'Завершить', shellTask: 'Оболочка HypeDE',
        islandTask: 'Динамический остров', desktopTask: 'Рабочий стол HypeDE',
        cantEnd: 'Оболочка держит сеанс — её завершить нельзя.',
        cpuHint: 'ЦП — доля всего процессора: все ядра — это 100 %.',
        aiTitle: 'ИИ-помощник — в установленном HypeDE',
        aiText: 'Claude, Gemini, ChatGPT и другие в боковой панели — через ваш аккаунт, или маленькая локальная модель без интернета. Может менять настройки HypeDE после вашего подтверждения.',
        termHelp: 'Команды: help, ls, cd, pwd, cat, echo, clear, date, whoami, uname, fastfetch, history, open, install, exit',
        termFull: '«%s» работает в установленном HypeDE. Демо-терминал понимает: help, ls, cd, cat, fastfetch…',
        termNotFound: '%s: команда не найдена. Попробуйте help',
        termNoFile: '%s: нет такого файла или каталога',
        termIsDir: '%s: это каталог',
        termInstall: 'Установка HypeDE на Arch Linux или CachyOS:',
    },
};
const S = STRINGS[lang];
const t = (key, ...args) => args.reduce((s, a) => s.replace('%s', a), S[key] ?? key);

// ---------------------------------------------------------------- мелочи

const store = {
    get(key, fallback) {
        try {
            const v = localStorage.getItem(`hypede-demo:${key}`);
            return v === null ? fallback : JSON.parse(v);
        } catch {
            return fallback;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(`hypede-demo:${key}`, JSON.stringify(value));
        } catch {}
    },
};

function h(tag, props = {}, ...children) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
        if (v === null || v === undefined || v === false)
            continue;
        if (k === 'class')
            el.className = v;
        else if (k.startsWith('on') && typeof v === 'function')
            el.addEventListener(k.slice(2), v);
        else if (k === 'style' && typeof v === 'object')
            Object.assign(el.style, v);
        else
            el.setAttribute(k, v === true ? '' : v);
    }
    for (const child of children.flat()) {
        if (child !== null && child !== undefined && child !== false)
            el.append(child);
    }
    return el;
}

function icon(name, cls = 'i') {
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', cls);
    svg.setAttribute('aria-hidden', 'true');
    const use = document.createElementNS(NS, 'use');
    use.setAttribute('href', `${ICONS}#${name}`);
    svg.append(use);
    return svg;
}

const appIcon = id => h('img', {class: 'app-icon', src: `${BASE}apps/dev.hypede.${id}.svg`, alt: '', draggable: 'false'});

function fmtSize(bytes) {
    if (bytes < 1000)
        return `${bytes} B`;
    const units = lang === 'ru' ? ['кБ', 'МБ', 'ГБ'] : ['kB', 'MB', 'GB'];
    let v = bytes / 1000, i = 0;
    while (v >= 1000 && i < units.length - 1) {
        v /= 1000;
        i++;
    }
    return `${v.toLocaleString(lang, {maximumFractionDigits: 1})} ${units[i]}`;
}

// ---------------------------------------------------------------- оформление

const ACCENTS = [
    {name: 'blue', light: '#0b57d0', dark: '#a8c7fa', softL: '#d3e3fd', softD: '#0b3a82', fgD: '#062e6f'},
    {name: 'green', light: '#146c2e', dark: '#6dd58c', softL: '#c4eed0', softD: '#0f5223', fgD: '#0a3818'},
    {name: 'purple', light: '#6750a4', dark: '#d0bcff', softL: '#e9ddff', softD: '#4f378b', fgD: '#381e72'},
    {name: 'pink', light: '#b3261e', dark: '#f2b8b5', softL: '#f9dedc', softD: '#8c1d18', fgD: '#601410'},
    {name: 'orange', light: '#a54600', dark: '#ffb68b', softL: '#ffdbc8', softD: '#7d3400', fgD: '#542200'},
    {name: 'teal', light: '#006a6a', dark: '#4cdada', softL: '#cce8e7', softD: '#004f4f', fgD: '#003737'},
];
const WALLPAPERS = ['horizon', 'aurora', 'lagoon', 'peaks', 'bloom', 'coast'];

const state = {
    scheme: store.get('scheme', matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    accent: store.get('accent', 'blue'),
    wallpaper: store.get('wallpaper', 'horizon'),
    autohide: store.get('autohide', false),
    align: store.get('align', 'center'),
    tooltips: store.get('tooltips', true),
    bigText: store.get('bigText', false),
    dnd: false,
    night: false,
    saver: false,
    brightness: 100,
};

// ---------------------------------------------------------------- каркас

const root = document.getElementById('hypede-demo');
root.classList.add('hd');
root.replaceChildren();

const wallpaper = h('div', {class: 'wallpaper'});
const desktopIcons = h('div', {class: 'desktop-icons'});
const widgets = h('div', {class: 'widgets'});
const windowsLayer = h('div', {class: 'windows'});
const snapPreview = h('div', {class: 'snap-preview'});
const night = h('div', {class: 'night'});
const dimLayer = h('div', {class: 'dim-layer'});
const tooltip = h('div', {class: 'tooltip', role: 'tooltip'});
const toasts = h('div', {class: 'toasts', 'aria-live': 'polite'});

const ring = h('button', {class: 'ring', 'aria-label': S.apps, 'aria-expanded': 'false'});
const islandLabel = h('span', {class: 'lbl'}, '☀ 12°');
const island = h('button', {class: 'island', 'aria-label': 'Dynamic Island', 'aria-expanded': 'false'},
    h('span', {class: 'bars'}, h('i'), h('i'), h('i')), islandLabel);
const shelfApps = h('div', {class: 'shelf-apps'});
const dateLabel = h('span', {class: 'date-lbl'});
const datePill = h('button', {class: 'pill datepill', 'aria-expanded': 'false'}, dateLabel);
const timeLabel = h('span');
const statusPill = h('button', {class: 'pill', 'aria-expanded': 'false', 'aria-label': S.settings},
    timeLabel, icon('network-wireless'), icon('battery-full'));
const shelf = h('nav', {class: 'shelf', 'aria-label': 'Shelf'},
    ring, island, shelfApps, h('div', {class: 'tray'}, datePill, statusPill));

root.append(wallpaper, desktopIcons, widgets, windowsLayer, snapPreview, shelf, toasts, night, dimLayer, tooltip);

function applyLook() {
    root.dataset.scheme = state.scheme;
    const a = ACCENTS.find(x => x.name === state.accent) ?? ACCENTS[0];
    const dark = state.scheme === 'dark';
    root.style.setProperty('--accent', dark ? a.dark : a.light);
    root.style.setProperty('--accent-fg', dark ? a.fgD : '#ffffff');
    root.style.setProperty('--accent-soft', dark ? a.softD : a.softL);
    root.style.setProperty('--accent-soft-fg', dark ? '#ffffff' : '#0b1d33');
    wallpaper.style.backgroundImage = `url("${BASE}wallpapers/${state.wallpaper}-${state.scheme}.svg")`;
    root.classList.toggle('autohide', state.autohide);
    root.classList.toggle('night-on', state.night);
    shelfApps.style.justifyContent = state.align === 'left' ? 'flex-start' : 'center';
    root.style.fontSize = state.bigText ? '16px' : '';
    root.style.setProperty('--shelf-h', state.bigText ? '62px' : '56px');
    dimLayer.style.opacity = String((100 - state.brightness) / 100 * 0.65);
    // «Экономия заряда»: без размытия, как в лёгком режиме HypeDE.
    root.classList.toggle('saver', state.saver);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#202124' : '#e6ecf5');
    for (const fn of lookListeners)
        fn();
}
const lookListeners = new Set();
function setLook(key, value) {
    state[key] = value;
    if (['scheme', 'accent', 'wallpaper', 'autohide', 'align', 'tooltips', 'bigText'].includes(key))
        store.set(key, value);
    applyLook();
}
const saverStyle = h('style', {}, '.hd.saver *, .hd.saver { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }');
document.head.append(saverStyle);

// ---------------------------------------------------------------- всплывающее «полная версия»

function dialog({iconName = 'dialog-information', title, text, actions}) {
    const scrim = h('div', {class: 'scrim'});
    const close = () => scrim.remove();
    const box = h('div', {class: 'dialog', role: 'dialog', 'aria-modal': 'true', 'aria-label': title},
        h('div', {class: 'full-card', style: {padding: '0'}},
            h('div', {class: 'big-i'}, icon(iconName))),
        h('span', {class: 'badge'}, S.demo),
        h('h3', {}, title),
        h('p', {}, text),
        h('div', {class: 'acts'}, actions.map(a => a.href
            ? h('a', {class: `btn${a.quiet ? ' quiet' : ''}`, href: a.href, target: '_top'}, a.label)
            : h('button', {class: `btn${a.quiet ? ' quiet' : ''}`, onclick: () => {
                close();
                a.run?.();
            }}, a.label))));
    scrim.append(box);
    scrim.addEventListener('pointerdown', e => {
        if (e.target === scrim)
            close();
    });
    scrim.addEventListener('keydown', e => {
        if (e.key === 'Escape')
            close();
    });
    root.append(scrim);
    box.querySelector('.btn')?.focus();
    return close;
}

function full(feature) {
    closePopups();
    dialog({
        iconName: 'help-about', title: S.fullTitle, text: t('fullText', feature),
        actions: [{label: S.install, href: INSTALL_URL}, {label: S.keepTrying, quiet: true}],
    });
}

// ---------------------------------------------------------------- уведомления

function notify({app, iconName, title, body, actions = [], force = false}) {
    if (state.dnd && !force)
        return;
    const toast = h('div', {class: 'toast', role: 'status'},
        app ? appIcon(app) : h('div', {class: 'round'}, icon(iconName ?? 'preferences-system-notifications')),
        h('div', {class: 't'}, title),
        h('button', {class: 'wbtn', 'aria-label': 'Close', onclick: () => toast.remove()}, icon('window-close')),
        h('div', {class: 'b'}, body),
        actions.length ? h('div', {class: 'acts'}, actions.map(a => h('button', {onclick: () => {
            toast.remove();
            a.run();
        }}, a.label))) : null);
    toasts.append(toast);
    let timer = setTimeout(() => toast.remove(), 9000);
    toast.addEventListener('pointerenter', () => clearTimeout(timer));
    toast.addEventListener('pointerleave', () => (timer = setTimeout(() => toast.remove(), 4000)));
}

// ---------------------------------------------------------------- окна

const wm = {windows: [], z: 100, seq: 0};
let bar = null; // плашка демо сверху

// Место для окон: без полки и без плашки демо сверху (иначе она закрывала бы
// заголовок развёрнутого окна).
function workArea() {
    const shelfH = state.autohide ? 0 : shelf.offsetHeight;
    const top = bar?.isConnected ? bar.offsetTop + bar.offsetHeight + 8 : 0;
    return {x: 0, y: top, w: root.clientWidth, h: root.clientHeight - shelfH - top};
}

class Win {
    constructor(app, {title, width = 760, height = 500, body, onClose}) {
        this.app = app;
        this.id = ++wm.seq;
        this.onClose = onClose;
        const area = workArea();
        const w = Math.min(width, area.w - 20), hgt = Math.min(height, area.h - 20);
        const offset = (wm.windows.length % 6) * 28;
        this.rect = {
            x: Math.max(0, Math.round((area.w - w) / 2 - 80 + offset)),
            y: Math.max(area.y, Math.round(area.y + (area.h - hgt) / 2 - 30 + offset)),
            w, h: hgt,
        };
        this.titleEl = h('div', {class: 'title'}, title);
        this.lead = h('div', {class: 'lead'});
        const bar = h('div', {class: 'titlebar'},
            this.lead, this.titleEl,
            h('button', {class: 'wbtn', 'aria-label': 'Minimize', onclick: () => this.minimize()}, icon('window-minimize')),
            this.maxBtn = h('button', {class: 'wbtn', 'aria-label': 'Maximize', onclick: () => this.toggleMax()}, icon('window-maximize')),
            h('button', {class: 'wbtn close', 'aria-label': 'Close', onclick: () => this.close()}, icon('window-close')));
        this.body = h('div', {class: 'wbody'}, body);
        this.el = h('section', {class: 'window opening', role: 'dialog', 'aria-label': title}, bar, this.body,
            h('div', {class: 'resize'}));
        windowsLayer.append(this.el);
        this._place();
        this._drag(bar);
        this._resize(this.el.querySelector('.resize'));
        bar.addEventListener('dblclick', e => {
            if (!e.target.closest('button'))
                this.toggleMax();
        });
        this.el.addEventListener('pointerdown', () => this.focus(), true);
        wm.windows.push(this);
        if (root.clientWidth < 760)
            this.toggleMax(true);
        this.focus();
        requestAnimationFrame(() => requestAnimationFrame(() => this.el.classList.remove('opening')));
        renderShelf();
    }

    setTitle(text) {
        this.titleEl.textContent = text;
    }

    _place() {
        const r = this.maxed ? workArea() : this.rect;
        Object.assign(this.el.style, {left: `${r.x}px`, top: `${r.y}px`, width: `${r.w}px`, height: `${r.h}px`});
    }

    focus() {
        this.el.style.zIndex = ++wm.z;
        for (const w of wm.windows)
            w.el.classList.toggle('focused', w === this);
        wm.focused = this;
        renderShelf();
    }

    get minimized() {
        return this.el.classList.contains('minimized');
    }

    minimize() {
        const target = shelfApps.querySelector(`[data-app="${this.app}"]`)?.getBoundingClientRect();
        const r = this.el.getBoundingClientRect();
        if (target) {
            const dx = target.left + target.width / 2 - (r.left + r.width / 2);
            const dy = target.top + target.height / 2 - (r.top + r.height / 2);
            this.el.style.transform = `translate(${dx}px, ${dy}px) scale(0.12)`;
        }
        this.el.classList.add('minimized');
        if (wm.focused === this) {
            wm.focused = null;
            const next = [...wm.windows].reverse().find(w => w !== this && !w.minimized);
            next?.focus();
        }
        renderShelf();
    }

    restore() {
        this.el.style.transform = '';
        this.el.classList.remove('minimized');
        this.focus();
    }

    toggleMax(force) {
        this.maxed = force ?? !this.maxed;
        this.el.classList.toggle('maxed', this.maxed);
        this.maxBtn.replaceChildren(icon(this.maxed ? 'window-restore' : 'window-maximize'));
        this._place();
    }

    close() {
        this.el.classList.add('closing');
        wm.windows = wm.windows.filter(w => w !== this);
        if (wm.focused === this)
            wm.focused = null;
        this.onClose?.();
        setTimeout(() => this.el.remove(), 180);
        [...wm.windows].reverse().find(w => !w.minimized)?.focus();
        renderShelf();
    }

    _drag(bar) {
        let start = null;
        bar.addEventListener('pointerdown', e => {
            if (e.button !== 0 || e.target.closest('button'))
                return;
            bar.setPointerCapture(e.pointerId);
            const r = this.el.getBoundingClientRect();
            start = {px: e.clientX, py: e.clientY, x: r.left, y: r.top, w: r.width, moved: false};
        });
        bar.addEventListener('pointermove', e => {
            if (!start)
                return;
            const dx = e.clientX - start.px, dy = e.clientY - start.py;
            if (!start.moved && Math.hypot(dx, dy) < 4)
                return;
            if (!start.moved) {
                start.moved = true;
                this.el.classList.add('dragging');
                if (this.maxed) {
                    // Развёрнутое окно отрывается от края под указателем.
                    const ratio = (start.px - start.x) / start.w;
                    this.toggleMax(false);
                    start.x = start.px - this.rect.w * ratio;
                    start.y = workArea().y;
                }
            }
            const area = workArea();
            this.rect.x = Math.round(start.x + dx);
            this.rect.y = Math.round(Math.max(0, Math.min(start.y + dy, area.y + area.h - 40)));
            this._place();
            this._snapTarget = this._snapAt(e.clientX, e.clientY);
            this._showSnap(this._snapTarget);
        });
        const end = () => {
            if (!start)
                return;
            this.el.classList.remove('dragging');
            if (start.moved && this._snapTarget)
                this._applySnap(this._snapTarget);
            this._snapTarget = null;
            this._showSnap(null);
            start = null;
        };
        bar.addEventListener('pointerup', end);
        bar.addEventListener('pointercancel', end);
    }

    // Прилипание к краям, как в HypeDE: к боку — половина экрана, к верху — во весь экран.
    _snapAt(x, y) {
        const area = workArea();
        if (y <= 2)
            return 'max';
        if (x <= 4)
            return 'left';
        if (x >= area.w - 4)
            return 'right';
        return null;
    }

    _snapRect(where) {
        const a = workArea();
        if (where === 'left')
            return {x: 0, y: a.y, w: Math.round(a.w / 2), h: a.h};
        if (where === 'right')
            return {x: Math.round(a.w / 2), y: a.y, w: a.w - Math.round(a.w / 2), h: a.h};
        return {...a};
    }

    _showSnap(where) {
        snapPreview.classList.toggle('on', !!where);
        if (!where)
            return;
        const r = this._snapRect(where);
        Object.assign(snapPreview.style, {left: `${r.x + 6}px`, top: `${r.y + 6}px`, width: `${r.w - 12}px`, height: `${r.h - 12}px`});
    }

    _applySnap(where) {
        if (where === 'max') {
            this.toggleMax(true);
            return;
        }
        this.rect = this._snapRect(where);
        this._place();
    }

    _resize(handle) {
        let start = null;
        handle.addEventListener('pointerdown', e => {
            if (this.maxed)
                return;
            handle.setPointerCapture(e.pointerId);
            start = {px: e.clientX, py: e.clientY, w: this.rect.w, h: this.rect.h};
            this.el.classList.add('resizing');
            e.stopPropagation();
        });
        handle.addEventListener('pointermove', e => {
            if (!start)
                return;
            this.rect.w = Math.max(320, start.w + e.clientX - start.px);
            this.rect.h = Math.max(220, start.h + e.clientY - start.py);
            this._place();
        });
        const end = () => {
            start = null;
            this.el.classList.remove('resizing');
        };
        handle.addEventListener('pointerup', end);
        handle.addEventListener('pointercancel', end);
    }
}

addEventListener('resize', () => {
    for (const w of wm.windows) {
        if (w.maxed)
            w._place();
    }
});

// ---------------------------------------------------------------- программы

const APPS = {
    Files: {name: S.files, open: () => openFiles()},
    Terminal: {name: S.terminal, open: () => openTerminal()},
    Settings: {name: S.settings, open: () => openSettings()},
    Weather: {name: S.weather, open: () => openWeather()},
    TaskManager: {name: S.tasks, open: () => openTasks()},
    Assistant: {name: S.assistant, open: () => openAssistant()},
    Passwords: {name: S.passwords, open: () => full(S.passwords)},
};
const PINNED = ['Files', 'Terminal', 'Settings', 'Weather', 'Assistant'];

function windowsOf(app) {
    return wm.windows.filter(w => w.app === app);
}

function launch(app, ...args) {
    closePopups();
    const existing = windowsOf(app)[0];
    if (existing && !args.length) {
        if (existing.minimized)
            existing.restore();
        else
            existing.focus();
        return existing;
    }
    shelfApps.querySelector(`[data-app="${app}"]`)?.classList.add('bounce');
    setTimeout(() => shelfApps.querySelector(`[data-app="${app}"]`)?.classList.remove('bounce'), 650);
    return APPS[app].open(...args);
}

// ---------- полка ----------

function renderShelf() {
    const running = wm.windows.map(w => w.app);
    const ids = [...PINNED, ...running.filter((a, i) => !PINNED.includes(a) && running.indexOf(a) === i)];
    const focused = wm.focused?.app;
    shelfApps.replaceChildren(...ids.map(id => {
        const button = h('button', {
            class: `shelf-app${running.includes(id) ? ' running' : ''}${focused === id ? ' active' : ''}`,
            'data-app': id, 'aria-label': APPS[id].name,
            onclick: () => {
                const wins = windowsOf(id);
                if (!wins.length)
                    return launch(id);
                const w = wins[0];
                if (w.minimized)
                    w.restore();
                else if (wm.focused === w)
                    w.minimize();
                else
                    w.focus();
            },
        }, appIcon(id), h('span', {class: 'dot'}));
        tip(button, () => APPS[id].name);
        return button;
    }));
}

function tip(el, text) {
    el.addEventListener('pointerenter', e => {
        if (!state.tooltips || e.pointerType !== 'mouse')
            return;
        const r = el.getBoundingClientRect();
        tooltip.textContent = text();
        tooltip.style.left = `${r.left + r.width / 2}px`;
        tooltip.style.top = `${r.top - 8}px`;
        tooltip.classList.add('on');
    });
    el.addEventListener('pointerleave', () => tooltip.classList.remove('on'));
    el.addEventListener('pointerdown', () => tooltip.classList.remove('on'));
}

// ---------- часы ----------

function tick() {
    const now = new Date();
    timeLabel.textContent = now.toLocaleTimeString(lang, {hour: 'numeric', minute: '2-digit'});
    dateLabel.textContent = now.toLocaleDateString(lang, {day: 'numeric', month: 'short'}).replace('.', '');
    clockWidget.big.textContent = timeLabel.textContent;
    clockWidget.small.textContent = now.toLocaleDateString(lang, {weekday: 'long', day: 'numeric', month: 'long'});
    if (lockScreen)
        lockScreen.update();
}
const clockWidget = {big: h('div', {class: 'big'}), small: h('div', {class: 'small'})};
widgets.append(h('div', {class: 'widget'}, clockWidget.big, clockWidget.small),
    h('button', {class: 'widget', style: {textAlign: 'left'}, onclick: () => launch('Weather')},
        h('div', {class: 'big', style: {fontSize: '30px'}}, '☀ 12°'),
        h('div', {class: 'small'}, `${S.city} · ${S.partly}`)));

// ---------------------------------------------------------------- пузыри

const popups = new Set();
function bubble(cls, button) {
    const el = h('div', {class: `bubble ${cls}`, role: 'dialog'});
    root.append(el);
    const p = {
        el, button,
        open() {
            closePopups(p);
            p.render?.();
            el.classList.add('open');
            button?.setAttribute('aria-expanded', 'true');
            shelf.classList.add('keep');
            p.onOpen?.();
        },
        close() {
            el.classList.remove('open');
            button?.setAttribute('aria-expanded', 'false');
            if (![...popups].some(x => x.isOpen))
                shelf.classList.remove('keep');
        },
        get isOpen() {
            return el.classList.contains('open');
        },
        toggle() {
            p.isOpen ? p.close() : p.open();
        },
    };
    popups.add(p);
    button?.addEventListener('click', () => p.toggle());
    return p;
}

function closePopups(except = null) {
    for (const p of popups) {
        if (p !== except && p.isOpen)
            p.close();
    }
    if (!except)
        shelf.classList.remove('keep');
}

root.addEventListener('pointerdown', e => {
    if (e.target.closest('.bubble, .shelf, .scrim'))
        return;
    closePopups();
});

// ---------- лаунчер ----------

const launcher = bubble('launcher', ring);
const searchInput = h('input', {type: 'search', placeholder: S.search, 'aria-label': S.search, autocomplete: 'off'});
const launcherBody = h('div', {class: 'launcher-body'});
launcher.el.append(h('label', {class: 'search'}, icon('system-search'), searchInput), launcherBody);
let results = [], selected = 0;

launcher.onOpen = () => {
    searchInput.value = '';
    renderLauncher();
    searchInput.focus();
};

function resultRow({iconEl, title, subtitle, run}) {
    const row = h('button', {class: 'result', onclick: run}, iconEl, h('div', {}, h('div', {class: 't'}, title),
        subtitle ? h('div', {class: 's'}, subtitle) : null));
    results.push({row, run});
    return row;
}

const SETTINGS_INDEX = [
    {page: 'personal', words: 'dark theme wallpaper accent color тёмная тема обои цвет акцент персонализация'},
    {page: 'shelf', words: 'shelf launcher autohide полка лаунчер прятать'},
    {page: 'a11y', words: 'text large accessibility крупный текст специальные'},
    {page: 'network', words: 'wifi wi-fi vpn network proxy сеть впн прокси'},
    {page: 'bluetooth', words: 'bluetooth блютуз'},
    {page: 'about', words: 'about version update о версия обновления'},
];

function renderLauncher() {
    const q = searchInput.value.trim();
    results = [];
    selected = 0;
    const lower = q.toLocaleLowerCase(lang);
    if (!q) {
        const recent = recentFiles.slice(0, 4);
        launcherBody.replaceChildren(
            recent.length ? h('div', {class: 'section-title'}, S.continue) : null,
            recent.length ? h('div', {class: 'chip-row'}, recent.map(path => {
                const node = fsGet(path);
                return h('button', {class: 'chip', onclick: () => openFile(path)},
                    fileTile(node, true), h('span', {}, node?.name ?? path.split('/').pop()));
            })) : null,
            h('div', {class: 'section-title'}, S.apps),
            h('div', {class: 'app-grid'}, Object.entries(APPS).map(([id, app]) =>
                h('button', {class: 'app-tile', onclick: () => launch(id)}, appIcon(id), h('span', {}, app.name)))));
        return;
    }
    const sections = [];
    if (looksLikeMath(q)) {
        const value = evaluate(q);
        if (value !== null) {
            sections.push(h('div', {}, resultRow({
                iconEl: h('div', {class: 'round'}, icon('accessories-calculator')),
                title: `= ${value}`, subtitle: S.calcHint,
                run: () => {
                    navigator.clipboard?.writeText(String(value)).catch(() => {});
                    closePopups();
                    notify({iconName: 'accessories-calculator', title: S.copied, body: `${q} = ${value}`, force: true});
                },
            })));
        }
    }
    const apps = Object.entries(APPS).filter(([, a]) => a.name.toLocaleLowerCase(lang).includes(lower));
    if (apps.length) {
        sections.push(h('div', {class: 'section-title'}, S.apps),
            ...apps.map(([id, a]) => resultRow({iconEl: appIcon(id), title: a.name, run: () => launch(id)})));
    }
    const pages = SETTINGS_INDEX.filter(p => p.words.includes(lower) || SETTINGS_PAGES[p.page].title.toLocaleLowerCase(lang).includes(lower));
    if (pages.length) {
        sections.push(h('div', {class: 'section-title'}, S.settingsSec),
            ...pages.map(p => resultRow({
                iconEl: h('div', {class: 'round'}, icon(SETTINGS_PAGES[p.page].icon)),
                title: SETTINGS_PAGES[p.page].title, subtitle: SETTINGS_PAGES[p.page].subtitle,
                run: () => launch('Settings', p.page),
            })));
    }
    const files = fsSearch(lower).slice(0, 4);
    if (files.length) {
        sections.push(h('div', {class: 'section-title'}, S.filesSec),
            ...files.map(({path, node}) => resultRow({
                iconEl: fileTile(node, true), title: node.name, subtitle: `~/${path.split('/').slice(0, -1).join('/')}`,
                run: () => openFile(path),
            })));
    }
    sections.push(h('div', {class: 'section-title'}, S.web), resultRow({
        iconEl: h('div', {class: 'round'}, icon('web-browser')), title: q, subtitle: S.searchWeb,
        run: () => {
            closePopups();
            open(`https://duckduckgo.com/?q=${encodeURIComponent(q)}`, '_blank', 'noopener');
        },
    }));
    launcherBody.replaceChildren(...sections);
    select(0);
}

function select(i) {
    if (!results.length)
        return;
    results[selected]?.row.classList.remove('selected');
    selected = (i + results.length) % results.length;
    results[selected].row.classList.add('selected');
    results[selected].row.scrollIntoView({block: 'nearest'});
}

searchInput.addEventListener('input', renderLauncher);
searchInput.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') {
        select(selected + 1);
        e.preventDefault();
    } else if (e.key === 'ArrowUp') {
        select(selected - 1);
        e.preventDefault();
    } else if (e.key === 'Enter') {
        results[selected]?.run();
    }
});

// ---------- быстрые настройки ----------

const qs = bubble('qs right', statusPill);
qs.render = () => {
    const tile = (iconName, title, sub, on, run) => h('button', {class: `qtile${on ? ' on' : ''}`, onclick: run,
        'aria-pressed': on ? 'true' : 'false'}, icon(iconName), h('div', {class: 'txt'}, h('div', {class: 't'}, title),
        h('div', {class: 's'}, sub)));
    const toggle = key => () => {
        setLook(key, !state[key]);
        qs.render();
    };
    qs.el.replaceChildren(
        h('div', {class: 'qs-top'},
            h('button', {class: 'round-btn', 'aria-label': S.screenshot, onclick: () => full(S.screenshot)}, icon('applications-graphics')),
            h('button', {class: 'round-btn', 'aria-label': S.settings, onclick: () => launch('Settings')}, icon('emblem-system')),
            h('button', {class: 'round-btn', 'aria-label': S.lock, onclick: () => lock()}, icon('system-lock-screen')),
            h('span', {class: 'spacer'}),
            h('button', {class: 'round-btn', 'aria-label': S.power, onclick: powerDialog}, icon('system-shutdown'))),
        h('div', {class: 'tiles'},
            tile('network-wireless', S.wifi, S.connected, true, () => full(S.wifi)),
            tile('bluetooth', S.bluetooth, S.off, false, () => full(S.bluetooth)),
            tile('dark-mode', S.dark, state.scheme === 'dark' ? S.on : S.off, state.scheme === 'dark', () => {
                setLook('scheme', state.scheme === 'dark' ? 'light' : 'dark');
                qs.render();
            }),
            tile('notifications-disabled', S.dnd, state.dnd ? S.on : S.off, state.dnd, toggle('dnd')),
            tile('night-light', S.night, state.night ? S.on : S.off, state.night, toggle('night')),
            tile('battery-full', S.saver, state.saver ? S.on : S.off, state.saver, toggle('saver')),
            tile('network-vpn', S.vpn, S.off, false, () => full(S.vpn)),
            tile('power-profile-balanced', S.focus, S.off, false, () => full(S.focus))),
        h('label', {class: 'slider'}, icon('audio-volume-high'),
            h('input', {type: 'range', min: '0', max: '100', value: '70', 'aria-label': S.volume})),
        h('label', {class: 'slider'}, icon('display-brightness'),
            h('input', {type: 'range', min: '20', max: '100', value: String(state.brightness), 'aria-label': S.brightness,
                oninput: e => setLook('brightness', Number(e.target.value))})),
        h('div', {class: 'qs-foot'}, h('span', {}, t('battery', '87')), h('span', {}, S.version)));
};

function powerDialog() {
    closePopups();
    dialog({iconName: 'system-shutdown', title: S.powerTitle, text: S.powerText, actions: [
        {label: S.leave, href: HOME_URL},
        {label: S.restart, quiet: true, run: () => full(S.restart)},
        {label: S.shutdown, quiet: true, run: () => full(S.shutdown)},
    ]});
}

// ---------- календарь ----------

const calendar = bubble('calendar right', datePill);
let calMonth = new Date();
calendar.onOpen = () => (calMonth = new Date());
calendar.render = () => {
    const y = calMonth.getFullYear(), m = calMonth.getMonth();
    const first = new Date(y, m, 1);
    const shift = (first.getDay() + 6) % 7;
    const today = new Date();
    const days = [];
    for (let i = 0; i < 42; i++) {
        const d = new Date(y, m, 1 - shift + i);
        const isToday = d.toDateString() === today.toDateString();
        days.push(h('div', {class: `d${d.getMonth() !== m ? ' other' : ''}${isToday ? ' today' : ''}`}, String(d.getDate())));
    }
    const dows = [...Array(7)].map((_, i) => new Date(2024, 0, 1 + i).toLocaleDateString(lang, {weekday: 'narrow'}));
    calendar.el.replaceChildren(
        h('div', {class: 'cal-head'},
            h('button', {class: 'wbtn', 'aria-label': '‹', onclick: () => {
                calMonth = new Date(y, m - 1, 1);
                calendar.render();
            }}, icon('go-previous')),
            h('b', {}, first.toLocaleDateString(lang, {month: 'long', year: 'numeric'})),
            h('button', {class: 'wbtn', 'aria-label': '›', onclick: () => {
                calMonth = new Date(y, m + 1, 1);
                calendar.render();
            }}, icon('go-next'))),
        h('div', {class: 'cal-grid'}, dows.map(d => h('div', {class: 'dow'}, d)), days));
};

// ---------- динамический остров ----------

const islandPanel = bubble('island-panel', island);
const TRACKS = lang === 'ru'
    ? ['Демо-трек', 'Полка и лаунчер', 'Жидкое стекло']
    : ['Demo track', 'Shelf and launcher', 'Liquid Glass'];
const media = {track: 0, playing: false, pos: 0, len: 214};
const timer = {left: 0, running: false, id: 0};
setInterval(() => {
    if (media.playing) {
        media.pos = (media.pos + 1) % media.len;
        if (islandPanel.isOpen)
            islandPanel.el.querySelector('.progress i')?.style.setProperty('width', `${media.pos / media.len * 100}%`);
    }
}, 1000);

function syncIsland() {
    island.classList.toggle('playing', media.playing);
    islandLabel.textContent = timer.running ? fmtTimer(timer.left) : media.playing ? TRACKS[media.track] : '☀ 12°';
}
const fmtTimer = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

islandPanel.render = () => {
    const playBtn = h('button', {class: 'round-btn', 'aria-label': media.playing ? S.pause : S.start, onclick: () => {
        media.playing = !media.playing;
        syncIsland();
        islandPanel.render();
    }}, icon(media.playing ? 'media-playback-pause' : 'media-playback-start'));
    const skip = d => () => {
        media.track = (media.track + d + TRACKS.length) % TRACKS.length;
        media.pos = 0;
        syncIsland();
        islandPanel.render();
    };
    const timerLabel = h('b', {}, fmtTimer(timer.left));
    const notes = h('textarea', {class: 'notes selectable', placeholder: S.notesPh, 'aria-label': S.notes});
    notes.value = store.get('notes', '');
    notes.addEventListener('input', () => store.set('notes', notes.value));
    islandPanel.el.replaceChildren(
        h('div', {class: 'media'}, h('div', {class: 'cover'}),
            h('div', {}, h('div', {class: 't'}, TRACKS[media.track]), h('div', {class: 's'}, S.artist))),
        h('div', {class: 'progress'}, h('i', {style: {width: `${media.pos / media.len * 100}%`}})),
        h('div', {class: 'controls'},
            h('button', {class: 'round-btn', 'aria-label': '⏮', onclick: skip(-1)}, icon('media-skip-backward')),
            playBtn,
            h('button', {class: 'round-btn', 'aria-label': '⏭', onclick: skip(1)}, icon('media-skip-forward'))),
        h('div', {class: 'timer'}, h('span', {}, S.timer), timerLabel,
            h('div', {style: {display: 'flex', gap: '6px'}},
                h('button', {class: 'chip', onclick: () => {
                    timer.left += 60;
                    timerLabel.textContent = fmtTimer(timer.left);
                    syncIsland();
                }}, '+1:00'),
                h('button', {class: 'chip', onclick: () => {
                    toggleTimer();
                    islandPanel.render();
                }}, timer.running ? S.pause : S.start),
                h('button', {class: 'chip', onclick: () => {
                    clearInterval(timer.id);
                    Object.assign(timer, {left: 0, running: false});
                    syncIsland();
                    islandPanel.render();
                }}, S.reset))),
        notes,
        h('div', {class: 'tools'}, [
            ['applications-graphics', S.screenshot], ['media-playback-start', S.record],
            ['hypede-filetype-text', S.ocr], ['preferences-desktop-wallpaper', S.picker],
        ].map(([i, label]) => h('button', {class: 'tool', onclick: () => full(label)}, icon(i), label))));
};

function toggleTimer() {
    if (timer.running) {
        clearInterval(timer.id);
        timer.running = false;
    } else if (timer.left > 0) {
        timer.running = true;
        timer.id = setInterval(() => {
            timer.left--;
            if (islandPanel.isOpen)
                islandPanel.el.querySelector('.timer b').textContent = fmtTimer(timer.left);
            if (timer.left <= 0) {
                clearInterval(timer.id);
                timer.running = false;
                notify({iconName: 'alarm', title: S.timerDone, body: S.timerBody, force: true});
            }
            syncIsland();
        }, 1000);
    }
    syncIsland();
}

// ---------------------------------------------------------------- файловая система

const ru = lang === 'ru';
const N = {
    docs: ru ? 'Документы' : 'Documents', down: ru ? 'Загрузки' : 'Downloads', pics: ru ? 'Изображения' : 'Pictures',
    music: ru ? 'Музыка' : 'Music', proj: ru ? 'Проекты' : 'Projects',
    welcome: ru ? 'Добро пожаловать.txt' : 'Welcome.txt', notes: ru ? 'Заметки.txt' : 'Notes.txt',
};
const txt = (name, body) => ({name, type: 'text', size: body.length, body});
const file = (name, type, size) => ({name, type, size});
const img = (name, src, size) => ({name, type: 'image', size, src});
const dir = (name, children) => ({name, type: 'folder', children});
const WELCOME = ru
    ? 'Привет! Это демо HypeDE в браузере.\n\nВсё, что вы видите, — HTML: полка, лаунчер, окна, «Файлы» и «Терминал».\nНастоящий HypeDE — это GNOME в облике Chrome OS на вашем компьютере:\nс Wi‑Fi, VPN, Bluetooth, магазином тем и ИИ-помощником.\n\nПопробуйте:\n • лаунчер — кольцо слева на полке, наберите 12*(3+4);\n • быстрые настройки — часы справа: тёмная тема, ночной свет;\n • перетащите окно к краю экрана — оно встанет на половину;\n • в «Терминале» — команда fastfetch.\n'
    : 'Hi! This is the HypeDE demo in your browser.\n\nEverything you see is HTML: the shelf, the launcher, windows, Files and Terminal.\nThe real HypeDE is GNOME reshaped into a Chrome OS–style desktop on your computer,\nwith Wi‑Fi, VPN, Bluetooth, a theme store and an AI assistant.\n\nTry:\n • the launcher — the ring on the left of the shelf; type 12*(3+4);\n • quick settings — the clock on the right: dark style, night light;\n • drag a window to a screen edge — it takes half the screen;\n • fastfetch in the Terminal.\n';
const FS = dir('~', [
    dir(N.docs, [
        txt(N.notes, ru ? 'Купить молоко\nПосмотреть HypeDE\nПоставить HypeDE на ноутбук\n' : 'Buy milk\nTry HypeDE\nInstall HypeDE on the laptop\n'),
        file(ru ? 'План.odt' : 'Plan.odt', 'document', 18400),
        file(ru ? 'Бюджет.ods' : 'Budget.ods', 'spreadsheet', 9200),
        file(ru ? 'Доклад.odp' : 'Talk.odp', 'presentation', 812000),
        file(ru ? 'Договор.pdf' : 'Contract.pdf', 'pdf', 248000),
    ]),
    dir(N.down, [
        file('Obsidian-1.7.7.AppImage', 'archive', 118000000),
        file('linux-firmware.tar.zst', 'archive', 302000000),
        img(ru ? 'Озеро.svg' : 'Lake.svg', `${BASE}wallpapers/lagoon-light.svg`, 7600),
    ]),
    dir(N.pics, [
        img('Aurora.svg', `${BASE}wallpapers/aurora-light.svg`, 6100),
        img('Peaks.svg', `${BASE}wallpapers/peaks-dark.svg`, 5400),
        img('Bloom.svg', `${BASE}wallpapers/bloom-light.svg`, 6800),
        img('Horizon.svg', `${BASE}wallpapers/horizon-dark.svg`, 5200),
    ]),
    dir(N.music, [file(ru ? 'Демо-трек.ogg' : 'Demo track.ogg', 'audio', 4300000)]),
    dir(N.proj, [
        txt('hello.py', 'print("Hello from HypeDE!")\n'),
        txt('README.md', '# HypeDE\n\nGNOME, reshaped into a Chrome OS–style desktop.\n'),
        dir('hypede', []),
    ]),
    txt(N.welcome, WELCOME),
]);
const TRASH = dir(S.trash, []);

function fsGet(path) {
    if (path === '' || path === '~')
        return FS;
    let node = FS;
    for (const part of path.replace(/^~\/?/, '').split('/').filter(Boolean)) {
        node = node?.children?.find(c => c.name === part);
        if (!node)
            return null;
    }
    return node;
}

function fsSearch(q, node = FS, path = '') {
    const out = [];
    for (const child of node.children ?? []) {
        const p = path ? `${path}/${child.name}` : child.name;
        if (child.name.toLocaleLowerCase(lang).includes(q))
            out.push({path: p, node: child});
        if (child.children)
            out.push(...fsSearch(q, child, p));
    }
    return out;
}

const TYPES = {
    folder: {icon: 'folder', color: ''}, text: {icon: 'hypede-filetype-text', color: '#5f6368'},
    image: {icon: 'hypede-filetype-image', color: '#e8710a'}, audio: {icon: 'hypede-filetype-audio', color: '#9334e6'},
    pdf: {icon: 'hypede-filetype-pdf', color: '#d93025'}, archive: {icon: 'hypede-filetype-archive', color: '#795548'},
    document: {icon: 'hypede-filetype-document', color: '#1a73e8'},
    spreadsheet: {icon: 'hypede-filetype-spreadsheet', color: '#188038'},
    presentation: {icon: 'hypede-filetype-presentation', color: '#f29900'},
};

function fileTile(node, small = false) {
    const type = TYPES[node?.type] ?? TYPES.text;
    const tile = h('span', {class: `ftile${node?.type === 'folder' ? ' folder' : ''}`,
        style: {background: type.color || null, ...(small ? {width: '34px', height: '34px', borderRadius: '10px'} : {})}},
    icon(type.icon));
    if (small && node?.type === 'folder')
        tile.querySelector('svg').style.cssText = 'width:30px;height:30px';
    else if (small)
        tile.querySelector('svg').style.cssText = 'width:18px;height:18px';
    return tile;
}

const recentFiles = store.get('recent', []).filter(p => fsGet(p));
if (!recentFiles.length)
    recentFiles.push(N.welcome, `${N.docs}/${N.notes}`, `${N.pics}/Aurora.svg`);

function openFile(path) {
    closePopups();
    const node = fsGet(path);
    if (!node)
        return;
    if (node.type === 'folder')
        return openFiles(path);
    const i = recentFiles.indexOf(path);
    if (i >= 0)
        recentFiles.splice(i, 1);
    recentFiles.unshift(path);
    store.set('recent', recentFiles.slice(0, 8));
    if (node.type === 'text') {
        return new Win('Files', {title: node.name, width: 640, height: 440,
            body: h('div', {class: 'text-view selectable'}, node.body)});
    }
    if (node.type === 'image') {
        return new Win('Files', {title: node.name, width: 720, height: 480,
            body: h('div', {class: 'viewer'}, h('img', {src: node.src, alt: node.name}))});
    }
    full(t('openWith', node.name));
}

// ---------- «Файлы» ----------

function openFiles(start = '') {
    const view = {path: start, mode: 'grid', back: [], forward: []};
    const content = h('div', {class: 'files'});
    const crumbs = h('div', {class: 'crumbs'});
    const status = h('div', {class: 'status'});
    const side = h('div', {class: 'sidebar'});
    const backBtn = h('button', {class: 'wbtn', 'aria-label': 'Back', onclick: () => {
        if (view.back.length) {
            view.forward.push(view.path);
            go(view.back.pop(), false);
        }
    }}, icon('go-previous'));
    const fwdBtn = h('button', {class: 'wbtn', 'aria-label': 'Forward', onclick: () => {
        if (view.forward.length) {
            view.back.push(view.path);
            go(view.forward.pop(), false);
        }
    }}, icon('go-next'));
    const modeBtn = h('button', {class: 'wbtn', 'aria-label': S.list, onclick: () => {
        view.mode = view.mode === 'grid' ? 'list' : 'grid';
        modeBtn.replaceChildren(icon(view.mode === 'grid' ? 'view-list' : 'view-grid'));
        render();
    }}, icon('view-list'));
    const searchBtn = h('button', {class: 'wbtn', 'aria-label': 'Search', onclick: () => launcher.open()},
        icon('system-search'));
    const main = h('div', {class: 'main'}, h('div', {class: 'toolbar'}, backBtn, fwdBtn, crumbs, modeBtn, searchBtn),
        content, status);
    const win = new Win('Files', {title: S.files, width: 820, height: 520,
        body: h('div', {style: {display: 'flex', flex: '1', minWidth: '0'}}, side, main)});

    // Раздел боковой панели — по текущему пути.
    const place = () => (view.path === 'recent' || view.path === 'trash' ? view.path : 'home');
    function sideItem(iconName, label, path) {
        return h('button', {class: `side-item${place() === (path || 'home') ? ' on' : ''}`, onclick: () => go(path)},
            icon(iconName), h('span', {class: 'lbl'}, label));
    }

    function go(path, record = true) {
        if (record && path !== view.path) {
            view.back.push(view.path);
            view.forward = [];
        }
        view.path = path;
        render();
    }

    function render() {
        side.replaceChildren(
            sideItem('document-open-recent', S.recent, 'recent'),
            sideItem('go-home', S.home, ''),
            sideItem('hypede-trash', S.trash, 'trash'),
            h('div', {class: 'side-title'}, S.devices),
            h('button', {class: 'side-item', onclick: () => full(S.fileSystem)}, icon('hypede-device'),
                h('span', {class: 'lbl'}, S.fileSystem)));
        let entries, title;
        if (view.path === 'recent') {
            entries = recentFiles.map(p => ({path: p, node: fsGet(p)})).filter(e => e.node);
            title = S.recent;
            crumbs.replaceChildren(h('button', {}, S.recent));
        } else if (view.path === 'trash') {
            entries = [];
            title = S.trash;
            crumbs.replaceChildren(h('button', {}, S.trash));
        } else {
            const node = fsGet(view.path) ?? FS;
            entries = (node.children ?? []).map(c => ({path: view.path ? `${view.path}/${c.name}` : c.name, node: c}))
                .sort((a, b) => (b.node.type === 'folder') - (a.node.type === 'folder') || a.node.name.localeCompare(b.node.name, lang));
            title = view.path ? node.name : S.home;
            const parts = view.path ? view.path.split('/') : [];
            crumbs.replaceChildren(
                h('button', {onclick: () => go('')}, icon('go-home')),
                ...parts.flatMap((p, i) => [h('span', {class: 'sep'}, '›'),
                    h('button', {onclick: () => go(parts.slice(0, i + 1).join('/'))}, p)]));
        }
        win.setTitle(title);
        backBtn.disabled = !view.back.length;
        fwdBtn.disabled = !view.forward.length;
        content.className = `files${view.mode === 'list' ? ' list' : ''}`;
        if (!entries.length) {
            content.replaceChildren(h('div', {class: 'empty'},
                view.path === 'trash' ? S.emptyTrash : view.path === 'recent' ? S.noRecent : S.emptyFolder));
        } else {
            content.replaceChildren(...entries.map(({path, node}) => {
                const el = h('button', {class: 'file', ondblclick: () => (node.type === 'folder' ? go(path) : openFile(path)),
                    onclick: e => {
                        for (const s of content.querySelectorAll('.selected'))
                            s.classList.remove('selected');
                        el.classList.add('selected');
                        status.textContent = `${node.name}${node.type === 'folder' ? '' : ` · ${fmtSize(node.size)}`}`;
                        if (e.detail === 0)
                            node.type === 'folder' ? go(path) : openFile(path);
                    },
                    onkeydown: e => {
                        if (e.key === 'Enter')
                            node.type === 'folder' ? go(path) : openFile(path);
                    }},
                fileTile(node), h('span', {}, node.name),
                view.mode === 'list' ? h('span', {class: 'meta'}, node.type === 'folder' ? '—' : fmtSize(node.size)) : null);
                return el;
            }));
        }
        status.textContent = entries.length === 1 ? S.item : t('items', entries.length);
    }
    go(start, false);
    return win;
}

// ---------- «Терминал» ----------

function openTerminal() {
    const out = h('div', {class: 'term-out'});
    const input = h('input', {'aria-label': S.terminal, autocomplete: 'off', spellcheck: 'false'});
    const promptEl = h('span', {class: 'p'});
    const term = h('div', {class: 'term selectable', onclick: () => {
        if (!getSelection()?.toString())
            input.focus();
    }}, out, h('div', {class: 'line'}, promptEl, input));
    let cwd = '';
    const history = [];
    let hIndex = 0;
    const user = ru ? 'гость' : 'guest';
    const prompt = () => `${user}@hypede:${cwd ? `~/${cwd}` : '~'}$`;
    const print = (text, cls) => out.append(h('div', {class: cls}, text));
    const syncPrompt = () => (promptEl.textContent = prompt());

    const resolve = arg => {
        if (!arg || arg === '~')
            return '';
        const parts = (arg.startsWith('~') || arg.startsWith('/') ? [] : cwd.split('/').filter(Boolean));
        for (const p of arg.replace(/^~\/?|^\//, '').split('/').filter(Boolean)) {
            if (p === '..')
                parts.pop();
            else if (p !== '.')
                parts.push(p);
        }
        return parts.join('/');
    };

    const fastfetch = () => {
        const ua = navigator.userAgent;
        const browser = /Firefox\/(\d+)/.exec(ua)?.[0]?.replace('/', ' ') ?? /Edg\/(\d+)/.exec(ua)?.[0]?.replace('Edg/', 'Edge ') ??
            /Chrome\/(\d+)/.exec(ua)?.[0]?.replace('/', ' ') ?? /Version\/(\d+).*Safari/.exec(ua)?.[1]?.replace(/^/, 'Safari ') ?? 'Browser';
        const logo = [
            '      ▄▄████▄▄      ', '    ▄██▀▀  ▀▀██▄    ', '   ██▀  █  █  ▀██   ', '   ██   ████   ██   ',
            '   ██▄  █  █  ▄██   ', '    ▀██▄▄  ▄▄██▀    ', '      ▀▀████▀▀      ', '                    ',
        ];
        const info = [
            [`${user}@hypede`, ''], ['-------------', ''],
            ['OS', ru ? 'HypeDE, демо в браузере' : 'HypeDE demo (in your browser)'], ['DE', 'HypeDE 0.7 (GNOME 51)'],
            ['WM', ru ? 'Mutter, нарисованный на HTML' : 'Mutter, rendered by HTML'],
            ['Shell', 'hypede-demo-sh'], ['Resolution', `${screen.width}x${screen.height}`],
            ['Browser', browser], ['CPU', `${navigator.hardwareConcurrency ?? '?'} ${ru ? 'потоков' : 'threads'}`],
            ['Memory', navigator.deviceMemory ? `≥ ${navigator.deviceMemory} GiB` : '?'],
        ];
        for (let i = 0; i < Math.max(logo.length, info.length); i++) {
            const [k, v] = info[i] ?? ['', ''];
            out.append(h('div', {}, h('span', {class: 'd'}, logo[i] ?? ' '.repeat(20)),
                h('span', {class: v ? 'p' : 'w'}, k), v ? `: ${v}` : ''));
        }
        out.append(h('div', {}, ' '.repeat(20), ...['#ea4335', '#fbbc04', '#34a853', '#4285f4', '#a142f4', '#e8eaed']
            .map(c => h('span', {style: {background: c}}, '   '))));
    };

    const run = line => {
        print(`${prompt()} ${line}`, '');
        const [cmd, ...args] = line.trim().split(/\s+/);
        if (!cmd)
            return;
        switch (cmd) {
        case 'help': print(S.termHelp); break;
        case 'clear': out.replaceChildren(); break;
        case 'pwd': print(cwd ? `/home/${user}/${cwd}` : `/home/${user}`); break;
        case 'whoami': print(user); break;
        case 'hostname': print('hypede'); break;
        case 'date': print(new Date().toLocaleString(lang)); break;
        case 'echo': print(args.join(' ')); break;
        case 'uname': print(args.includes('-a') ? 'Linux hypede 6.18-demo #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux' : 'Linux'); break;
        case 'history': history.forEach((c, i) => print(`${String(i + 1).padStart(4)}  ${c}`)); break;
        case 'fastfetch': case 'neofetch': fastfetch(); break;
        case 'exit': win.close(); break;
        case 'install': print(S.termInstall); print('git clone https://github.com/hypede/hypede && cd hypede/packaging && makepkg -si', 'p'); break;
        case 'ls': {
            const target = resolve(args.find(a => !a.startsWith('-')));
            const node = fsGet(target);
            if (!node) {
                print(t('termNoFile', args.find(a => !a.startsWith('-'))), 'e');
                break;
            }
            if (node.type !== 'folder') {
                print(node.name);
                break;
            }
            out.append(h('div', {}, (node.children ?? []).flatMap(c => [h('span', {class: c.type === 'folder' ? 'd' : ''},
                c.name.includes(' ') ? `'${c.name}'` : c.name), '  '])));
            break;
        }
        case 'cd': {
            const target = resolve(args.join(' '));
            const node = fsGet(target);
            if (!node)
                print(t('termNoFile', args.join(' ')), 'e');
            else if (node.type !== 'folder')
                print(`cd: ${args.join(' ')}: ${ru ? 'это не каталог' : 'not a directory'}`, 'e');
            else
                cwd = target;
            break;
        }
        case 'cat': case 'open': case 'xdg-open': {
            const name = args.join(' ').replace(/^'|'$/g, '');
            const path = resolve(name);
            const node = fsGet(path);
            if (!node)
                print(t('termNoFile', name), 'e');
            else if (cmd === 'cat' && node.type === 'folder')
                print(t('termIsDir', name), 'e');
            else if (cmd === 'cat' && node.type === 'text')
                print(node.body);
            else if (cmd === 'cat')
                print(ru ? '(двоичный файл)' : '(binary file)', 'w');
            else
                openFile(path);
            break;
        }
        case 'sudo': case 'pacman': case 'yay': case 'paru': case 'makepkg': case 'git': case 'apt': case 'flatpak':
        case 'systemctl': case 'nano': case 'vim': case 'nvim': case 'top': case 'htop': case 'python': case 'python3':
        case 'ssh': case 'curl': case 'wget': case 'hypede-tasks':
            print(t('termFull', cmd), 'w');
            break;
        default: print(t('termNotFound', cmd), 'e');
        }
        term.scrollTop = term.scrollHeight;
    };

    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const line = input.value;
            input.value = '';
            if (line.trim())
                history.push(line);
            hIndex = history.length;
            run(line);
            syncPrompt();
            term.scrollTop = term.scrollHeight;
        } else if (e.key === 'ArrowUp' && history.length) {
            hIndex = Math.max(0, hIndex - 1);
            input.value = history[hIndex];
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            hIndex = Math.min(history.length, hIndex + 1);
            input.value = history[hIndex] ?? '';
            e.preventDefault();
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const words = input.value.split(' ');
            const last = words.pop();
            const base = last.includes('/') ? last.slice(0, last.lastIndexOf('/') + 1) : '';
            const node = fsGet(resolve(base));
            const match = (node?.children ?? []).filter(c => c.name.startsWith(last.slice(base.length)));
            if (match.length === 1)
                input.value = [...words, base + match[0].name + (match[0].type === 'folder' ? '/' : '')].join(' ');
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            out.replaceChildren();
        }
    });

    const win = new Win('Terminal', {title: S.terminal, width: 720, height: 440, body: term});
    print(ru ? 'Демо-терминал HypeDE. Наберите help или fastfetch.' : 'HypeDE demo terminal. Type help or fastfetch.', 'w');
    syncPrompt();
    setTimeout(() => input.focus(), 50);
    return win;
}

// ---------- «Настройки» ----------

const SETTINGS_PAGES = {
    network: {title: S.network, subtitle: S.networkS, icon: 'network-wireless'},
    bluetooth: {title: S.bluetooth, subtitle: S.btS, icon: 'bluetooth'},
    device: {title: S.device, subtitle: S.deviceS, icon: 'hypede-device'},
    personal: {title: S.personal, subtitle: S.personalS, icon: 'applications-graphics', page: personalPage},
    shelf: {title: S.shelf, subtitle: S.shelfS, icon: 'view-app-grid', page: shelfPage},
    lock: {title: S.lockScreen, subtitle: S.lockS, icon: 'system-lock-screen'},
    security: {title: S.security, subtitle: S.securityS, icon: 'dialog-information'},
    apps: {title: S.apps, subtitle: S.appsS, icon: 'view-grid'},
    ai: {title: S.ai, subtitle: S.aiS, icon: 'hypede-assistant'},
    a11y: {title: S.a11y, subtitle: S.a11yS, icon: 'input-keyboard', page: a11yPage},
    about: {title: S.about, subtitle: S.aboutS, icon: 'help-about', page: aboutPage},
};

const switchRow = (title, sub, key, onChange) => {
    const sw = h('button', {class: 'switch', role: 'switch', 'aria-checked': String(!!state[key]), 'aria-label': title});
    const row = h('div', {class: 'row'}, h('div', {class: 'txt'}, h('div', {}, title), sub ? h('div', {class: 's'}, sub) : null), sw);
    sw.addEventListener('click', () => {
        onChange ? onChange() : setLook(key, !state[key]);
        sw.setAttribute('aria-checked', String(!!state[key]));
    });
    lookListeners.add(() => sw.setAttribute('aria-checked', String(!!state[key])));
    return row;
};

function personalPage() {
    const swatches = h('div', {class: 'swatches'}, ACCENTS.map(a => h('button', {
        class: `swatch${state.accent === a.name ? ' on' : ''}`, style: {background: a.light}, 'aria-label': a.name,
        onclick: e => {
            setLook('accent', a.name);
            for (const s of swatches.children)
                s.classList.toggle('on', s === e.currentTarget);
        },
    })));
    const walls = h('div', {class: 'walls'}, WALLPAPERS.map(w => h('button', {
        class: `wall${state.wallpaper === w ? ' on' : ''}`, 'aria-label': w,
        style: {backgroundImage: `url("${BASE}wallpapers/${w}-${state.scheme}.svg")`},
        onclick: e => {
            setLook('wallpaper', w);
            for (const s of walls.children)
                s.classList.toggle('on', s === e.currentTarget);
        },
    })));
    const darkRow = switchRow(S.dark, S.darkS, 'scheme', () => setLook('scheme', state.scheme === 'dark' ? 'light' : 'dark'));
    const sw = darkRow.querySelector('.switch');
    const syncDark = () => {
        sw.setAttribute('aria-checked', String(state.scheme === 'dark'));
        for (const [i, w] of WALLPAPERS.entries())
            walls.children[i].style.backgroundImage = `url("${BASE}wallpapers/${w}-${state.scheme}.svg")`;
    };
    lookListeners.add(syncDark);
    syncDark();
    return [
        h('h2', {}, S.personal),
        h('div', {class: 'card'}, darkRow,
            h('div', {class: 'row'}, h('div', {class: 'txt'}, h('div', {}, S.accent), h('div', {class: 's'}, S.accentS)), swatches)),
        h('div', {class: 'card'}, h('div', {class: 'row'}, h('div', {class: 'txt'}, S.wallpaper)), walls),
        h('div', {class: 'card'},
            fullRow(S.liveWall, S.liveWallS), fullRow(S.glass, S.glassS)),
    ];
}

function fullRow(title, sub) {
    return h('button', {class: 'row', style: {width: '100%', textAlign: 'left'}, onclick: () => full(title)},
        h('div', {class: 'txt'}, h('div', {}, title), h('div', {class: 's'}, sub)), h('span', {class: 'badge'}, 'HypeDE'));
}

function shelfPage() {
    const seg = h('div', {class: 'seg'}, [['center', S.center], ['left', S.left]].map(([v, label]) =>
        h('button', {class: state.align === v ? 'on' : '', onclick: e => {
            setLook('align', v);
            for (const b of seg.children)
                b.classList.toggle('on', b === e.currentTarget);
        }}, label)));
    return [
        h('h2', {}, S.shelf),
        h('div', {class: 'card'},
            switchRow(S.autohide, S.autohideS, 'autohide'),
            h('div', {class: 'row'}, h('div', {class: 'txt'}, S.align), seg),
            switchRow(S.tooltips, null, 'tooltips'),
            fullRow(S.previews, '')),
    ];
}

function a11yPage() {
    return [h('h2', {}, S.a11y), h('div', {class: 'card'}, switchRow(S.bigText, S.bigTextS, 'bigText'))];
}

function aboutPage() {
    const ua = navigator.userAgent;
    const browser = /Firefox\/\d+/.exec(ua)?.[0] ?? /Edg\/\d+/.exec(ua)?.[0] ?? /Chrome\/\d+/.exec(ua)?.[0] ??
        /Version\/\d+.*Safari/.exec(ua)?.[0] ?? '—';
    return [
        h('div', {class: 'full-card'},
            h('img', {src: new URL('assets/img/logo.svg', SITE).href, alt: '', width: '72', height: '72',
                style: {margin: '0 auto 12px', display: 'block'}}),
            h('h2', {style: {margin: '0'}}, 'HypeDE 0.7'),
            h('p', {}, S.aboutText),
            h('div', {class: 'acts', style: {display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap'}},
                h('a', {class: 'btn', href: INSTALL_URL, target: '_top'}, S.install),
                h('a', {class: 'btn quiet', href: GITHUB_URL, target: '_blank', rel: 'noopener'}, S.source))),
        h('div', {class: 'card'},
            h('div', {class: 'row'}, h('div', {class: 'txt'}, S.browser), h('span', {class: 's'}, browser.replace('/', ' '))),
            h('div', {class: 'row'}, h('div', {class: 'txt'}, S.screen), h('span', {class: 's'}, `${screen.width} × ${screen.height}`))),
    ];
}

function openSettings(pageId = 'personal') {
    let win = windowsOf('Settings')[0];
    const page = h('div', {class: 'page'});
    const side = h('div', {class: 'sidebar'});
    const show = id => {
        const p = SETTINGS_PAGES[id];
        for (const b of side.querySelectorAll('.side-item'))
            b.classList.toggle('on', b.dataset.page === id);
        page.replaceChildren(...(p.page ? p.page() : [h('div', {class: 'full-card'},
            h('div', {class: 'big-i'}, icon(p.icon)),
            h('h2', {}, t('fullPage', p.title)),
            h('p', {}, S.fullPageText),
            h('a', {class: 'btn', href: INSTALL_URL, target: '_top'}, S.install))]));
        page.scrollTop = 0;
    };
    if (win) {
        if (win.minimized)
            win.restore();
        win.focus();
        win.show(pageId);
        return win;
    }
    side.append(...Object.entries(SETTINGS_PAGES).map(([id, p]) => h('button', {
        class: 'side-item', 'data-page': id, onclick: () => show(id), title: p.subtitle,
    }, icon(p.icon), h('span', {class: 'lbl'}, p.title))));
    win = new Win('Settings', {title: S.settings, width: 860, height: 560,
        body: h('div', {style: {display: 'flex', flex: '1', minWidth: '0'}}, side, page)});
    win.show = show;
    show(pageId);
    return win;
}

// ---------- «Погода» ----------

function openWeather() {
    const hours = [...Array(6)].map((_, i) => {
        const d = new Date(Date.now() + i * 3600e3);
        return h('div', {}, h('div', {class: 's'}, i ? d.toLocaleTimeString(lang, {hour: 'numeric'}) : S.now),
            h('div', {style: {fontSize: '22px'}}, ['☀', '⛅', '⛅', '☁', '🌦', '☁'][i]), `${[12, 13, 13, 11, 9, 8][i]}°`);
    });
    const days = [...Array(5)].map((_, i) => {
        const d = new Date(Date.now() + (i + 1) * 86400e3);
        return h('div', {class: 'row'}, h('div', {class: 'txt'}, d.toLocaleDateString(lang, {weekday: 'long'})),
            h('span', {}, ['⛅', '☀', '🌧', '☁', '☀'][i]), h('span', {class: 's', style: {width: '70px', textAlign: 'right'}},
                `${[14, 16, 10, 11, 15][i]}° / ${[6, 7, 5, 4, 8][i]}°`));
    });
    return new Win('Weather', {title: S.weather, width: 560, height: 560,
        body: h('div', {class: 'page'},
            h('div', {class: 'weather-now'}, h('div', {style: {fontSize: '64px'}}, '⛅'),
                h('div', {}, h('div', {class: 'temp'}, '12°'), h('div', {}, `${S.city} · ${S.partly}`),
                    h('div', {class: 's', style: {color: 'var(--dim)'}}, t('feels', '10')))),
            h('div', {class: 'hours'}, hours),
            h('div', {class: 'card', style: {marginTop: '18px'}}, days),
            h('p', {class: 's', style: {color: 'var(--dim)', fontSize: '12.5px'}}, S.demoData))});
}

// ---------- «Диспетчер задач» ----------

function openTasks() {
    const rows = new Map();
    let selectedKey = null;
    const tbody = h('tbody');
    const endBtn = h('button', {class: 'btn', disabled: true, onclick: () => {
        const task = rows.get(selectedKey);
        if (!task)
            return;
        if (task.win)
            task.win.close();
        else
            dialog({iconName: 'utilities-system-monitor', title: task.name, text: S.cantEnd, actions: [{label: 'OK'}]});
    }}, S.end);
    const background = [
        {key: 'shell', name: S.shellTask, app: 'Settings', mem: 412e6, base: 1.2},
        {key: 'desktop', name: S.desktopTask, app: 'Files', mem: 96e6, base: 0.1},
        {key: 'island', name: S.islandTask, app: 'Weather', mem: 38e6, base: 0.3},
    ];
    const render = () => {
        const list = [
            ...wm.windows.filter(w => w !== win).map(w => ({key: `w${w.id}`, name: w.titleEl.textContent,
                app: w.app, win: w, mem: (w.app === 'Terminal' ? 48 : w.app === 'Files' ? 132 : 88) * 1e6, base: w.app === 'Terminal' ? 0.4 : 0.8})),
            ...background,
            {key: 'tasks', name: S.tasks, app: 'TaskManager', mem: 61e6, base: 0.6},
        ];
        tbody.replaceChildren(...list.map(task => {
            const prev = rows.get(task.key);
            task.cpu = Math.max(0, (prev?.cpu ?? task.base) * 0.7 + (task.base + Math.random() * task.base * 2) * 0.3);
            rows.set(task.key, task);
            const tr = h('tr', {class: task.key === selectedKey ? 'sel' : '', onclick: () => {
                selectedKey = task.key;
                endBtn.disabled = false;
                render();
            }},
            h('td', {}, h('span', {style: {display: 'flex', gap: '10px', alignItems: 'center'}},
                h('img', {src: `${BASE}apps/dev.hypede.${task.app}.svg`, width: '22', height: '22', alt: ''}), task.name)),
            h('td', {class: 'n'}, `${task.cpu.toLocaleString(lang, {maximumFractionDigits: 1, minimumFractionDigits: 1})} %`),
            h('td', {class: 'n'}, fmtSize(task.mem)));
            return tr;
        }));
        if (selectedKey && !list.some(task => task.key === selectedKey)) {
            selectedKey = null;
            endBtn.disabled = true;
        }
    };
    const timerId = setInterval(render, 2000);
    const win = new Win('TaskManager', {title: S.tasks, width: 600, height: 460, onClose: () => clearInterval(timerId),
        body: h('div', {class: 'main'},
            h('div', {style: {flex: '1', overflow: 'auto'}},
                h('table', {class: 'table'}, h('thead', {}, h('tr', {}, h('th', {}, S.task),
                    h('th', {style: {textAlign: 'right'}}, S.cpu), h('th', {style: {textAlign: 'right'}}, S.memory))), tbody)),
            h('div', {style: {display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px'}},
                h('span', {class: 's', style: {flex: '1', color: 'var(--dim)', fontSize: '12.5px'}}, S.cpuHint), endBtn))});
    render();
    return win;
}

// ---------- «ИИ-помощник» ----------

function openAssistant() {
    return new Win('Assistant', {title: S.assistant, width: 460, height: 520,
        body: h('div', {class: 'page'}, h('div', {class: 'full-card'},
            h('img', {src: `${BASE}apps/dev.hypede.Assistant.svg`, width: '64', height: '64', alt: '',
                style: {margin: '0 auto 14px', display: 'block'}}),
            h('h2', {}, S.aiTitle), h('p', {}, S.aiText),
            h('a', {class: 'btn', href: INSTALL_URL, target: '_top'}, S.install)))});
}

// ---------------------------------------------------------------- экран блокировки

let lockScreen = null;
function lock() {
    closePopups();
    if (lockScreen)
        return;
    const clock = h('div', {class: 'clock'});
    const date = h('div', {class: 'date'});
    const prompt = h('div', {hidden: true, style: {textAlign: 'center'}},
        h('div', {class: 'avatar'}, S.guest[0]), h('div', {style: {fontSize: '18px', fontWeight: '600'}}, S.guest),
        h('button', {class: 'btn', style: {marginTop: '16px'}, onclick: unlock}, S.signIn),
        h('div', {style: {opacity: '0.75', marginTop: '10px', fontSize: '13px'}}, S.noPassword));
    const hint = h('div', {class: 'hint'}, S.lockHint);
    const el = h('div', {class: 'lock', style: {backgroundImage: wallpaper.style.backgroundImage}, tabindex: '-1'},
        h('div', {}, clock, date, hint, prompt));
    const reveal = () => {
        hint.hidden = true;
        prompt.hidden = false;
        prompt.querySelector('.btn').focus();
    };
    el.addEventListener('pointerdown', e => {
        if (!e.target.closest('.btn'))
            reveal();
    });
    el.addEventListener('keydown', e => {
        if (prompt.hidden) {
            reveal();
            e.preventDefault();
        } else if (e.key === 'Enter') {
            unlock();
        }
    });
    function unlock() {
        el.remove();
        lockScreen = null;
    }
    lockScreen = {el, update() {
        const now = new Date();
        clock.textContent = now.toLocaleTimeString(lang, {hour: 'numeric', minute: '2-digit'});
        date.textContent = now.toLocaleDateString(lang, {weekday: 'long', day: 'numeric', month: 'long'});
    }};
    lockScreen.update();
    root.append(el);
    el.focus();
}

// ---------------------------------------------------------------- рабочий стол и клавиши

desktopIcons.append(
    h('button', {class: 'desktop-icon', ondblclick: () => launch('Files'), onclick: e => e.detail === 0 && launch('Files')},
        h('img', {class: 'tile', src: `${BASE}apps/dev.hypede.Files.svg`, alt: ''}), S.home),
    h('button', {class: 'desktop-icon', ondblclick: () => openFiles('trash'), onclick: e => e.detail === 0 && openFiles('trash')},
        h('span', {class: 'tile', style: {display: 'grid', placeItems: 'center', background: '#34a853', borderRadius: '14px', color: '#fff'}},
            icon('hypede-trash')), S.trash),
    h('button', {class: 'desktop-icon', ondblclick: () => openFile(N.welcome), onclick: e => e.detail === 0 && openFile(N.welcome)},
        h('span', {class: 'tile', style: {display: 'grid', placeItems: 'center'}}, fileTile(fsGet(N.welcome))), N.welcome));

// Super/Meta — лаунчер (если браузер и система отдают клавишу странице).
let metaAlone = false;
addEventListener('keydown', e => {
    metaAlone = e.key === 'Meta' || e.key === 'OS';
    if (e.key === 'Escape') {
        if ([...popups].some(p => p.isOpen))
            closePopups();
    }
});
addEventListener('keyup', e => {
    if ((e.key === 'Meta' || e.key === 'OS') && metaAlone && !lockScreen)
        launcher.toggle();
    metaAlone = false;
});

// Плашка демо сверху.
bar = h('div', {class: 'demo-bar'},
    h('span', {class: 'txt'}, S.demoBar),
    h('a', {class: 'btn', href: INSTALL_URL, target: '_top'}, S.install),
    h('a', {class: 'btn quiet', href: HOME_URL, target: '_top'}, S.back),
    h('button', {class: 'wbtn', 'aria-label': 'Close', onclick: () => {
        bar.remove();
        for (const w of wm.windows) {
            if (w.maxed)
                w._place();
        }
    }}, icon('window-close')));
root.append(bar);

applyLook();
renderShelf();
tick();
setInterval(tick, 15000);
syncIsland();

setTimeout(() => notify({app: 'Settings', title: S.welcomeTitle, body: S.welcomeBody, force: true, actions: [
    {label: S.install, run: () => (location.href = INSTALL_URL)},
    {label: S.gotIt, run: () => {}},
]}), 900);
