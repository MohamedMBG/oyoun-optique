import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 rounded-full bg-gold-subtle flex items-center justify-center mx-auto mb-8">
          <Search className="w-12 h-12 text-gold" />
        </div>
        <h1 className="font-heading text-6xl text-foreground mb-4">404</h1>
        <h2 className="font-heading text-2xl text-foreground mb-4">
          Page non trouvée
        </h2>
        <p className="text-gray-soft mb-8 max-w-md mx-auto">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Button asChild>
          <Link href="/">
            <Home className="w-4 h-4 mr-2" />
            Retour à l&apos;accueil
          </Link>
        </Button>
      </div>
    </div>
  );
}
