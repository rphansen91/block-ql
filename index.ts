import express from 'express'
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers, context } from './src/index'

const server = new ApolloServer({ typeDefs, resolvers, context });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);