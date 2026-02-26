import { z } from "zod";

// Reservation request validation schema
export const reservationSchema = z.object({
  serviceType: z.enum([
    "EYE_EXAM",
    "CONTACT_LENS_FITTING",
    "LENS_CUSTOMIZATION",
    "FRAME_FITTING",
    "REPAIR_ADJUSTMENT",
  ]),
  preferredDate: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime()) && date >= new Date(new Date().setHours(0, 0, 0, 0));
  }, "La date doit être valide et dans le futur"),
  preferredTimeWindow: z.enum(["MORNING", "AFTERNOON", "EVENING"]),
  fullName: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne doit pas dépasser 100 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  phone: z
    .string()
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/,
      "Veuillez entrer un numéro de téléphone valide"
    ),
  notes: z
    .string()
    .max(500, "Les notes ne doivent pas dépasser 500 caractères")
    .optional()
    .or(z.literal("")),
  honeypot: z.string().max(0).optional(), // Spam protection field
});

export type ReservationFormData = z.infer<typeof reservationSchema>;

// Contact form validation schema
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  subject: z.string().min(2).max(200),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(2000),
  honeypot: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// Admin login validation schema
export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Admin confirm reservation schema
export const confirmReservationSchema = z.object({
  confirmedDateTime: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime());
  }, "Date et heure invalides"),
  message: z.string().max(500).optional().or(z.literal("")),
});

export type ConfirmReservationData = z.infer<typeof confirmReservationSchema>;

// Admin decline reservation schema
export const declineReservationSchema = z.object({
  message: z.string().max(500).optional().or(z.literal("")),
});

export type DeclineReservationData = z.infer<typeof declineReservationSchema>;
