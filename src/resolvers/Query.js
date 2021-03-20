const { NoDeprecatedCustomRule } = require("graphql");

const info = () => `This is the API of a Hackernews Clone`;

const feed = async (parent, args, context, info) => {
  return await context.prisma.link.findMany();
  // return links;
};

const link = async (parent, args, context) => {
  return await context.prisma.link.findUnique({
    where: {
      id: Number(args.id),
    },
  });
  // return links.find((l) => `link-${args.id}` === l.id)
};
// Link: {
//     id: (parent) => parent.id,
//     description: (parent) => parent.description,
//     url: (parent) => parent.url
// }

module.exports = {
  info,
  feed,
  link,
};
