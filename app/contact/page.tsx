"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const storeHours = [
  { day: "Lundi - Vendredi", hours: "10h00 - 19h00" },
  { day: "Samedi", hours: "10h00 - 18h00" },
  { day: "Dimanche", hours: "Fermé" },
];

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-widest mb-4 block">
            Contact
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl text-foreground mb-4">
            Restons en Contact
          </h1>
          <p className="text-gray-soft max-w-2xl mx-auto">
            Une question ? Un projet ? N&apos;hésitez pas à nous contacter, notre
            équipe sera ravie de vous répondre.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-8">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-subtle flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-foreground mb-2">
                    Adresse
                  </h3>
                  <p className="text-gray-soft">
                    15 Rue de la Paix
                    <br />
                    75002 Paris, France
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

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-subtle flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-foreground mb-2">
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
                  <h3 className="font-heading text-lg text-foreground mb-2">
                    Email
                  </h3>
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
                  <h3 className="font-heading text-lg text-foreground mb-2">
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
                  <p className="text-gray-muted text-sm mt-1">
                    Réponse rapide garantie
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold-subtle flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-heading text-lg text-foreground mb-2">
                    Horaires
                  </h3>
                  <div className="space-y-1">
                    {storeHours.map((item) => (
                      <div key={item.day} className="flex justify-between gap-8">
                        <span className="text-gray-soft">{item.day}</span>
                        <span
                          className={`${
                            item.hours === "Fermé"
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
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 rounded-2xl overflow-hidden border border-border h-64 bg-charcoal relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gold mx-auto mb-2" />
                  <p className="text-gray-soft text-sm">
                    15 Rue de la Paix, Paris
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-card p-8">
              <h2 className="font-heading text-2xl text-foreground mb-6">
                Envoyez-nous un message
              </h2>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-heading text-xl text-foreground mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-gray-soft">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field for spam protection */}
                  <div className="hidden">
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Votre nom"
                        required
                        minLength={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="votre@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Objet de votre message"
                      required
                      minLength={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Votre message..."
                      required
                      minLength={10}
                      rows={5}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Envoi en cours..."
                    ) : (
                      <>
                        Envoyer le message
                        <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-gray-muted text-xs text-center">
                    En envoyant ce formulaire, vous acceptez notre{" "}
                    <Link href="/privacy" className="text-gold hover:underline">
                      politique de confidentialité
                    </Link>
                    .
                  </p>
                </form>
              )}
            </div>

            {/* Quick CTA */}
            <div className="mt-6 glass-card p-6">
              <h3 className="font-heading text-lg text-foreground mb-4">
                Besoin d&apos;un rendez-vous ?
              </h3>
              <p className="text-gray-soft text-sm mb-4">
                Réservez directement en ligne pour un examen de vue, un essayage
                ou tout autre service.
              </p>
              <Button asChild variant="secondary" className="w-full">
                <Link href="/reservation">Prendre Rendez-vous</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
