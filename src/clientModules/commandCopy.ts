const copiedTimers = new WeakMap<HTMLButtonElement, number>();
let activeTooltipToken: HTMLElement | null = null;
let activeTooltipMode: 'hover' | 'focus' | 'tap' | null = null;
let repositionFrame = 0;

if (typeof document !== 'undefined') {
  ensureTooltipTokens();
  observeTooltipTokens();

  document.addEventListener('click', async (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const tooltipToken = target?.closest<HTMLElement>('.commandRichToken');
    if (tooltipToken && tooltipForToken(tooltipToken)) {
      event.preventDefault();
      toggleTapTooltip(tooltipToken);
      return;
    }

    if (activeTooltipMode === 'tap') {
      closeTooltip();
    }

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

  document.addEventListener('pointerenter', (event) => {
    const token = tooltipTokenFromEvent(event);
    const pointerType = 'pointerType' in event ? event.pointerType : '';
    if (!token || pointerType === 'touch') {
      return;
    }
    openTooltip(token, 'hover');
  }, true);

  document.addEventListener('pointerleave', (event) => {
    const token = tooltipTokenFromEvent(event);
    if (token && token === activeTooltipToken && activeTooltipMode === 'hover') {
      closeTooltip();
    }
  }, true);

  document.addEventListener('focusin', (event) => {
    const token = tooltipTokenFromEvent(event);
    if (token) {
      openTooltip(token, 'focus');
    }
  });

  document.addEventListener('focusout', (event) => {
    const token = tooltipTokenFromEvent(event);
    if (!token || token !== activeTooltipToken || activeTooltipMode !== 'focus') {
      return;
    }
    window.setTimeout(() => {
      if (activeTooltipToken === token && !token.contains(document.activeElement)) {
        closeTooltip();
      }
    }, 0);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeTooltip();
    }
  });

  window.addEventListener('resize', scheduleTooltipPosition, {passive: true});
  window.addEventListener('scroll', scheduleTooltipPosition, {capture: true, passive: true});
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

function tooltipTokenFromEvent(event: Event): HTMLElement | null {
  const target = event.target instanceof Element ? event.target : null;
  const token = target?.closest<HTMLElement>('.commandRichToken') ?? null;
  return token && tooltipForToken(token) ? token : null;
}

function ensureTooltipTokens(root: ParentNode = document): void {
  const tokens = [
    ...(root instanceof HTMLElement && root.classList.contains('commandRichToken') ? [root] : []),
    ...Array.from(root.querySelectorAll<HTMLElement>('.commandRichToken')),
  ];

  tokens.forEach((token) => {
    if (!tooltipForToken(token)) {
      return;
    }
    token.dataset.commandTooltipToken = 'true';
    if (!token.hasAttribute('tabindex')) {
      token.tabIndex = 0;
    }
  });
}

function observeTooltipTokens(): void {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((node) => {
        if (node instanceof Element) {
          ensureTooltipTokens(node);
        }
      });
    }
  });
  observer.observe(document.documentElement, {childList: true, subtree: true});
}

function toggleTapTooltip(token: HTMLElement): void {
  if (activeTooltipToken === token && activeTooltipMode === 'tap') {
    closeTooltip();
    return;
  }
  openTooltip(token, 'tap');
}

function openTooltip(token: HTMLElement, mode: 'hover' | 'focus' | 'tap'): void {
  if (activeTooltipToken && activeTooltipToken !== token) {
    closeTooltip();
  }

  activeTooltipToken = token;
  activeTooltipMode = mode;
  token.dataset.commandTooltipOpen = 'true';
  positionTooltip(token);
}

function closeTooltip(): void {
  if (activeTooltipToken) {
    delete activeTooltipToken.dataset.commandTooltipOpen;
    const tooltip = tooltipForToken(activeTooltipToken);
    tooltip?.style.removeProperty('--command-tooltip-left');
    tooltip?.style.removeProperty('--command-tooltip-top');
    tooltip?.style.removeProperty('--command-tooltip-arrow-left');
    tooltip?.style.removeProperty('max-width');
    tooltip?.removeAttribute('data-placement');
  }
  activeTooltipToken = null;
  activeTooltipMode = null;
}

function scheduleTooltipPosition(): void {
  if (!activeTooltipToken || repositionFrame) {
    return;
  }
  repositionFrame = window.requestAnimationFrame(() => {
    repositionFrame = 0;
    if (activeTooltipToken) {
      positionTooltip(activeTooltipToken);
    }
  });
}

function positionTooltip(token: HTMLElement): void {
  const tooltip = tooltipForToken(token);
  if (!tooltip) {
    return;
  }

  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;
  const margin = viewportWidth < 520 ? 8 : 12;
  const gap = 9;

  tooltip.style.maxWidth = `${Math.max(180, viewportWidth - margin * 2)}px`;

  const tokenRect = token.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const center = tokenRect.left + tokenRect.width / 2;
  const maxLeft = Math.max(margin, viewportWidth - tooltipRect.width - margin);
  const left = clamp(center - tooltipRect.width / 2, margin, maxLeft);

  let placement: 'top' | 'bottom' = 'top';
  let top = tokenRect.top - tooltipRect.height - gap;
  if (top < margin) {
    placement = 'bottom';
    top = tokenRect.bottom + gap;
  }
  if (top + tooltipRect.height > viewportHeight - margin) {
    top = clamp(top, margin, Math.max(margin, viewportHeight - tooltipRect.height - margin));
  }

  const arrowLeft = clamp(center - left, 14, Math.max(14, tooltipRect.width - 14));

  tooltip.style.setProperty('--command-tooltip-left', `${Math.round(left)}px`);
  tooltip.style.setProperty('--command-tooltip-top', `${Math.round(top)}px`);
  tooltip.style.setProperty('--command-tooltip-arrow-left', `${Math.round(arrowLeft)}px`);
  tooltip.dataset.placement = placement;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function tooltipForToken(token: HTMLElement): HTMLElement | null {
  for (const child of Array.from(token.children)) {
    if (child instanceof HTMLElement && child.classList.contains('commandRichTooltip')) {
      return child;
    }
  }
  return null;
}
