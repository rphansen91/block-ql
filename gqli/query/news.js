const fetch = require('node-fetch')
const qs = require('querystring')
const url = args => `https://newsapi.org/v2/everything?${qs.stringify(Object.assign({
  apiKey: 'c7cc23b6655a4b18855e50c553cf5c65',
  sortBy: 'popularity'
}, args))}`

function news (obj, args, context, info) {
  return fetch(url(args))
  .then(res => res.json())
  .then(res => res.articles || [])
}

news.prototype.typing = () => 'news(q: String, sortBy: String, from: String): [Article]'

module.exports = news
