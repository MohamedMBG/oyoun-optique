"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("@/components/3d/hero-scene").then(mod => mod.HeroScene), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-64 h-64">
        <div className="absolute inset-0 bg-gold/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute inset-8 bg-gold/30 rounded-full blur-2xl animate-pulse delay-150" />
      </div>
    </div>
  )
});

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal to-charcoal-light" />

      {/* 3D Scene Container */}
      <div className="absolute inset-0 lg:left-1/2 lg:w-1/2 opacity-40 lg:opacity-100">
        <HeroScene />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold-subtle"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-sm text-gold font-medium">
                Ouvert aujourd&apos;hui jusqu&apos;à 19h
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-heading text-5xl sm:text-6xl lg:text-7xl text-foreground leading-[1.1]"
            >
              Précision Visuelle.
              <br />
              <span className="text-gold-gradient">Montures d&apos;Exception.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-gray-soft max-w-lg leading-relaxed"
            >
              Découvrez l&apos;art de la vision chez O&apos;YOUN Optique. Votre regard
              mérite l&apos;excellence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="group">
                <Link href="/reservation">
                  Prendre Rendez-vous
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/frames">Découvrir les Montures</Link>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex gap-8 pt-8 border-t border-border"
            >
              <div>
                <div className="font-heading text-3xl text-gold">15+</div>
                <div className="text-sm text-gray-muted">Années d&apos;expérience</div>
              </div>
              <div>
                <div className="font-heading text-3xl text-gold">5000+</div>
                <div className="text-sm text-gray-muted">Clients satisfaits</div>
              </div>
              <div>
                <div className="font-heading text-3xl text-gold">50+</div>
                <div className="text-sm text-gray-muted">Marques partenaires</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Empty space for 3D scene visibility */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-gray-muted"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
