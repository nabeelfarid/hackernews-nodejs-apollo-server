const { NoDeprecatedCustomRule } = require("graphql");

const info = () => `This is the API of a Hackernews Clone`;

const feed = async (parent, args, context, info) => {
  const where = args.filter
    ? {
        OR: [
          { url: { contains: args.filter } },
          { description: { contains: args.filter } },
        ],
      }
    : {};
  const links = await context.prisma.link.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  });

  const count = await context.prisma.link.count({ where });

  return {
    links,
    count,
  };
};

const link = async (parent, args, context) => {
  return await context.prisma.link.findUnique({
    where: {
      id: Number(args.id),
    },
  });
  // return links.find((l) => `link-${args.id}` === l.id)
};

module.exports = {
  info,
  feed,
  link,
};
