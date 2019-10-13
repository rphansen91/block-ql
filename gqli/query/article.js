const { fetchCachedArticles } = require('../../resource/newsapi')
const fireFetch = require('../firebase')

function article (obj, args, context, info) {
  return Promise.all([
    fetchCachedArticles()
    .catch(logError('Cached Articles err')),
    fireFetch('articles')
    .catch(logError('Firebase Articles err'))
  ])
  .then(([news, articles]) => {
    return [].concat(news, articles).find(a => a.publishedAt === args.id)
  })
}

article.prototype.typing = () => 'article(id: String!): Article'

module.exports = article

function logError (v) {
  return function (err) {
    console.log(v, err)
    return []
  }
}
