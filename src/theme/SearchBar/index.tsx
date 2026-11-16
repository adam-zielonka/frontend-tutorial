import React, {useEffect, useRef} from 'react';
import OriginalSearchBar from '@theme-original/SearchBar';
import styles from './styles.module.css';

/** Keep the plugin's indexing and keyboard behavior; adapt its popup to the visible viewport. */
export default function SearchBar(props: React.ComponentProps<typeof OriginalSearchBar>) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      const clear = element.querySelector<HTMLButtonElement>('.navbar__search > button');
      if (clear) {
        clear.type = 'button';
        clear.setAttribute('aria-label', 'Clear search');
        clear.title = 'Clear search';
      }
      const menu = element.querySelector<HTMLElement>('[role="listbox"]');
      if (!menu || !menu.getClientRects().length) return;
      menu.setAttribute('aria-label', 'Search results');
      const viewport = window.visualViewport;
      const bottom = viewport ? viewport.height + viewport.offsetTop : window.innerHeight;
      menu.style.maxHeight = `${Math.max(0, bottom - menu.getBoundingClientRect().top - 12)}px`;
      const activeId = element.querySelector('input')?.getAttribute('aria-activedescendant');
      const active = activeId ? document.getElementById(activeId) : null;
      if (active && menu.contains(active)) {
        const bounds = menu.getBoundingClientRect();
        const option = active.getBoundingClientRect();
        if (option.bottom > bounds.bottom - 12) menu.scrollTop += option.bottom - bounds.bottom + 12;
        else if (option.top < bounds.top + 12) menu.scrollTop -= bounds.top + 12 - option.top;
      }
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    // The plugin creates the clear button and listbox after the index loads.
    const observer = new MutationObserver(schedule);
    observer.observe(element, {childList: true, subtree: true, attributes: true,
      attributeFilter: ['aria-expanded', 'aria-activedescendant']});
    const viewport = window.visualViewport;
    viewport?.addEventListener('resize', schedule);
    viewport?.addEventListener('scroll', schedule);
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      viewport?.removeEventListener('resize', schedule);
      viewport?.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  return <div ref={root} className={styles.search} onPointerDownCapture={event => {
    // Keep the input focused: mobile CSS otherwise hides Clear between pointerdown and click.
    if ((event.target as HTMLElement).closest('button[aria-label="Clear search"]')) event.preventDefault();
  }} onClick={event => {
    if ((event.target as HTMLElement).closest('button[aria-label="Clear search"]')) {
      root.current?.querySelector<HTMLInputElement>('input')?.focus();
    }
  }}><OriginalSearchBar {...props} /></div>;
}
