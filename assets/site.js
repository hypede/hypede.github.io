// Copy buttons for the install commands.
for (const button of document.querySelectorAll('[data-copy]')) {
    button.addEventListener('click', async () => {
        const text = document.getElementById(button.dataset.copy).textContent;
        const label = button.textContent;
        try {
            await navigator.clipboard.writeText(text);
            button.textContent = button.dataset.done;
        } catch {
            const range = document.createRange();
            range.selectNodeContents(document.getElementById(button.dataset.copy));
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            button.textContent = button.dataset.select;
        }
        setTimeout(() => { button.textContent = label; }, 2000);
    });
}
