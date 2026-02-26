"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Users, Heart, Target } from "lucide-react";

const stats = [
  { value: "15+", label: "Années d'expérience" },
  { value: "5000+", label: "Clients satisfaits" },
  { value: "50+", label: "Marques partenaires" },
  { value: "4.9", label: "Note moyenne" },
];

const values = [
  {
    icon: Heart,
    title: "Passion",
    description:
      "Notre amour pour l'optique et le design guide chacune de nos décisions.",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "Nous ne transigeons jamais sur la qualité des produits et services que nous offrons.",
  },
  {
    icon: Users,
    title: "Proximité",
    description:
      "Chaque client est unique et mérite une attention personnalisée.",
  },
  {
    icon: Award,
    title: "Innovation",
    description:
      "Nous restons à la pointe des dernières technologies et tendances.",
  },
];

const team = [
  {
    name: "Thomas O'Young",
    role: "Fondateur & Opticien",
    bio: "Plus de 20 ans d'expérience dans l'optique de luxe. Passionné par le design et l'innovation.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    name: "Marie Lefebvre",
    role: "Optométriste",
    bio: "Spécialisée en contactologie et vision de l'enfant. À votre écoute pour tous vos besoins visuels.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "Sophie Bernard",
    role: "Conseillère Style",
    bio: "Experte en tendances et morphologie. Elle saura trouver la monture parfaite pour votre visage.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
  },
  {
    name: "Pierre Martin",
    role: "Technicien Opticien",
    bio: "Maître dans l'art de l'ajustement et de la réparation. Vos lunettes entre de bonnes mains.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-gold text-sm uppercase tracking-widest mb-4 block">
            Notre Histoire
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl text-foreground mb-6">
            O&apos;YOUN Optique
          </h1>
          <p className="text-gray-soft max-w-3xl mx-auto text-lg leading-relaxed">
            Depuis 2010, nous mettons notre expertise au service de votre vision.
            Notre mission : vous offrir une expérience optique d&apos;exception,
            alliant précision technique et esthétique raffinée.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-24"
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
              alt="Notre boutique"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-heading text-3xl text-foreground mb-6">
              Une Histoire de Passion
            </h2>
            <div className="space-y-4 text-gray-soft leading-relaxed">
              <p>
                Fondée en 2010 par Thomas O&apos;Young, O&apos;YOUN Optique est née d&apos;une
                vision simple : transformer l&apos;expérience d&apos;achat de lunettes en
                un moment de plaisir et de découverte.
              </p>
              <p>
                Après des années passées dans les plus grandes maisons d&apos;optique
                parisiennes, Thomas a souhaité créer un lieu où chaque client se
                sentirait écouté et conseillé avec soin.
              </p>
              <p>
                Aujourd&apos;hui, O&apos;YOUN Optique est devenu une référence dans le
                quartier de la Paix, réputée pour sa sélection exigeante de
                montures et la qualité de son service.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="glass-card p-8 text-center"
            >
              <div className="font-heading text-4xl text-gold mb-2">
                {stat.value}
              </div>
              <div className="text-gray-soft text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <span className="text-gold text-sm uppercase tracking-widest mb-4 block">
              Nos Valeurs
            </span>
            <h2 className="font-heading text-3xl text-foreground">
              Ce Qui Nous Anime
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="glass-card p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-gold-subtle flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-heading text-xl text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-soft text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <span className="text-gold text-sm uppercase tracking-widest mb-4 block">
              Notre Équipe
            </span>
            <h2 className="font-heading text-3xl text-foreground">
              Les Visages d&apos;O&apos;YOUN
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="group">
                <div className="glass-card overflow-hidden">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-gold text-sm mb-3">{member.role}</p>
                    <p className="text-gray-soft text-sm">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Boutique Photos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <span className="text-gold text-sm uppercase tracking-widest mb-4 block">
              Notre Boutique
            </span>
            <h2 className="font-heading text-3xl text-foreground">
              Un Espace Dédie à Votre Vision
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80"
                alt="Intérieur boutique"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80"
                alt "Présentoir montures"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"
                alt="Espace consultation"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
