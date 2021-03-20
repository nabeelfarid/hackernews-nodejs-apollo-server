const postedBy = (parent, args, context, info) => {
    return context.prisma.link.findUnique({
        where: {
            id: parent.id
        }
    }).postedBy();
}

module.exports = {
    postedBy,
}