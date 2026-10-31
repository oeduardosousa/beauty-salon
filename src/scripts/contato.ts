// Footer contact form: validated, then acknowledged on screen. Nothing is sent or stored.
import { EMAIL } from './shared';

function init() {
  const root = document.querySelector<HTMLElement>('[data-contact]');
  if (!root) return;
  const form = root.querySelector<HTMLFormElement>('form')!;
  const status = root.querySelector<HTMLElement>('[data-contact-status]')!;
  const fields = {
    nome: form.elements.namedItem('nome') as HTMLInputElement,
    email: form.elements.namedItem('email') as HTMLInputElement,
    msg: form.elements.namedItem('msg') as HTMLTextAreaElement,
  };
  const rules: Record<keyof typeof fields, (v: string) => string> = {
    nome: (v) => (v.trim().length < 2 ? 'Informe o seu nome.' : ''),
    email: (v) => (EMAIL.test(v.trim()) ? '' : 'Informe um e-mail válido, como nome@exemplo.com.'),
    msg: (v) => (v.trim().length < 10 ? 'Escreva uma mensagem com pelo menos 10 caracteres.' : ''),
  };
  const names = Object.keys(fields) as (keyof typeof fields)[];

  function check(name: keyof typeof fields) {
    const el = fields[name];
    const message = rules[name](el.value);
    root!.querySelector<HTMLElement>(`#${el.getAttribute('aria-describedby')}`)!.textContent = message;
    el.setAttribute('aria-invalid', String(!!message));
    return !message;
  }

  for (const name of names) {
    const el = fields[name];
    el.addEventListener('blur', () => { if (el.value) check(name); });
    el.addEventListener('input', () => {
      status.textContent = '';
      if (el.getAttribute('aria-invalid') === 'true') check(name);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const bad = names.filter((n) => !check(n));
    if (bad.length) {
      status.textContent = '';
      fields[bad[0]].focus();
      return;
    }
    form.reset();
    names.forEach((n) => fields[n].removeAttribute('aria-invalid'));
    status.textContent = 'Mensagem simulada: nada foi enviado. Em um salão real, a equipe responderia por e-mail.';
  });
}

document.addEventListener('astro:page-load', init);
