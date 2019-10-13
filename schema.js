
const { makeExecutableSchema } = require('graphql-tools')
const schema = require('./gqli/schema')
const resolvers = require('./gqli/resolvers')

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolvers,
})
