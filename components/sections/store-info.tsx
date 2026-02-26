"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const storeHours = [
  { day: "Lundi", hours: "10h00 - 19h00" },
  { day: "Mardi", hours: "10h00 - 19h00" },
  { day: "Mercredi", hours: "10h00 - 19h00" },
  { day: "Jeudi", hours: "10h00 - 19h00" },
  { day: "Vendredi", hours: "10h00 - 19h00" },
  { day: "Samedi", hours: "10h00 - 18h00" },
  { day: "Dimanche", hours: "Fermé" },
];

export function StoreInfoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-gold text-sm uppercase tracking-widest mb-4 block">
              Notre Boutique
            </span>
            <h2 className="font-heading text-4xl lg:text-5xl text-foreground mb-8">
              Venez Nous Rencontrer
            </h2>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-subtle flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Adresse</h3>
                  <p className="text-gray-soft">
                    15 Rue de la Paix
                    <br />
                    75002 Paris, France
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-subtle flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">
                    Téléphone
                  </h3>
                  <a
                    href="tel:+33142600000"
                    className="text-gray-soft hover:text-gold transition-colors"
                  >
                    +33 1 42 60 00 00
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-subtle flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">Email</h3>
                  <a
                    href="mailto:contact@oyoun-optique.fr"
                    className="text-gray-soft hover:text-gold transition-colors"
                  >
                    contact@oyoun-optique.fr
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">
                    WhatsApp
                  </h3>
                  <a
                    href="https://wa.me/33612345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-soft hover:text-green-500 transition-colors"
                  >
                    +33 6 12 34 56 78
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Button asChild>
                <Link href="/reservation">
                  Prendre Rendez-vous
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/contact">Nous Contacter</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Hours */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gold-subtle flex items-center justify-center">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-heading text-2xl text-foreground">
                  Horaires d&apos;Ouverture
                </h3>
              </div>

              <div className="space-y-3">
                {storeHours.map((item, index) => (
                  <div
                    key={item.day}
                    className={`flex justify-between items-center py-3 ${
                      index !== storeHours.length - 1
                        ? "border-b border-border"
                        : ""
                    }`}
                  >
                    <span
                      className={`${
                        item.day === "Dimanche"
                          ? "text-gray-muted"
                          : "text-foreground"
                      }`}
                    >
                      {item.day}
                    </span>
                    <span
                      className={`font-medium ${
                        item.day === "Dimanche"
                          ? "text-gray-muted"
                          : "text-gold"
                      }`}
                    >
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-border h-64 bg-charcoal relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-gray-soft text-sm">
                    15 Rue de la Paix, Paris
                  </p>
                  <a
                    href="https://maps.google.com/?q=15+Rue+de+la+Paix+75002+Paris"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold text-sm hover:underline mt-2 inline-block"
                  >
                    Voir sur Google Maps
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
