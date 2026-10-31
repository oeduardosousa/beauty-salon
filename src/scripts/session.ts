// Demo state lives in sessionStorage only: it survives a reload but disappears with the tab.
// No account, booking or role ever leaves the browser.
import type { Status } from '../data/status';
export type { Status };

export type Role = 'cliente' | 'profissional';

export interface Account {
  nome: string;
  email: string;
  telefone: string;
  criadaEm: string;
}

export interface ProState {
  status: Record<string, Status>;
  days: Record<string, boolean>;
}

export interface Reserva {
  id: string;
  servico: string;
  servicoId: string;
  preco: string;
  profissional: string;
  /** Local date as YYYY-MM-DD and time as HH:MM. */
  data: string;
  hora: string;
  nome: string;
  email: string;
  telefone: string;
  obs: string;
  criadaEm: string;
}

// Every sessionStorage key the site uses. Base.astro's inline script reads ROLE and INTRO by their literal
// strings (it runs before any module loads), so keep those two in sync with it.
export const STORAGE_KEYS = {
  role: 'cintila-role',
  intro: 'cintila-intro',
  account: 'cintila-conta',
  bookings: 'cintila-reservas',
  pro: 'cintila-pro',
} as const;
const { role: ROLE, intro: INTRO, account: ACCOUNT, bookings: BOOKINGS, pro: PRO } = STORAGE_KEYS;

function read<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
function write(key: string, value: unknown) {
  try { sessionStorage.setItem(key, JSON.stringify(value)); } catch { /* storage blocked: the demo just won't persist */ }
}
function remove(key: string) {
  try { sessionStorage.removeItem(key); } catch { /* ignore */ }
}

export const getRole = () => read<Role>(ROLE);
export const setRole = (role: Role) => write(ROLE, role);

/** The loader plays once per tab. Storage blocked counts as seen, so it never loops. */
export const introSeen = () => {
  try { return !!sessionStorage.getItem(INTRO); } catch { return true; }
};
export const markIntroSeen = () => write(INTRO, '1');

export const getAccount = () => read<Account>(ACCOUNT);
export const saveAccount = (a: Account) => write(ACCOUNT, a);
export const clearAccount = () => remove(ACCOUNT);

export const getBookings = () => read<Reserva[]>(BOOKINGS) ?? [];
export const addBooking = (r: Reserva) => write(BOOKINGS, [...getBookings(), r]);

export const getPro = () => read<ProState>(PRO) ?? { status: {}, days: {} };
export const savePro = (s: ProState) => write(PRO, s);
export const clearPro = () => remove(PRO);

/** Header link text: "Olá, Ana" once a demo account exists, "Minha conta" before. */
export function syncAccountLabels() {
  const first = getAccount()?.nome.split(' ')[0];
  document.querySelectorAll<HTMLElement>('[data-account-label]').forEach((el) => {
    el.textContent = first ? `Olá, ${first}` : 'Minha conta';
  });
}
