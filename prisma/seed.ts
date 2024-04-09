import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const dei = await prisma.user.upsert({
    where: { pin: "062500" },
    update: {},
    create: {
      name: "Dei",
      pin: "062500",
    },
  });

  const wyn = await prisma.user.upsert({
    where: { pin: "053102" },
    update: {},
    create: {
      name: "Wyn",
      pin: "053102",
    },
  });

  console.log({ dei, wyn });
}

try {
  await main();
  await prisma.$disconnect();
} catch (e) {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
}
