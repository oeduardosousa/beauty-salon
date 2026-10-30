// Simulated professional dashboard: appointment statuses and weekly availability, kept in sessionStorage.
import { clearPro, getAccount, getPro, savePro } from './session';

const LABEL: Record<string, string> = { pendente: 'Pendente', confirmado: 'Confirmado', concluido: 'Concluído' };
const ACTION: Record<string, string> = { pendente: 'Confirmar', confirmado: 'Concluir', concluido: 'Reabrir' };
const NEXT: Record<string, string> = { pendente: 'confirmado', confirmado: 'concluido', concluido: 'pendente' };
const money = (n: number) => `R$ ${n.toLocaleString('pt-BR')}`;

function init() {
  const page = document.querySelector<HTMLElement>('[data-pro]');
  if (!page) return;
  const state = getPro();
  const rows = [...page.querySelectorAll<HTMLElement>('.appt')];
  const stat = (k: string) => page.querySelector<HTMLElement>(`[data-stat="${k}"]`)!;

  function setStat(el: HTMLElement, text: string) {
    if (el.textContent === text) return;
    el.textContent = text;
    el.classList.remove('is-bump');
    void el.offsetWidth;
    el.classList.add('is-bump');
  }

  function totals() {
    const done = rows.filter((r) => r.dataset.status !== 'pendente');
    setStat(stat('total'), String(rows.length));
    setStat(stat('confirmed'), String(done.length));
    setStat(stat('revenue'), money(done.reduce((sum, r) => sum + Number(r.dataset.price), 0)));
  }

  function paint(row: HTMLElement, status: string) {
    row.dataset.status = status;
    row.querySelector('[data-chip]')!.textContent = LABEL[status];
    row.querySelector('[data-act]')!.textContent = ACTION[status];
  }

  for (const row of rows) {
    paint(row, state.status[row.dataset.id!] ?? row.dataset.initial!);
    row.querySelector('[data-act]')!.addEventListener('click', () => {
      const next = NEXT[row.dataset.status!];
      paint(row, next);
      state.status[row.dataset.id!] = next;
      savePro(state);
      totals();
    });
  }
  totals();

  for (const sw of page.querySelectorAll<HTMLButtonElement>('[data-day]')) {
    const apply = (on: boolean) => {
      sw.setAttribute('aria-checked', String(on));
      sw.closest('.day')!.querySelector('[data-hours]')!.textContent = on ? '9h às 19h' : 'Folga';
    };
    apply(state.days[sw.dataset.day!] ?? sw.dataset.default === 'true');
    sw.addEventListener('click', () => {
      const on = sw.getAttribute('aria-checked') !== 'true';
      apply(on);
      state.days[sw.dataset.day!] = on;
      savePro(state);
    });
  }

  // A client who created a demo account in the other view shows up here.
  const account = getAccount();
  const demo = page.querySelector<HTMLElement>('#cliente-demo')!;
  if (account) {
    demo.hidden = false;
    demo.querySelector('[data-demo-name]')!.textContent = account.nome;
    demo.querySelector('[data-demo-initial]')!.textContent = account.nome.trim().charAt(0).toUpperCase();
  }

  page.querySelector('#pro-reset')!.addEventListener('click', () => {
    clearPro();
    state.status = {};
    state.days = {};
    for (const row of rows) paint(row, row.dataset.initial!);
    for (const sw of page.querySelectorAll<HTMLButtonElement>('[data-day]')) {
      const on = sw.dataset.default === 'true';
      sw.setAttribute('aria-checked', String(on));
      sw.closest('.day')!.querySelector('[data-hours]')!.textContent = on ? '9h às 19h' : 'Folga';
    }
    totals();
  });
}

document.addEventListener('astro:page-load', init);
