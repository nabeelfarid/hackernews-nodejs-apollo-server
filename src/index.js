const { ApolloServer, PubSub } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const { PrismaClient } = require("@prisma/client");
const { getUserId } = require("./utils");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const Link = require("./resolvers/Link");
const User = require("./resolvers/User");
const Vote = require("./resolvers/Vote");
const DateTime = require("./resolvers/DateTime");

const prisma = new PrismaClient();
const pubsub = new PubSub();

// let links = [
//   {
//     id: "link-0",
//     url: "www.howtographql.com",
//     description: "Fullstack tutorial for GraphQL",
//   },
// ];

// let idCount = links.length;

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
  DateTime,
};

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  // When Operation is a Query/Mutation, obtain header-provided token from req.headers
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId: req && req.headers.authorization ? getUserId(req) : null,
    };
  },
  // When Operation is a Subscription, obtain token from connectionParams
  subscriptions: {
    onConnect: (connectionParams) => {
      if (connectionParams.authToken) {
        // return context available in graphQL resolvers
        return {
          prisma,
          userId: getUserId(null, connectionParams.authToken), //validate token and return userId
        };
      } else {
        // return context available in graphQL resolvers
        return {
          prisma,
        };
      }
    },
  },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
