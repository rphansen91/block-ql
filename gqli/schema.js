
const Types = require('./types')
const Query = require('./query')
const Mutation = require('./mutation')

const addTypings = typings => {
  return Object.keys(typings)
  .map(t => {
    try {
      return typings[t].prototype.typing()
    } catch (e) {
      throw new Error(t + ' does not have typings')
    }
  })
  .join('\n')
}

const rootType = (name, types) => {
  if (!types) return ''
  return `type ${name} {
  ${types}
}`
}

const typeTypes = addTypings(Types)
const queryTypes = addTypings(Query)
const mutationTypes = addTypings(Mutation)
const schemaDefinition =
`schema {
  ${queryTypes?'query: Query':''}
  ${mutationTypes?'mutation: Mutation':''}
}
`

module.exports = [
  typeTypes,
  rootType('Query', queryTypes),
  rootType('Mutation', mutationTypes),
  schemaDefinition
].join('\n')
