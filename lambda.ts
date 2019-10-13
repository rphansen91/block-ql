import { ApolloServer } from 'apollo-server-lambda'
import { typeDefs, resolvers, context } from './src/index'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  playground: true,
  introspection: true,
})

exports.handler = server.createHandler();