const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const main = async () => {
  const newLink = await prisma.link.create({
    data: {
      description: "Fullstach tutorial for GraphQL",
      url: "www.howtographql.com",
    },
  });
  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
};

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    console.log("disconnecting db...");
    await prisma.$disconnect();
    console.log("disconnected db successfully");
  });
