const groupBy = require('lodash/groupBy')
const fetch = require('node-fetch')
const qs = require('querystring')
const bucket = process.env.RESOURCE_BUCKET || 'hodlstream-resources'
const articlesKey = process.env.ARTICLES_KEY || 'articles'
const url = args => `https://newsapi.org/v2/everything?${qs.stringify(Object.assign({
  apiKey: 'c7cc23b6655a4b18855e50c553cf5c65',
  sortBy: 'popularity'
}, args))}`

function fetchNewsApi (args) {
  return fetch(url(args))
  .then(res => res.json())
  .then(res => res.articles || [])
  .catch(err => {
    console.log('News api err', err)
    return []
  })
}

function generateArticleId ({ id, publishedAt }) {
    return id || publishedAt
}

function fetchCachedArticles () {
    return fetch(`https://s3.amazonaws.com/${bucket}/${articlesKey}`)
    .then((res) => res.json())
}

function findNewArticles () {
    return Promise.all([
        fetchCachedArticles().catch(() => ([])),
        fetchNewsApi({ q: 'cryptocurrency' }),
    ])
    .then(([
        cachedNews,
        currentNews
    ]) => {
        const cachedNewsById = groupBy(cachedNews, generateArticleId)
        const toBeInserted = currentNews.filter(article => !cachedNewsById[generateArticleId(article)])
        const allArticles = cachedNews.concat(toBeInserted)
        return {
            toBeInserted,
            allArticles
        }
    })
}

module.exports = {
    fetchNewsApi,
    generateArticleId,
    fetchCachedArticles,
    findNewArticles
}