// The site's shelf: live clock, launcher bubble with section search and the
// same calculator HypeDE's launcher uses, copy buttons, current-section pill.
import {evaluate, looksLikeMath} from './calculator.js';

const lang = document.documentElement.lang.startsWith('ru') ? 'ru' : 'en';

// ---- clock and date in the tray ----
const clock = document.querySelector('.tray .time');
const date = document.querySelector('.tray .date');
function tick() {
    const now = new Date();
    if (clock) clock.textContent = now.toLocaleTimeString(lang, {hour: '2-digit', minute: '2-digit'});
    if (date) date.textContent = now.toLocaleDateString(lang, {day: 'numeric', month: 'short'}).replace('.', '');
}
tick();
setInterval(tick, 15000);

// ---- launcher bubble ----
const ring = document.querySelector('.ring');
const bubble = document.getElementById('launcher');
const input = document.getElementById('launcher-search');
const list = bubble?.querySelector('ul');
const calc = bubble?.querySelector('.calc');
const targets = [...document.querySelectorAll('[data-launcher]')].map(el => ({
    title: el.dataset.launcher,
    href: `#${el.id}`,
}));

function render() {
    const q = input.value.trim().toLocaleLowerCase();
    list.replaceChildren(...targets
        .filter(t => !q || t.title.toLocaleLowerCase().includes(q))
        .map(t => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = t.href;
            a.textContent = t.title;
            a.addEventListener('click', () => toggle(false));
            li.append(a);
            return li;
        }));
    const value = looksLikeMath(input.value) ? evaluate(input.value) : null;
    calc.hidden = value === null;
    if (value !== null) calc.textContent = `= ${value}`;
}

function toggle(open = bubble.hidden) {
    bubble.hidden = !open;
    ring.setAttribute('aria-expanded', String(open));
    if (open) {
        render();
        input.focus();
    }
}

if (ring && bubble) {
    ring.addEventListener('click', () => toggle());
    input.addEventListener('input', render);
    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            const first = list.querySelector('a');
            if (first) {
                location.hash = first.getAttribute('href');
                toggle(false);
            }
        }
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !bubble.hidden) {
            toggle(false);
            ring.focus();
        }
    });
    document.addEventListener('click', e => {
        if (!bubble.hidden && !bubble.contains(e.target) && !ring.contains(e.target)) toggle(false);
    });
}

// ---- copy buttons ----
for (const button of document.querySelectorAll('[data-copy]')) {
    const label = button.textContent;
    button.addEventListener('click', async () => {
        const text = document.getElementById(button.dataset.copy).textContent.trim();
        try {
            await navigator.clipboard.writeText(text);
            button.textContent = button.dataset.done;
        } catch {
            const range = document.createRange();
            range.selectNodeContents(document.getElementById(button.dataset.copy));
            getSelection().removeAllRanges();
            getSelection().addRange(range);
            button.textContent = button.dataset.select;
        }
        setTimeout(() => (button.textContent = label), 1800);
    });
}

// ---- scroll reveal ----
// Only for what is below the fold at load: the first screen is already
// animated by CSS and must never start out invisible.
const motionOk = !matchMedia('(prefers-reduced-motion: reduce)').matches;
if (motionOk && 'IntersectionObserver' in window) {
    const candidates = document.querySelectorAll(
        '.section-head, .part, .how article, .step, .gallery figure, .wave-band, pre.tree, .chips li');
    const revealer = new IntersectionObserver(entries => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add('in');
            revealer.unobserve(entry.target);
        }
    }, {rootMargin: '0px 0px -8% 0px', threshold: 0.08});
    for (const el of candidates) {
        if (el.getBoundingClientRect().top < innerHeight) continue;
        el.classList.add('reveal');
        revealer.observe(el);
    }
    document.documentElement.classList.add('motion');
}

// ---- current section on the shelf ----
const links = new Map([...document.querySelectorAll('.shelf-apps a[href^="#"]')]
    .map(a => [a.getAttribute('href').slice(1), a]));
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            for (const a of links.values()) a.removeAttribute('aria-current');
            links.get(entry.target.id)?.setAttribute('aria-current', 'true');
        }
    }, {rootMargin: '-40% 0px -55% 0px'});
    for (const id of links.keys()) {
        const section = document.getElementById(id);
        if (section) observer.observe(section);
    }
}
