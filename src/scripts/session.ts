// Demo state lives in sessionStorage only: it survives a reload but disappears with the tab.
// No account, booking or role ever leaves the browser.
export type Role = 'cliente' | 'profissional';

export interface Account {
  nome: string;
  email: string;
  telefone: string;
  criadaEm: string;
}

export interface ProState {
  status: Record<string, string>;
  days: Record<string, boolean>;
}

const ROLE = 'cintila-role';
const ACCOUNT = 'cintila-conta';
const PRO = 'cintila-pro';

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

export const getAccount = () => read<Account>(ACCOUNT);
export const saveAccount = (a: Account) => write(ACCOUNT, a);
export const clearAccount = () => remove(ACCOUNT);

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
