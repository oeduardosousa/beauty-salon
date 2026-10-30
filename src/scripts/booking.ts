// Booking wizard: four validated steps -> simulated install -> confirmation.
// Bookings go to sessionStorage only (see session.ts). No backend, nothing leaves the browser.
import { addBooking, getAccount, type Reserva } from './session';
import { OPEN_WEEKDAYS, SLOTS, services, team } from '../data/salon';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DAYS_AHEAD = 14;
// Blocks filled on the ten-block bar after each step.
const BLOCKS = [3, 5, 8, 10];
const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

const pad = (n: number) => String(n).padStart(2, '0');
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromIso = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const longDate = (s: string) => fromIso(s).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });

function formatPhone(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  const cut = d.length === 11 ? 7 : 6;
  return `(${d.slice(0, 2)}) ${d.slice(2, cut)}-${d.slice(cut)}`;
}

/** A stable pseudo-random "busy" flag so the same slot is always taken or free for the same day. */
function isBusy(date: string, stylist: string, slot: string) {
  let h = 2166136261;
  for (const ch of `${date}|${stylist}|${slot}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return (h >>> 0) % 100 < 28;
}

const endTime = (slot: string, minutes: number) => {
  const [h, m] = slot.split(':').map(Number);
  const t = h * 60 + m + minutes;
  return `${pad(Math.floor(t / 60))}:${pad(t % 60)}`;
};

let controller: AbortController | null = null;

function init() {
  controller?.abort();
  const root = document.querySelector<HTMLElement>('[data-booking]');
  if (!root) return;
  controller = new AbortController();
  const { signal } = controller;
  const q = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel)!;

  const form = q<HTMLFormElement>('[data-form]');
  const steps = [...root.querySelectorAll<HTMLFieldSetElement>('[data-step]')];
  const backBtn = q<HTMLButtonElement>('[data-back]');
  const nextBtn = q<HTMLButtonElement>('[data-next]');
  const reason = q('[data-reason]');
  const stepCount = q('[data-step-count]');
  const blocks = q('[data-blocks]');
  const daysEl = q('[data-days]');
  const slotsEl = q('[data-slots]');
  const slotsNote = q('[data-slots-note]');
  const main = q('.dialog-main');
  const buttons = q('[data-buttons]');
  const doneButtons = q('[data-done-buttons]');
  const installing = q('[data-installing]');
  const done = q('[data-done]');

  let step = 1;
  let date = '';
  let slot = '';
  let last: Reserva | null = null;

  const radio = (name: string) => form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.value ?? '';
  const service = () => services.find((s) => s.id === radio('servico'));
  const stylistId = () => radio('profissional');
  const stylist = () => team.find((p) => p.id === stylistId());
  const fields = {
    nome: form.elements.namedItem('nome') as HTMLInputElement,
    email: form.elements.namedItem('email') as HTMLInputElement,
    telefone: form.elements.namedItem('telefone') as HTMLInputElement,
    ok: form.elements.namedItem('ok') as HTMLInputElement,
  };
  const rules: Record<keyof typeof fields, (el: HTMLInputElement) => string> = {
    nome: (el) => (el.value.trim().length < 2 ? 'Informe o seu nome.' : ''),
    email: (el) => (EMAIL.test(el.value.trim()) ? '' : 'Informe um e-mail válido, como nome@exemplo.com.'),
    telefone: (el) => (/^\(\d{2}\) \d{4,5}-\d{4}$/.test(el.value) ? '' : 'Informe um celular válido, com DDD.'),
    ok: (el) => (el.checked ? '' : 'Marque a caixa para concluir.'),
  };
  const errorEl = (el: HTMLInputElement) => root.querySelector<HTMLElement>(`#${el.getAttribute('aria-describedby')}`)!;
  function check(name: keyof typeof fields, show = true) {
    const el = fields[name];
    const message = rules[name](el);
    if (show) {
      errorEl(el).textContent = message;
      el.setAttribute('aria-invalid', String(!!message));
    }
    return !message;
  }

  /* ---------- Step 3: days and slots ---------- */
  function openDays() {
    const allowed = stylist()?.weekdays ?? OPEN_WEEKDAYS;
    const out: string[] = [];
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    for (let i = 1; out.length < 10 && i <= DAYS_AHEAD * 2; i++) {
      const next = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i);
      if (allowed.includes(next.getDay())) out.push(iso(next));
    }
    return out;
  }

  function chip(name: string, value: string, label: string, sub: string, spoken: string, disabled = false) {
    const l = document.createElement('label');
    l.className = 'chip';
    const i = document.createElement('input');
    i.type = 'radio';
    i.name = name;
    i.value = value;
    i.disabled = disabled;
    i.setAttribute('aria-label', spoken);
    const a = document.createElement('span');
    a.className = 'chip-main';
    a.textContent = label;
    const b = document.createElement('span');
    b.className = 'chip-sub';
    b.textContent = sub;
    l.append(i, a, b);
    return l;
  }

  function renderDays() {
    const days = openDays();
    if (!days.includes(date)) { date = ''; slot = ''; }
    daysEl.replaceChildren(
      ...days.map((d) => {
        const dt = fromIso(d);
        const c = chip('dia', d, `${pad(dt.getDate())}`, dt.toLocaleDateString('pt-BR', { weekday: 'short', month: 'short' }).replace(/\./g, ''), longDate(d));
        (c.firstElementChild as HTMLInputElement).checked = d === date;
        return c;
      }),
    );
    renderSlots();
  }

  function renderSlots() {
    const svc = service();
    if (!date || !svc) {
      slotsEl.replaceChildren();
      slotsNote.textContent = 'Escolha um dia para ver os horários.';
      return;
    }
    const who = stylistId() || 'any';
    const list = SLOTS.filter((s) => endTime(s, svc.minutes) <= '19:00');
    if (slot && !list.includes(slot)) slot = '';
    slotsEl.replaceChildren(
      ...list.map((s) => {
        const busy = isBusy(date, who, s);
        const c = chip('hora', s, s, busy ? 'ocupado' : 'livre', `${s}, ${busy ? 'ocupado' : 'livre'}`, busy);
        const input = c.firstElementChild as HTMLInputElement;
        input.checked = s === slot && !busy;
        if (busy && s === slot) slot = '';
        return c;
      }),
    );
    const free = slotsEl.querySelectorAll('input:not(:disabled)').length;
    slotsNote.textContent = free
      ? `${longDate(date)}. Duração: ${svc.time}.`
      : 'Sem horários livres neste dia. Escolha outro dia.';
  }

  daysEl.addEventListener('change', (e) => {
    date = (e.target as HTMLInputElement).value;
    slot = '';
    renderSlots();
    refresh();
  }, { signal });
  slotsEl.addEventListener('change', (e) => {
    slot = (e.target as HTMLInputElement).value;
    refresh();
  }, { signal });

  /* ---------- Validity and chrome ---------- */
  function problem(n: number): string {
    if (n === 1 && !service()) return 'Escolha um serviço para continuar';
    if (n === 2 && !stylistId()) return 'Escolha uma profissional para continuar';
    if (n === 3 && !date) return 'Escolha um dia para continuar';
    if (n === 3 && !slot) return 'Escolha um horário para continuar';
    if (n === 4) {
      const missing = (Object.keys(fields) as (keyof typeof fields)[]).filter((k) => !check(k, false));
      if (missing.length) return 'Preencha nome, e-mail e celular e aceite o aviso para concluir';
    }
    return '';
  }

  function refresh() {
    const p = problem(step);
    nextBtn.disabled = !!p;
    nextBtn.textContent = step === 4 ? 'Concluir' : 'Próximo';
    backBtn.disabled = step === 1;
    reason.textContent = p;
    stepCount.textContent = `Passo ${step} de 4`;
    blocks.setAttribute('aria-label', `Progresso: passo ${step} de 4`);
    [...blocks.children].forEach((b, i) => b.classList.toggle('is-on', i < BLOCKS[step - 1]));
  }

  function goTo(n: number, viaKeyboard: boolean) {
    const dir = n > step ? 'fwd' : 'back';
    step = n;
    steps.forEach((s, i) => {
      const on = i + 1 === n;
      s.hidden = !on;
      s.classList.remove('is-fwd', 'is-back');
      if (on && !viaKeyboard && !reducedMotion()) {
        void s.offsetWidth; // restart the CSS animation
        s.classList.add(dir === 'fwd' ? 'is-fwd' : 'is-back');
      }
    });
    if (n === 3) renderDays();
    if (n === 4) prefill();
    refresh();
    steps[n - 1].querySelector<HTMLElement>('.step-title')!.focus({ preventScroll: true });
  }

  function prefill() {
    const account = getAccount();
    const note = q('[data-prefill]');
    if (!account) { note.hidden = true; return; }
    if (!fields.nome.value) fields.nome.value = account.nome;
    if (!fields.email.value) fields.email.value = account.email;
    if (!fields.telefone.value) fields.telefone.value = account.telefone;
    note.hidden = false;
    note.textContent = 'Preenchemos com a sua conta de demonstração. Você pode editar.';
  }

  form.addEventListener('change', (e) => {
    const name = (e.target as HTMLInputElement).name;
    if (name === 'servico') { renderSlots(); }
    if (name === 'profissional') { renderDays(); }
    refresh();
  }, { signal });
  fields.telefone.addEventListener('input', () => { fields.telefone.value = formatPhone(fields.telefone.value); }, { signal });
  (Object.keys(fields) as (keyof typeof fields)[]).forEach((name) => {
    const el = fields[name];
    el.addEventListener('blur', () => { if (el.value || name === 'ok') check(name); }, { signal });
    el.addEventListener('input', () => {
      if (el.getAttribute('aria-invalid') === 'true') check(name);
      refresh();
    }, { signal });
    el.addEventListener('change', () => { if (name === 'ok') check(name); refresh(); }, { signal });
  });
  form.addEventListener('submit', (e) => e.preventDefault(), { signal });

  backBtn.addEventListener('click', (e) => { if (step > 1) goTo(step - 1, e.detail === 0); }, { signal });
  nextBtn.addEventListener('click', (e) => {
    if (problem(step)) return;
    if (step < 4) goTo(step + 1, e.detail === 0);
    else finish();
  }, { signal });

  /* ---------- Finish: install, store, confirm ---------- */
  function finish() {
    const svc = service()!;
    const who = stylist();
    const booking: Reserva = {
      id: `R${Date.now().toString(36).toUpperCase()}`,
      servico: svc.name,
      servicoId: svc.id,
      preco: svc.price,
      profissional: who?.name ?? 'Sem preferência',
      data: date,
      hora: slot,
      nome: fields.nome.value.trim(),
      email: fields.email.value.trim(),
      telefone: fields.telefone.value,
      obs: (form.elements.namedItem('obs') as HTMLTextAreaElement).value.trim(),
      criadaEm: new Date().toISOString(),
    };
    addBooking(booking);
    last = booking;

    form.hidden = true;
    buttons.hidden = true;
    reason.textContent = '';
    stepCount.textContent = 'Instalando…';
    installing.hidden = false;
    const run = [...installing.querySelectorAll('.blocks i')];
    run.forEach((b) => b.classList.remove('is-on'));
    const total = reducedMotion() ? 0 : 600;
    const each = total / run.length;
    run.forEach((b, i) => setTimeout(() => { if (!signal.aborted) b.classList.add('is-on'); }, each * (i + 1)));
    setTimeout(() => { if (!signal.aborted) showDone(booking); }, total + 120);
  }

  function showDone(b: Reserva) {
    installing.hidden = true;
    done.hidden = false;
    doneButtons.hidden = false;
    stepCount.textContent = 'Concluído';
    [...blocks.children].forEach((x) => x.classList.add('is-on'));
    blocks.setAttribute('aria-label', 'Progresso: concluído');
    const svc = services.find((s) => s.id === b.servicoId)!;
    const rows: [string, string][] = [
      ['Serviço', `${b.servico} (${svc.time})`],
      ['Profissional', b.profissional],
      ['Quando', `${longDate(b.data)}, às ${b.hora}`],
      ['Valor', `${b.preco} (preço de exemplo)`],
      ['Código', b.id],
    ];
    q('[data-summary]').replaceChildren(
      ...rows.map(([k, v]) => {
        const d = document.createElement('div');
        const dt = document.createElement('dt');
        dt.textContent = k;
        const dd = document.createElement('dd');
        dd.textContent = v;
        d.append(dt, dd);
        return d;
      }),
    );
    q('[data-mail]').textContent = [
      `Para: ${b.email}`,
      'De: reservas@cintila.exemplo (simulação)',
      'Assunto: Sua reserva no Cintila Studio',
      '',
      `Olá, ${b.nome.split(' ')[0]}!`,
      `Recebemos o seu pedido de ${b.servico} com ${b.profissional}`,
      `para ${longDate(b.data)}, às ${b.hora}.`,
      '',
      'Este é um e-mail de demonstração. O Cintila Studio é um salão fictício.',
    ].join('\n');
    q('[data-done-title]').focus({ preventScroll: true });
    reason.textContent = 'Reserva simulada concluída';
  }

  function icsFile(b: Reserva) {
    const svc = services.find((s) => s.id === b.servicoId)!;
    const stamp = (day: string, time: string) => `${day.replace(/-/g, '')}T${time.replace(':', '')}00`;
    return [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Cintila Studio//Demo//PT',
      'BEGIN:VEVENT',
      `UID:${b.id}@cintila.exemplo`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]|\.\d{3}/g, '')}`,
      `DTSTART:${stamp(b.data, b.hora)}`,
      `DTEND:${stamp(b.data, endTime(b.hora, svc.minutes))}`,
      `SUMMARY:${b.servico} · Cintila Studio (simulação)`,
      'LOCATION:Rua Exemplo\\, 000 (endereço fictício)',
      'DESCRIPTION:Reserva de demonstração. Nenhum atendimento real foi marcado.',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
  }

  q('[data-ics]').addEventListener('click', () => {
    if (!last) return;
    const url = URL.createObjectURL(new Blob([icsFile(last)], { type: 'text/calendar' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cintila-reserva.ics';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, { signal });

  q('[data-again]').addEventListener('click', () => {
    form.reset();
    date = '';
    slot = '';
    last = null;
    Object.values(fields).forEach((el) => { el.removeAttribute('aria-invalid'); errorEl(el).textContent = ''; });
    done.hidden = true;
    doneButtons.hidden = true;
    form.hidden = false;
    buttons.hidden = false;
    goTo(1, true);
    main.scrollIntoView({ block: 'nearest' });
  }, { signal });

  goTo(1, true);
  // Keep the first load from stealing focus: goTo focuses the heading, so undo that on init.
  (document.activeElement as HTMLElement | null)?.blur();
}

document.addEventListener('astro:page-load', init);
