// Small helpers shared by the booking wizard, the account view, the professional view and the router glue.
export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Brazilian phone mask: (11) 91234-5678, or (11) 1234-5678 for landlines. */
export function formatPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  const cut = d.length === 11 ? 7 : 6;
  return `(${d.slice(0, 2)}) ${d.slice(2, cut)}-${d.slice(cut)}`;
}

/** Restart a CSS animation that is driven by a class, even if the class is already on. */
export function restartAnimation(el: HTMLElement, className: string) {
  el.classList.remove(className);
  void el.offsetWidth;
  el.classList.add(className);
}
