const links = async (parent, args, context, info) => {
  return await context.prisma.user.findUnique({
      where: {
          id: parent.id
      }
  }).links();
};

module.exports = {
  links,
};
