const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

const signup = async (parent, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: {
      email: args.email,
      name: args.name,
      password: password,
    },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const login = async (parent, args, context, info) => {
  const user = await context.prisma.user.findUnique({
    where: {
      email: args.email,
    },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    APP_SECRET
  );

  return {
    token,
    user,
  };
};

const post = async (parent, args, context, info) => {
  const { userId } = context;

  return await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: {
        connect: {
          id: userId,
        },
      },
    },
  });

  // const newLink = await context.prisma.link.create({
  //   data: {
  //     url: args.url,
  //     description: args.description,
  //   },
  // });
  // return newLink;

  // const link = {
  //   id: `link-${idCount++}`,
  //   description: args.description,
  //   url: args.url,
  // };
  // links.push(link);
  // return link;
};

const updatePost = async (parent, args, context) => {
  try {
    const link = await context.prisma.link.update({
      where: {
        id: Number(args.id),
      },
      data: {
        url: args.url,
        description: args.description,
      },
    });
    return link;
  } catch (error) {
    if (error.code === "P2025") {
      // record does not exist
      return null;
    } else {
      throw error;
    }
  }

  // let link = links.find((l) => l.id === `link-${args.id}`);
  // if (link) {
  //   link.url = args.url;
  //   link.description = args.description;
  //   return link;
  // } else {
  //   return null;
  // }
};

const deletePost = async (parent, args, context) => {
  try {
    const link = await context.prisma.link.delete({
      where: {
        id: Number(args.id),
      },
    });
    return link;
  } catch (error) {
    // console.log('error', JSON.stringify(error));
    if (error.code === "P2025") {
      // record does not exist
      return null;
    } else {
      throw error;
    }
  }

  // const link = links.find((l) => l.id === `link-${args.id}`);
  // if (link) {
  //   const i = links.indexOf(link);
  //   links.splice(i, 1);
  //   return link;
  // } else {
  //   return null;
  // }
};

module.exports = {
  signup,
  login,
  post,
  updatePost,
  deletePost
};
