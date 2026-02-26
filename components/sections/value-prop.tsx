"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Eye, Glasses, Sparkles, HeartHandshake } from "lucide-react";

const values = [
  {
    icon: Eye,
    title: "Expertise Optométrique",
    description:
      "Des examens de vue complets réalisés par des professionnels qualifiés, utilisant les technologies les plus avancées.",
  },
  {
    icon: Glasses,
    title: "Montures Curatées",
    description:
      "Une sélection rigoureuse des plus belles marques internationales, choisies pour leur qualité et leur design.",
  },
  {
    icon: Sparkles,
    title: "Sur-Mesure",
    description:
      "Des verres personnalisés pour une vision parfaite, adaptés à votre style de vie et vos besoins spécifiques.",
  },
  {
    icon: HeartHandshake,
    title: "Service Attentif",
    description:
      "Un accompagnement personnalisé de la sélection de vos montures à l'ajustement final.",
  },
];

export function ValuePropSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-widest mb-4 block">
            Notre Engagement
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl text-foreground mb-6">
            L&apos;Excellence à Chaque Regard
          </h2>
          <p className="text-gray-soft text-lg">
            Chez O&apos;YOUN Optique, nous croyons que chaque client mérite une
            attention particulière et des solutions sur-mesure.
          </p>
        </motion.div>

        {/* Value Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl border border-border bg-charcoal-card backdrop-blur-sm transition-all duration-300 hover:border-gold/30 hover:bg-charcoal-light/80">
                <div className="w-14 h-14 rounded-xl bg-gold-subtle flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                  <value.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-heading text-xl text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-soft text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
