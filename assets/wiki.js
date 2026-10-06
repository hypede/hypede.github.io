// Вики: поиск по всем страницам, подсветка текущего раздела в оглавлении,
// кнопки «Копировать» у блоков кода.
const body = document.body;
const input = document.querySelector('.wiki-search input');
const nav = document.querySelector('.wiki-nav ul');
const results = document.querySelector('.wiki-results');
const ru = document.documentElement.lang === 'ru';
let index = null;

async function load() {
    if (!index)
        index = await fetch(body.dataset.index).then(r => r.json()).catch(() => []);
    return index;
}

function escape(s) {
    return s.replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[c]);
}

function snippet(text, words) {
    const low = text.toLocaleLowerCase();
    const at = Math.max(0, low.indexOf(words[0]) - 40);
    let s = escape(text.slice(at, at + 140));
    for (const w of words)
        s = s.replace(new RegExp(w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), m => `<mark>${m}</mark>`);
    return (at ? '…' : '') + s + '…';
}

async function search() {
    const q = input.value.trim().toLocaleLowerCase();
    if (!q) {
        results.hidden = true;
        nav.hidden = false;
        return;
    }
    const words = q.split(/\s+/);
    const hits = (await load())
        .map(e => {
            const hay = `${e.section} ${e.text}`.toLocaleLowerCase();
            if (!words.every(w => hay.includes(w)))
                return null;
            const score = words.reduce((n, w) => n + (e.section.toLocaleLowerCase().includes(w) ? 3 : 0) +
                (e.title.toLocaleLowerCase().includes(w) ? 2 : 0), 0);
            return {e, score};
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .slice(0, 12);
    results.replaceChildren(...(hits.length ? hits.map(({e}) => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${e.page}${e.anchor ? '#' + e.anchor : ''}">${escape(e.section)}` +
            `<small>${escape(e.title)} · ${snippet(e.text, words)}</small></a>`;
        return li;
    }) : [Object.assign(document.createElement('li'), {className: 'empty', textContent: body.dataset.nothing})]));
    results.hidden = false;
    nav.hidden = true;
}

input?.addEventListener('input', search);
input?.addEventListener('keydown', e => {
    if (e.key === 'Enter')
        results.querySelector('a')?.click();
    if (e.key === 'Escape') {
        input.value = '';
        search();
    }
});
addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
    }
});

// Текущий раздел в оглавлении.
const links = new Map([...document.querySelectorAll('.wiki-toc a')].map(a => [decodeURIComponent(a.hash.slice(1)), a]));
if ('IntersectionObserver' in window && links.size) {
    const seen = new IntersectionObserver(entries => {
        for (const entry of entries) {
            if (!entry.isIntersecting)
                continue;
            links.forEach(a => a.classList.remove('active'));
            links.get(entry.target.id)?.classList.add('active');
        }
    }, {rootMargin: '-20% 0px -70% 0px'});
    document.querySelectorAll('.wiki-page h2[id], .wiki-page h3[id]').forEach(h => seen.observe(h));
}

// Копирование кода.
for (const pre of document.querySelectorAll('pre.code')) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = ru ? 'Копировать' : 'Copy';
    button.addEventListener('click', async () => {
        const text = pre.querySelector('code').textContent.trim();
        try {
            await navigator.clipboard.writeText(text);
            button.textContent = ru ? 'Скопировано' : 'Copied';
        } catch {
            const range = document.createRange();
            range.selectNodeContents(pre.querySelector('code'));
            getSelection().removeAllRanges();
            getSelection().addRange(range);
            button.textContent = ru ? 'Выделено' : 'Selected';
        }
        setTimeout(() => (button.textContent = ru ? 'Копировать' : 'Copy'), 1600);
    });
    pre.append(button);
}
