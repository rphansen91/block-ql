const { graphql } = require('graphql')
const { response, parser, logger, query } = require('./utils')
const { handleMessage, handlePostback } = require('./facebook')
const { getContext } = require('./gqli/context')
const { findNewArticles, fetchCachedArticles } = require('./resource/newsapi')
const { sendPublicationNotifications } = require('./notifications')
const cacheResource = require('./resource/cache')
const compressResource = require('./resource/compress')
const schema = require('./schema')
const { compressedOptions } = cacheResource

module.exports.graphql = function(event, context, cb) {
  context.callbackWaitsForEmptyEventLoop = false
  logger('Received event')(event)

  return Promise.resolve()
  .then(parser(event))
  .then(({ query, operationName, variables }) =>
    graphql(schema, query, null, getContext(), variables, operationName))
  .then(logger('result'))
  .then(response.json)
  .then(res => cb(null, res))
  .catch(err => cb(null, response.err(err)))
}

module.exports.fbverify = function (event, context, cb) {
  if (query(event)['hub.verify_token'] === 'testbot_verify_token') {
    cb(null, response.text(query(event)['hub.challenge']));
  } else {
    cb(null, response.text('Invalid verify token'))
  }
}

module.exports.fbwebhook = function (event, context, cb) {
  context.callbackWaitsForEmptyEventLoop = false
  logger('Received webhook')(event)

  return Promise.resolve()
  .then(parser(event))
  .then(({ entry=[] }) => entry)
  .then(entries => {
    return entries.map(function(entry) {
      let webhook_event = entry.messaging[0]
      let sender_psid = webhook_event.sender.id
      logger('Sender PSID')(sender_psid)

      if (webhook_event.message) {
        return handleMessage(sender_psid, webhook_event.message)
      } else if (webhook_event.postback) {
        return handlePostback(sender_psid, webhook_event.postback)
      } else {
        return Promise.resolve()
      }
    })
  })
  .then(entries => Promise.all(entries))
  .then(() => cb(null, response.text('EVENT_RECEIVED')))
  .catch(err => cb(null, response.err(err)))
}

module.exports.cacheNews = function (event, context, cb) {
  context.callbackWaitsForEmptyEventLoop = false
  logger('Caching news')('')

  return Promise.resolve()
  .then(() => findNewArticles())
  .then(logger('New Articles'))
  .then(({ allArticles, toBeInserted }) => Promise.all([
    updateArticlesCache(allArticles),
    sendPublicationNotifications('New Articles', toBeInserted)
    .catch(logger('Publication Notifications Error'))
  ]))
  .then(logger('News Update Success'))
  .then(() => cb(null, response.json({ success: true })))
  .catch(err => cb(null, response.err(err)))
}

module.exports.getCachedNews = function () {
  context.callbackWaitsForEmptyEventLoop = false

  return fetchCachedArticles()
  .then(v => cb(null, response.json(v)))
  .catch(err => cb(null, response.err(err)))
}

module.exports.activateArticle = (event, context, cb) => {
  context.callbackWaitsForEmptyEventLoop = false
  const publishedAt = event.pathParameters.id

  logger('Received publication request')(event)

  return fetchCachedArticles()
  .then((articles) => articles.map((article) => {
      if (article.publishedAt === publishedAt) {
        article.isActive = true
      }
      return article
  }))
  .then(v => updateArticlesCache(v))
  .then(v => cb(null, response.json({ success: true })))
  .catch(err => cb(null, response.err(err)))
}

module.exports.deactivateArticle = (event, context, cb) => {
  context.callbackWaitsForEmptyEventLoop = false
  const publishedAt = event.pathParameters.id
  logger('Received deactivation request')(event)
  
  return fetchCachedArticles()
  .then((articles) => articles.map((article) => {
      if (article.publishedAt === publishedAt) {
        article.isActive = false
      }
      return article
  }))
  .then(v => updateArticlesCache(v))
  .then(v => cb(null, response.json({ success: true })))
  .catch(err => cb(null, response.err(err)))
}

module.exports.postArticle = (event, context, cb) => {
  context.callbackWaitsForEmptyEventLoop = false
  const publishedAt = event.pathParameters.id
  logger('Received post request')(event)
  
  return fetchCachedArticles()
  .then((articles) => {
    const article = articles.find((article) => {
      return article.publishedAt === publishedAt
    })
    if (!article) throw new Error('Article not found')
    // const updatedArticles = articles.map((article) => {
    //     if (article.publishedAt === publishedAt) {
    //       article.isPosted = true
    //     }
    //     return article
    // })

    // Publish to social
    return sendPublicationNotifications("New Articles", [article])
    // return updatedArticles
  })
  // .then(v => updateArticlesCache(v))
  .then(v => cb(null, response.json({ success: true })))
  .catch(err => cb(null, response.err(err)))
}

function updateArticlesCache (allArticles) {
  return compressResource(JSON.stringify(allArticles))
  .then((Body) => cacheResource(
    process.env.RESOURCE_BUCKET, 
    process.env.ARTICLES_KEY, 
    Body,
    compressedOptions
  ))
}
