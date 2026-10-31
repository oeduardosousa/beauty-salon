// Appointment statuses for the professional view, shared by the page (server) and its script (client).
export type Status = 'pendente' | 'confirmado' | 'concluido';

export const STATUS_LABEL: Record<Status, string> = { pendente: 'Pendente', confirmado: 'Confirmado', concluido: 'Concluído' };
export const STATUS_ACTION: Record<Status, string> = { pendente: 'Confirmar', confirmado: 'Concluir', concluido: 'Reabrir' };
export const STATUS_NEXT: Record<Status, Status> = { pendente: 'confirmado', confirmado: 'concluido', concluido: 'pendente' };
