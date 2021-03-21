const link = async (parent, args, context, info) => {
  return await context.prisma.vote.findUnique({ where: { id: parent.id } }).link();
};

const user = async (parent, args, context, info) => {
  return await context.prisma.vote.findUnique({ where: { id: parent.id } }).user();
};

module.exports = {
  link,
  user,
};
