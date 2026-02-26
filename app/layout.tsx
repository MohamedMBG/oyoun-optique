import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "O'YOUN Optique | Précision Visuelle. Montures d'Exception.",
  description:
    "Découvrez l'art de la vision chez O'YOUN Optique. Examens de vue, montures de luxe, lentilles de contact et service personnalisé à Paris.",
  keywords: [
    "opticien",
    "lunettes",
    "montures",
    "examen de vue",
    "lentilles",
    "Paris",
    "luxe",
  ],
  authors: [{ name: "O'YOUN Optique" }],
  openGraph: {
    title: "O'YOUN Optique | Précision Visuelle. Montures d'Exception.",
    description:
      "Découvrez l'art de la vision chez O'YOUN Optique. Votre regard mérite l'excellence.",
    type: "website",
    locale: "fr_FR",
    url: "https://oyoun-optique.fr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-charcoal text-foreground noise-overlay">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
