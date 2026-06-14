const copiedTimers = new WeakMap<HTMLButtonElement, number>();

if (typeof document !== 'undefined') {
  document.addEventListener('click', async (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const button = target?.closest<HTMLButtonElement>('.commandCopyButton');
    if (!button) {
      return;
    }

    const command = button.dataset.commandCopyValue;
    if (!command) {
      return;
    }

    event.preventDefault();

    try {
      await navigator.clipboard.writeText(command);
    } catch {
      fallbackCopy(command);
    }

    showCopied(button);
  });
}

function fallbackCopy(command: string): void {
  const textarea = document.createElement('textarea');
  textarea.value = command;
  textarea.setAttribute('readonly', 'true');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.append(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

function showCopied(button: HTMLButtonElement): void {
  button.dataset.copied = 'true';
  button.setAttribute('aria-label', 'Copied command');
  button.title = 'Copied';

  const existingTimer = copiedTimers.get(button);
  if (existingTimer) {
    window.clearTimeout(existingTimer);
  }

  const timer = window.setTimeout(() => {
    button.dataset.copied = 'false';
    button.setAttribute('aria-label', 'Copy command');
    button.title = 'Copy command';
    copiedTimers.delete(button);
  }, 1200);
  copiedTimers.set(button, timer);
}
