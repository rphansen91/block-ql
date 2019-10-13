const { fetchCachedArticles } = require('../../resource/newsapi')
const fireFetch = require('../firebase')

function news (obj, args, context, info) {
  return Promise.all([
    fetchCachedArticles()
    .catch(logError('Cached Articles err')),
    fireFetch('articles')
    .catch(logError('Firebase Articles err'))
  ])
  .then(([news, articles]) => {
    return [].concat(news, articles)
    .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt))
  })
  .then(all => (all || []).slice(0, 20))
}

news.prototype.typing = () => 'news(q: String, sortBy: String, from: String): [Article]'

module.exports = news

function logError (v) {
  return function (err) {
    console.log(v, err)
    return []
  }
}
