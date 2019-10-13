const { generateArticleId } = require('../../resource/newsapi')

function Article () {}

Article.prototype.typing = () =>
`
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
	content: String
	htmlContent: String
	url: String
	urlToImage: String
	publishedAt: String
}
`

Article.id = generateArticleId

module.exports = Article
