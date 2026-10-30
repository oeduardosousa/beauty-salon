// Temporary client account: validated form -> sessionStorage -> account summary. No backend.
import { clearAccount, getAccount, saveAccount, syncAccountLabels } from './session';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function formatPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  const cut = d.length === 11 ? 7 : 6;
  return `(${d.slice(0, 2)}) ${d.slice(2, cut)}-${d.slice(cut)}`;
}

function init() {
  const found = document.querySelector<HTMLElement>('[data-conta]');
  if (!found) return;
  const page: HTMLElement = found;
  const formView = page.querySelector<HTMLElement>('[data-view="form"]')!;
  const accountView = page.querySelector<HTMLElement>('[data-view="account"]')!;
  const form = page.querySelector<HTMLFormElement>('#conta-form')!;
  const created = page.querySelector<HTMLElement>('[data-created]')!;

  function show(view: HTMLElement, animate: boolean) {
    for (const v of [formView, accountView]) v.hidden = v !== view;
    if (animate) {
      view.classList.remove('view-enter');
      void view.offsetWidth; // restart the CSS animation if the view is shown twice in a row
      view.classList.add('view-enter');
    }
  }

  function render(animate: boolean, justCreated = false) {
    const account = getAccount();
    syncAccountLabels();
    if (!account) { show(formView, animate); return; }
    page.querySelector('[data-name]')!.textContent = account.nome.split(' ')[0];
    page.querySelector('[data-initial]')!.textContent = account.nome.trim().charAt(0).toUpperCase();
    const when = new Date(account.criadaEm).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
    const values: Record<string, string> = { nome: account.nome, email: account.email, telefone: account.telefone, criadaEm: when };
    page.querySelectorAll<HTMLElement>('[data-f]').forEach((el) => { el.textContent = values[el.dataset.f!] ?? ''; });
    created.hidden = !justCreated;
    show(accountView, animate);
  }

  const fields = {
    nome: form.elements.namedItem('nome') as HTMLInputElement,
    email: form.elements.namedItem('email') as HTMLInputElement,
    telefone: form.elements.namedItem('telefone') as HTMLInputElement,
    ok: form.elements.namedItem('ok') as HTMLInputElement,
  };
  const rules: Record<keyof typeof fields, (el: HTMLInputElement) => string> = {
    nome: (el) => (el.value.trim().length < 2 ? 'Informe o seu nome.' : ''),
    email: (el) => (EMAIL.test(el.value.trim()) ? '' : 'Informe um e-mail válido, como nome@exemplo.com.'),
    telefone: (el) => (/^\(\d{2}\) \d{4,5}-\d{4}$/.test(el.value) ? '' : 'Informe o telefone com DDD.'),
    ok: (el) => (el.checked ? '' : 'Marque a caixa para continuar.'),
  };

  function check(name: keyof typeof fields) {
    const el = fields[name];
    const message = rules[name](el);
    const out = page!.querySelector<HTMLElement>(`#${el.getAttribute('aria-describedby')}`)!;
    out.textContent = message;
    el.setAttribute('aria-invalid', String(!!message));
    return !message;
  }

  fields.telefone.addEventListener('input', () => { fields.telefone.value = formatPhone(fields.telefone.value); });
  (Object.keys(fields) as (keyof typeof fields)[]).forEach((name) => {
    fields[name].addEventListener('blur', () => { if (fields[name].value || name === 'ok') check(name); });
    // Once a field shows an error, clear it as soon as it becomes valid.
    fields[name].addEventListener('input', () => {
      if (fields[name].getAttribute('aria-invalid') === 'true') check(name);
    });
    fields[name].addEventListener('change', () => { if (name === 'ok') check(name); });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const names = Object.keys(fields) as (keyof typeof fields)[];
    const results = names.map((n) => [n, check(n)] as const);
    const firstBad = results.find(([, ok]) => !ok);
    if (firstBad) { fields[firstBad[0]].focus(); return; }
    saveAccount({
      nome: fields.nome.value.trim(),
      email: fields.email.value.trim(),
      telefone: fields.telefone.value,
      criadaEm: new Date().toISOString(),
    });
    render(true, true);
    const title = page.querySelector<HTMLElement>('#conta-title')!;
    title.tabIndex = -1;
    title.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  });

  page.querySelector('#conta-sair')!.addEventListener('click', () => {
    clearAccount();
    form.reset();
    render(true);
  });

  render(false);
}

document.addEventListener('astro:page-load', init);
