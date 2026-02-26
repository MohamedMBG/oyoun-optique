"use client";

import Link from "next/link";
import { Glasses, MapPin, Phone, Mail, Clock, Instagram } from "lucide-react";

const footerLinks = {
  navigation: [
    { href: "/", label: "Accueil" },
    { href: "/frames", label: "Montures" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "À propos" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services", label: "Examen de vue" },
    { href: "/services", label: "Lentilles de contact" },
    { href: "/services", label: "Personnalisation" },
    { href: "/services", label: "Réparations" },
  ],
  legal: [
    { href: "/privacy", label: "Politique de confidentialité" },
    { href: "/terms", label: "Conditions d'utilisation" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-charcoal-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <Glasses className="w-8 h-8 text-gold transition-transform duration-300 group-hover:scale-110" />
              <div className="flex flex-col">
                <span className="font-heading text-xl text-foreground tracking-wide">
                  O&apos;YOUN
                </span>
                <span className="text-xs text-gray-muted tracking-[0.2em] uppercase">
                  Optique
                </span>
              </div>
            </Link>
            <p className="text-gray-soft text-sm leading-relaxed">
              Précision visuelle et montures d&apos;exception depuis 2010. Votre
              regard mérite l&apos;excellence.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-gray-soft hover:text-gold hover:border-gold/50 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading text-lg text-foreground mb-6">
              Navigation
            </h3>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-soft hover:text-gold transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg text-foreground mb-6">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-soft hover:text-gold transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg text-foreground mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-gray-soft text-sm">
                  15 Rue de la Paix
                  <br />
                  75002 Paris, France
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <a
                  href="tel:+33142600000"
                  className="text-gray-soft hover:text-gold transition-colors duration-200 text-sm"
                >
                  +33 1 42 60 00 00
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <a
                  href="mailto:contact@oyoun-optique.fr"
                  className="text-gray-soft hover:text-gold transition-colors duration-200 text-sm"
                >
                  contact@oyoun-optique.fr
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="text-gray-soft text-sm">
                  Lun-Ven: 10h-19h
                  <br />
                  Sam: 10h-18h
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-muted text-sm">
            &copy; {new Date().getFullYear()} O&apos;YOUN Optique. Tous droits
            réservés.
          </p>
          <div className="flex items-center gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-muted hover:text-gold transition-colors duration-200 text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
