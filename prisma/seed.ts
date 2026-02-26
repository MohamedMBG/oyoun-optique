import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@oyoun-optique.fr" },
  });

  if (existingAdmin) {
    console.log("✅ Admin user already exists");
    console.log("Email: admin@oyoun-optique.fr");
    console.log("Password: admin123");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
    data: {
      email: "admin@oyoun-optique.fr",
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("✅ Admin user created successfully!");
  console.log("Email: admin@oyoun-optique.fr");
  console.log("Password: admin123");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
