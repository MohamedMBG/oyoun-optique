"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Marie Dubois",
    role: "Cliente depuis 2019",
    content:
      "Une expérience exceptionnelle dès le premier rendez-vous. L'équipe a pris le temps de comprendre mes besoins et m'a guidée vers la monture parfaite. Je ne vais plus nulle part ailleurs !",
    rating: 5,
  },
  {
    id: 2,
    name: "Pierre Martin",
    role: "Client depuis 2021",
    content:
      "Service impeccable et professionnel. L'examen de vue était très complet et les conseils pour les verres progressifs m'ont été d'une grande aide. Je recommande vivement.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophie Laurent",
    role: "Cliente depuis 2020",
    content:
      "J'ai enfin trouvé des lunettes qui me vont vraiment ! La sélection de montures est incroyable et le service de personnalisation est top. Merci à toute l'équipe !",
    rating: 5,
  },
  {
    id: 4,
    name: "Jean-Pierre Bernard",
    role: "Client depuis 2018",
    content:
      "Des professionnels passionnés qui connaissent parfaitement leur métier. Le service après-vente est également excellent. Une adresse incontournable à Paris.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-widest mb-4 block">
            Témoignages
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl text-foreground mb-6">
            Ce Que Disent Nos Clients
          </h2>
        </motion.div>

        {/* Testimonials Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Quote Icon */}
            <Quote className="absolute -top-4 -left-4 w-12 h-12 text-gold/20" />

            {/* Testimonial Content */}
            <div className="glass-card p-8 md:p-12 min-h-[300px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  {/* Rating */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-gold text-gold"
                        />
                      )
                    )}
                  </div>

                  {/* Content */}
                  <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8 font-light">
                    &ldquo;{testimonials[currentIndex].content}&rdquo;
                  </p>

                  {/* Author */}
                  <div>
                    <div className="font-heading text-lg text-foreground">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-sm text-gray-muted">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-gold w-6"
                        : "bg-border hover:bg-gold/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
