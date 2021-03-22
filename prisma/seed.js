const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: `alice@prisma.io`,
      name: "Alice",
      password: await bcrypt.hash("password", 10),
      links: {
        create: {
          description: "Check out Prisma with Next.js",
          url: "https://www.prisma.io/nextjs",
        },
      },
    },
  });

  const bob = await prisma.user.upsert({
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: `bob@prisma.io`,
      name: "Bob",
      password: await bcrypt.hash("password", 10),
      links: {
        create: [
          {
            description: "Follow Prisma on Twitter",
            url: "https://twitter.com/prisma",
          },
          {
            description: "Follow Nexus on Twitter",
            url: "https://twitter.com/nexusgql",
          },
        ],
      },
    },
  });
  console.log({ alice, bob });
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
