"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Eye, Contact, Sparkles, Wrench, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "eye-exam",
    title: "Examen de Vue",
    subtitle: "Un diagnostic complet et précis",
    description:
      "Nos optométristes expérimentés réalisent des examens de vue complets utilisant les technologies les plus avancées. Nous évaluons non seulement votre acuité visuelle, mais également la santé globale de vos yeux.",
    features: [
      "Autoréfractométrie computerisée",
      "Évaluation de l'acuité visuelle",
      "Examen de la santé oculaire",
      "Dépistage des pathologies",
      "Conseil personnalisé",
    ],
    duration: "30-45 minutes",
    price: "À partir de 45€",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    icon: Eye,
  },
  {
    id: "contact-lenses",
    title: "Lentilles de Contact",
    subtitle: "Essayage et suivi personnalisé",
    description:
      "Que vous soyez déjà porteur de lentilles ou souhaitiez les essayer pour la première fois, notre équipe vous accompagne dans le choix des lentilles les plus adaptées à votre mode de vie et votre correction.",
    features: [
      "Évaluation de la cornée",
      "Essayage de différents types",
      "Apprentissage de la pose",
      "Conseils d'entretien",
      "Suivi régulier",
    ],
    duration: "45-60 minutes",
    price: "À partir de 60€",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&q=80",
    icon: Contact,
  },
  {
    id: "lens-customization",
    title: "Personnalisation de Verres",
    subtitle: "Des verres adaptés à votre style de vie",
    description:
      "Nous proposons une large gamme de traitements et options pour personnaliser vos verres selon vos besoins spécifiques : travail sur écran, conduite, sport, ou simplement pour un confort optimal au quotidien.",
    features: [
      "Traitement anti-reflet",
      "Filtre lumière bleue",
      "Verres photochromiques",
      "Verres polarisants",
      "Verres progressifs haut de gamme",
    ],
    duration: "Sur devis",
    price: "À partir de 150€",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    icon: Sparkles,
  },
  {
    id: "repairs",
    title: "Réparations & Ajustements",
    subtitle: "Préservez le confort de vos lunettes",
    description:
      "Notre service après-vente assure l'entretien et la réparation de vos lunettes pour préserver leur confort et leur longévité. De l'ajustement simple à la réparation complexe, nous nous occupons de tout.",
    features: [
      "Ajustement des branches",
      "Remplacement des plaquettes",
      "Soudure de monture",
      "Remplacement de verres",
      "Nettoyage professionnel",
    ],
    duration: "15-30 minutes",
    price: "À partir de 15€",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&q=80",
    icon: Wrench,
  },
];

export default function ServicesPage() {
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
            Nos Prestations
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl text-foreground mb-4">
            Nos Services
          </h1>
          <p className="text-gray-soft max-w-2xl mx-auto">
            Des prestations complètes pour prendre soin de votre vision et de
            vos lunettes.
          </p>
        </motion.div>

        {/* Services List */}
        <div className="space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <div className="w-14 h-14 rounded-xl bg-gold flex items-center justify-center">
                      <service.icon className="w-7 h-7 text-charcoal" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <span className="text-gold text-sm uppercase tracking-wider mb-2 block">
                  {service.subtitle}
                </span>
                <h2 className="font-heading text-3xl text-foreground mb-4">
                  {service.title}
                </h2>
                <p className="text-gray-soft mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span className="text-gray-soft text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-border">
                  <div>
                    <span className="text-gray-muted text-sm block">
                      Durée
                    </span>
                    <span className="text-foreground">{service.duration}</span>
                  </div>
                  <div>
                    <span className="text-gray-muted text-sm block">
                      Tarif
                    </span>
                    <span className="text-gold font-medium">
                      {service.price}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <Button asChild>
                  <Link href="/reservation">
                    Prendre Rendez-vous
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <div className="glass-card p-12 max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl text-foreground mb-4">
              Besoin de conseils ?
            </h2>
            <p className="text-gray-soft mb-8">
              Notre équipe est à votre disposition pour répondre à toutes vos
              questions et vous guider dans le choix de vos lunettes ou
              lentilles.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="secondary">
                <Link href="/contact">Nous Contacter</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="tel:+33142600000">+33 1 42 60 00 00</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
