import gql from 'graphql-tag'

export default gql`
  type Product {
	name: String!
	amount: Int!
	description: String!
	images: [String!]
	currency: String
    session: String
    shippable: Boolean
    tags: [String!]
  }


  type Query {
    products(q: String): [Product!]
  }
`
