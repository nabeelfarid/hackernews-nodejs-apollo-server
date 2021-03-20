const links = (parent, args, context, info) => {
  return context.prisma.user.findUnique({
      where: {
          id: args.id
      }
  }).links();
};

module.exports = {
  links,
};
