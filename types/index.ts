import { ServiceType, TimeWindow, ReservationStatus } from "@prisma/client";

export interface Frame {
  id: string;
  name: string;
  brand: string;
  price: number;
  shape: string;
  material: string;
  gender: "MEN" | "WOMEN" | "UNISEX";
  image: string;
  colors: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
}

export interface StoreInfo {
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: {
    day: string;
    hours: string;
  }[];
}

export interface ReservationRequestData {
  id: string;
  status: ReservationStatus;
  serviceType: ServiceType;
  preferredDate: Date;
  preferredTimeWindow: TimeWindow;
  confirmedDateTime: Date | null;
  fullName: string;
  email: string;
  phone: string;
  notes: string | null;
  adminMessage: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLogData {
  id: string;
  action: string;
  entityType: string;
  entityId: string;
  userId: string;
  userName: string;
  previousValue: string | null;
  newValue: string | null;
  message: string | null;
  createdAt: Date;
}
