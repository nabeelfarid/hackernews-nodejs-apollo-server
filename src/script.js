const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const main = async () => {
  // const newLink = await prisma.link.create({
  //   data: {
  //     description: "13Fullstach tutorial for GraphQL",
  //     url: "www.13howtographql.com",
  //     postedById : null
  //   },
  // });

  // await context.prisma.link.create({
  //   data: {
  //     url: args.url,
  //     description: args.description,
  //     postedBy: {
  //       connect: {
  //         id: userId,
  //       },
  //     },
  //   },
  // })

  // let user = await prisma.user.findUnique({
  //   where: {
  //     email: 'nabeelfarid@gmail.com',
  //   },
  // });
  // console.log(user);

  let votes = await prisma.link.findUnique({where:{id: 1}}).votes()

  console.log(votes);

  let poastedby = await prisma.link.findUnique({
    where: {
        id: 1
    }
}).postedBy();

console.log(poastedby);
  // let userLinks = await prisma.user
  //   .findUnique({
  //     where: {
  //       id: 1,
  //     },
  //   })
  //   .links();
  //   console.log(userLinks);

  // const allLinks = await prisma.link.findMany();
  // console.log(allLinks);
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
