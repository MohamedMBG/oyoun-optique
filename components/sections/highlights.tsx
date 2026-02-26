"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const highlights = [
  {
    title: "Examen de Vue",
    description:
      "Un diagnostic complet de votre vision par nos optométristes expérimentés, avec équipement de dernière génération.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    href: "/services",
  },
  {
    title: "Personnalisation de Verres",
    description:
      "Anti-reflet, lumière bleue, transitions - adaptez vos verres à votre style de vie et vos besoins visuels.",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    href: "/services",
  },
  {
    title: "Collection de Montures",
    description:
      "Découvrez notre sélection de montures de luxe des plus grandes maisons internationales.",
    image:
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80",
    href: "/frames",
  },
  {
    title: "Service Après-Vente",
    description:
      "Entretien, réparations et ajustements pour préserver le confort et la longévité de vos lunettes.",
    image:
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=800&q=80",
    href: "/services",
  },
];

export function HighlightsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
        >
          <div>
            <span className="text-gold text-sm uppercase tracking-widest mb-4 block">
              Nos Services
            </span>
            <h2 className="font-heading text-4xl lg:text-5xl text-foreground">
              Ce Que Nous Offrons
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors group"
          >
            <span>Voir tous les services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={highlight.href} className="group block">
                <div className="relative h-80 rounded-2xl overflow-hidden">
                  {/* Image */}
                  <Image
                    src={highlight.image}
                    alt={highlight.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="font-heading text-2xl text-foreground mb-2 group-hover:text-gold transition-colors">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-soft text-sm line-clamp-2 mb-4">
                      {highlight.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-gold text-sm font-medium opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      En savoir plus
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
