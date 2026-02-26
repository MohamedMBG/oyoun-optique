"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Mail, Phone, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReservationSuccessPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle className="w-12 h-12 text-green-500" />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-heading text-4xl text-foreground mb-4"
          >
            Demande Envoyée !
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-soft text-lg mb-8"
          >
            Nous avons bien reçu votre demande de rendez-vous. Notre équipe
            l&apos;examine et vous contactera dans les plus brefs délais pour
            confirmer votre créneau.
          </motion.p>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-8 mb-8 text-left"
          >
            <h2 className="font-heading text-xl text-foreground mb-6">
              Que se passe-t-il ensuite ?
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-subtle flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">
                    Email de confirmation
                  </h3>
                  <p className="text-gray-soft text-sm">
                    Vous allez recevoir un email récapitulatif de votre demande
                    dans quelques instants.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-subtle flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">
                    Validation du rendez-vous
                  </h3>
                  <p className="text-gray-soft text-sm">
                    Notre équipe vous contactera sous 24h pour confirmer la date
                    et l&apos;heure de votre rendez-vous.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <p className="text-gray-muted text-sm mb-4">
              Une question ? Contactez-nous :
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+33142600000"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
              >
                <Phone className="w-4 h-4" />
                +33 1 42 60 00 00
              </a>
              <span className="text-gray-muted">|</span>
              <a
                href="mailto:contact@oyoun-optique.fr"
                className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
              >
                <Mail className="w-4 h-4" />
                contact@oyoun-optique.fr
              </a>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button asChild>
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Retour à l&apos;accueil
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/frames">
                Découvrir nos montures
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
