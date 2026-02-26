import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateTime(date: Date | string): string {
  return `${formatDate(date)} à ${formatTime(date)}`;
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 1000);
}

export const timeWindowLabels: Record<string, string> = {
  MORNING: "Matin (9h - 12h)",
  AFTERNOON: "Après-midi (14h - 17h)",
  EVENING: "Soir (17h - 19h)",
};

export const serviceTypeLabels: Record<string, string> = {
  EYE_EXAM: "Examen de vue",
  CONTACT_LENS_FITTING: "Essayage lentilles",
  LENS_CUSTOMIZATION: "Personnalisation de verres",
  FRAME_FITTING: "Essayage de montures",
  REPAIR_ADJUSTMENT: "Réparation & ajustement",
};

export const statusLabels: Record<string, string> = {
  PENDING: "En attente",
  CONFIRMED: "Confirmé",
  DECLINED: "Refusé",
};
