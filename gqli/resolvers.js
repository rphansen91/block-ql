
const Types = require('./types')
const Query = require('./query')
const Mutation = require('./mutation')
const Root = {}

if (Object.keys(Query).length) Root.Query = Query
if (Object.keys(Mutation).length) Root.Mutation = Mutation

module.exports = Object.assign(Root, Types)
