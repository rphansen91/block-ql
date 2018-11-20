function Article () {}

Article.prototype.typing = () =>
`type Article {
	source: String
	author: String
	title: String
  description: String
  content: String
	url: String
	urlToImage: String
	publishedAt: String
}`

Article.source = function ({ source }) {
  return JSON.stringify(source)
}

module.exports = Article
