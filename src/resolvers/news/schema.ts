import gql from 'graphql-tag'

export default gql`
  type ArticleSource {
    id: String
    name: String
  }
  type Article {
    id: String!
    source: ArticleSource
    author: String
    title: String
    description: String
    htmlContent: String
    content: String
    url: String
    urlToImage: String
    publishedAt: String
    isActive: Boolean
  }

  type Query {
    article(id: String!): Article
    news(q: String, sortBy: String, from: String): [Article]
  }
`
