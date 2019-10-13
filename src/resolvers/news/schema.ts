import gql from 'graphql-tag'

export default gql`
  type Article {
    source: String
    author: String
    title: String
    description: String
    content: String
    url: String
    urlToImage: String
    publishedAt: String
  }

  type Query {
    news(q: String, sortBy: String, from: String): [Article]
  }
`
