"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Filter, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Sample frames data
const framesData = [
  {
    id: "1",
    name: "Classic Round",
    brand: "Ray-Ban",
    price: 189,
    shape: "Ronde",
    material: "Acétate",
    gender: "UNISEX",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    colors: ["Noir", "Écaille", "Bleu"],
  },
  {
    id: "2",
    name: "Aviator Titanium",
    brand: "Ray-Ban",
    price: 249,
    shape: "Aviateur",
    material: "Titane",
    gender: "UNISEX",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    colors: ["Or", "Argent", "Noir"],
  },
  {
    id: "3",
    name: "Cat Eye Chic",
    brand: "Prada",
    price: 329,
    shape: "Papillon",
    material: "Acétate",
    gender: "WOMEN",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=600&q=80",
    colors: ["Noir", "Rouge", "Rose"],
  },
  {
    id: "4",
    name: "Square Bold",
    brand: "Tom Ford",
    price: 399,
    shape: "Carrée",
    material: "Acétate",
    gender: "MEN",
    image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=600&q=80",
    colors: ["Noir", "Marron", "Gris"],
  },
  {
    id: "5",
    name: "Oval Vintage",
    brand: "Gucci",
    price: 459,
    shape: "Ovale",
    material: "Métal",
    gender: "UNISEX",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=600&q=80",
    colors: ["Or", "Argent"],
  },
  {
    id: "6",
    name: "Rectangle Slim",
    brand: "Dior",
    price: 379,
    shape: "Rectangle",
    material: "Acétate",
    gender: "WOMEN",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&q=80",
    colors: ["Noir", "Tortue"],
  },
  {
    id: "7",
    name: "Pilot Classic",
    brand: "Persol",
    price: 219,
    shape: "Aviateur",
    material: "Métal",
    gender: "MEN",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=600&q=80",
    colors: ["Or", "Gunmetal"],
  },
  {
    id: "8",
    name: "Butterfly Glam",
    brand: "Chanel",
    price: 549,
    shape: "Papillon",
    material: "Acétate",
    gender: "WOMEN",
    image: "https://images.unsplash.com/photo-1614713568397-b30b779d0498?w=600&q=80",
    colors: ["Noir", "Blanc", "Beige"],
  },
];

const brands = ["Toutes", "Ray-Ban", "Prada", "Tom Ford", "Gucci", "Dior", "Persol", "Chanel"];
const shapes = ["Toutes", "Ronde", "Carrée", "Ovale", "Rectangle", "Aviateur", "Papillon"];
const materials = ["Toutes", "Acétate", "Métal", "Titane"];
const genders = [
  { value: "ALL", label: "Tous" },
  { value: "MEN", label: "Homme" },
  { value: "WOMEN", label: "Femme" },
  { value: "UNISEX", label: "Unisexe" },
];

