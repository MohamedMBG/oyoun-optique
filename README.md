# O'YOUN Optique

Une boutique d'optique de luxe avec système de réservation complet.

## 🚀 Stack Technique

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **3D**: React Three Fiber, Three.js, Drei
- **Animations**: Framer Motion
- **Backend**: Next.js API Routes
- **Base de données**: PostgreSQL avec Prisma ORM
- **Authentification**: NextAuth.js
- **Emails**: Resend
- **Validation**: Zod

## 📋 Prérequis

- Node.js 18+
- PostgreSQL (local ou cloud - Neon/Supabase)
- Compte Resend pour les emails

## 🛠️ Installation

### 1. Cloner le projet

```bash
cd oyoun-optique
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env.local` à la racine:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-min-32-chars-long"

# Resend Email
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
FROM_EMAIL="contact@oyoun-optique.fr"
FROM_NAME="O'YOUN Optique"
```

### 4. Initialiser la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Exécuter les migrations
npx prisma migrate dev --name init
```

### 5. Créer un utilisateur admin

Créer un fichier `prisma/seed.ts`:

```typescript
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("votre-mot-de-passe", 10);

  await prisma.user.create({
    data: {
      email: "admin@oyoun-optique.fr",
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin user created");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Exécuter le seed:

```bash
npx ts-node prisma/seed.ts
```

### 6. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 📁 Structure du Projet

```
app/
├── (public)/           # Pages publiques
│   ├── page.tsx        # Accueil
│   ├── frames/         # Catalogue montures
│   ├── services/       # Services
│   ├── about/          # À propos
│   ├── contact/        # Contact
│   └── reservation/    # Réservation
├── admin/              # Espace admin
│   ├── login/          # Connexion
│   └── dashboard/      # Tableau de bord
├── api/                # API Routes
│   ├── auth/           # NextAuth
│   ├── reservations/   # Réservations publiques
│   └── admin/          # API Admin
components/
├── ui/                 # Composants UI (shadcn)
├── 3d/                 # Composants Three.js
├── sections/           # Sections de page
├── forms/              # Formulaires
├── cards/              # Cartes
└── navigation/         # Navigation
lib/
├── prisma.ts           # Client Prisma
├── auth.ts             # Config NextAuth
├── email.ts            # Service email
├── rate-limit.ts       # Rate limiting
├── validation.ts       # Schemas Zod
└── utils.ts            # Utilitaires
prisma/
└── schema.prisma       # Schema base de données
```

## 🔐 Sécurité

- Authentification sécurisée avec NextAuth
- Hashage des mots de passe avec bcrypt
- Rate limiting sur les endpoints de réservation
- Validation Zod côté client et serveur
- Protection CSRF
- Honeypot anti-spam
- Sanitization des inputs

## 🎨 Design System

### Couleurs

- **Background**: `#0B0F14` (charcoal)
- **Accent**: `#E3B261` (gold)
- **Text**: `#F5F7FA` (off-white)
- **Muted**: `#B8C0CC` (soft gray)

### Typographie

- **Titres**: Cormorant Garamond
- **Corps**: Inter

## 🚀 Déploiement

### Vercel

1. Connecter le repo GitHub à Vercel
2. Ajouter les variables d'environnement
3. Configurer la commande de build:
   ```
   prisma generate && next build
   ```
4. Déployer

### Base de données

Utiliser Neon ou Supabase pour PostgreSQL en production.

## 📝 Fonctionnalités

### Public

- Page d'accueil avec hero 3D
- Catalogue de montures avec filtres
- Page services détaillée
- Page à propos avec équipe
- Formulaire de contact
- Système de réservation multi-étapes

### Admin

- Authentification sécurisée
- Tableau de bord des réservations
- Confirmation/Refus des demandes
- Envoi d'emails automatiques
- Logs d'audit

## 📧 Emails

Les emails transactionnels sont envoyés via Resend:

- **Accusé de réception**: Après soumission d'une demande
- **Confirmation**: Quand l'admin confirme le rendez-vous
- **Refus**: Quand l'admin refuse avec suggestions

## 🧪 Tests

```bash
# Linting
npm run lint

# Build de production
npm run build
```

## 📄 Licence

Propriétaire - O'YOUN Optique
