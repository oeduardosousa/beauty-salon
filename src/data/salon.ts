// Placeholder salon data shared by the home page and the booking wizard.
// Every name, price and schedule here is invented.
export interface Service { id: string; cat: string; name: string; time: string; minutes: number; price: string }
export interface Stylist { id: string; name: string; role: string; days: string; weekdays: number[]; variant: 'a' | 'b' | 'c'; speed: string }

export const services: Service[] = [
  { id: 'corte', cat: 'Corte', name: 'Corte Claquete', time: '45 min', minutes: 45, price: 'R$ 90' },
  { id: 'escova', cat: 'Corte', name: 'Take Um: corte e escova', time: '1h15', minutes: 75, price: 'R$ 140' },
  { id: 'luzes', cat: 'Cor', name: 'Luzes em Cena', time: '3h', minutes: 180, price: 'R$ 380' },
  { id: 'raiz', cat: 'Cor', name: 'Raiz Perfeita', time: '1h30', minutes: 90, price: 'R$ 160' },
  { id: 'hidratacao', cat: 'Tratamento', name: 'Hidratação Close-up', time: '50 min', minutes: 50, price: 'R$ 110' },
  { id: 'penteado', cat: 'Penteado', name: 'Penteado de Estreia', time: '1h', minutes: 60, price: 'R$ 120' },
];

// The salon opens Tuesday to Saturday, so each stylist's days are cut to that range.
export const team: Stylist[] = [
  { id: 'marina', name: 'Marina', role: 'Corte e coloração', days: 'Ter a sáb', weekdays: [2, 3, 4, 5, 6], variant: 'a', speed: '0.85' },
  { id: 'caio', name: 'Caio', role: 'Cortes curtos e texturas', days: 'Qua a sáb', weekdays: [3, 4, 5, 6], variant: 'c', speed: '1' },
  { id: 'livia', name: 'Lívia', role: 'Penteados e tratamentos', days: 'Ter a sex', weekdays: [2, 3, 4, 5], variant: 'b', speed: '1.15' },
];

/** Opening hours: Tuesday (2) to Saturday (6), 9h to 19h. */
export const OPEN_WEEKDAYS = [2, 3, 4, 5, 6];
export const SLOTS = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