export default function FramesPage() {
  const [selectedFrame, setSelectedFrame] = useState<(typeof framesData)[0] | null>(null);
  const [filters, setFilters] = useState({
    brand: "Toutes",
    shape: "Toutes",
    material: "Toutes",
    gender: "ALL",
    maxPrice: 1000,
  });
  const [showFilters, setShowFilters] = useState(false);

  const filteredFrames = framesData.filter((frame) => {
    if (filters.brand !== "Toutes" && frame.brand !== filters.brand) return false;
    if (filters.shape !== "Toutes" && frame.shape !== filters.shape) return false;
    if (filters.material !== "Toutes" && frame.material !== filters.material) return false;
    if (filters.gender !== "ALL" && frame.gender !== filters.gender) return false;
    if (frame.price > filters.maxPrice) return false;
    return true;
  });

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-gold text-sm uppercase tracking-widest mb-4 block">
            Collection
          </span>
          <h1 className="font-heading text-4xl lg:text-5xl text-foreground mb-4">
            Nos Montures
          </h1>
          <p className="text-gray-soft max-w-2xl mx-auto">
            Découvrez notre sélection de montures de luxe des plus grandes
            maisons internationales.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filtres
              {showFilters && <X className="w-4 h-4 ml-2" />}
            </Button>
            <span className="text-gray-soft text-sm">
              {filteredFrames.length} monture
              {filteredFrames.length > 1 ? "s" : ""}
            </span>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="glass-card p-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <div>
                <label className="text-sm text-gray-muted mb-2 block">
                  Marque
                </label>
                <Select
                  value={filters.brand}
                  onValueChange={(value) =>
                    setFilters({ ...filters, brand: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-muted mb-2 block">
                  Forme
                </label>
                <Select
                  value={filters.shape}
                  onValueChange={(value) =>
                    setFilters({ ...filters, shape: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {shapes.map((shape) => (
                      <SelectItem key={shape} value={shape}>
                        {shape}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-muted mb-2 block">
                  Matériau
                </label>
                <Select
                  value={filters.material}
                  onValueChange={(value) =>
                    setFilters({ ...filters, material: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map((material) => (
                      <SelectItem key={material} value={material}>
                        {material}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-gray-muted mb-2 block">
                  Genre
                </label>
                <Select
                  value={filters.gender}
                  onValueChange={(value) =>
                    setFilters({ ...filters, gender: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {genders.map((gender) => (
                      <SelectItem key={gender.value} value={gender.value}>
                        {gender.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Frames Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFrames.map((frame, index) => (
            <motion.div
              key={frame.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group"
            >
              <div className="glass-card overflow-hidden transition-all duration-300 hover:border-gold/30">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={frame.image}
                    alt={frame.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-charcoal/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      onClick={() => setSelectedFrame(frame)}
                      className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Aperçu rapide
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="text-xs text-gold uppercase tracking-wider mb-1">
                    {frame.brand}
                  </div>
                  <h3 className="font-heading text-lg text-foreground mb-2">
                    {frame.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-gold font-medium">
                      {frame.price} €
                    </span>
                    <span className="text-xs text-gray-muted">
                      {frame.gender === "MEN"
                        ? "Homme"
                        : frame.gender === "WOMEN"
                        ? "Femme"
                        : "Unisexe"}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredFrames.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-soft mb-4">
              Aucune monture ne correspond à vos critères.
            </p>
            <Button
              variant="outline"
              onClick={() =>
                setFilters({
                  brand: "Toutes",
                  shape: "Toutes",
                  material: "Toutes",
                  gender: "ALL",
                  maxPrice: 1000,
                })
              }
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="font-heading text-2xl text-foreground mb-4">
              Essayez en boutique
            </h3>
            <p className="text-gray-soft mb-6">
              Venez découvrir notre collection complète et bénéficier de
              conseils personnalisés.
            </p>
            <Button asChild>
              <Link href="/reservation">
                Prendre Rendez-vous
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Quick View Dialog */}
      <Dialog open={!!selectedFrame} onOpenChange={() => setSelectedFrame(null)}>
        <DialogContent className="max-w-2xl bg-charcoal-card border-border">
          {selectedFrame && (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl">
                  {selectedFrame.name}
                </DialogTitle>
                <DialogDescription>{selectedFrame.brand}</DialogDescription>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <Image
                    src={selectedFrame.image}
                    alt={selectedFrame.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="text-3xl font-heading text-gold">
                      {selectedFrame.price} €
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-muted">Forme</span>
                      <span className="text-foreground">
                        {selectedFrame.shape}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-muted">Matériau</span>
                      <span className="text-foreground">
                        {selectedFrame.material}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-muted">Genre</span>
                      <span className="text-foreground">
                        {selectedFrame.gender === "MEN"
                          ? "Homme"
                          : selectedFrame.gender === "WOMEN"
                          ? "Femme"
                          : "Unisexe"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-muted">Couleurs</span>
                      <span className="text-foreground">
                        {selectedFrame.colors.join(", ")}
                      </span>
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/reservation">Réserver un essayage</Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
