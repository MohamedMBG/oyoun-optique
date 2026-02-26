import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@oyoun-optique.fr" },
  });

  if (existingAdmin) {
    console.log("Admin user already exists");
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

  console.log("Admin user created successfully");
  console.log("Email: admin@oyoun-optique.fr");
  console.log("Password: admin123");
  console.log("Please change the password after first login!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
