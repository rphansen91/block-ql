import { ApolloServer } from 'apollo-server-lambda'
import { typeDefs, resolvers, context } from './src/index'
import { findNewArticles, fetchCachedArticles } from './src/context/news'
import { sendPublicationNotifications } from './src/context/notification'
import { compressAndCache } from './src/utils/s3'
import { Article } from './src/resolvers/types'
const { response, parser, logger, query } = require('./utils')
const { handleMessage, handlePostback } = require('./facebook')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  playground: true,
  introspection: true,
})

exports.graphql = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  }
});

module.exports.fbverify = function (event: any, context: any, cb: any) {
  if (query(event)['hub.verify_token'] === 'testbot_verify_token') {
    cb(null, response.text(query(event)['hub.challenge']));
  } else {
    cb(null, response.text('Invalid verify token'))
  }
}

module.exports.fbwebhook = function (event: any, context: any, cb: any) {
  context.callbackWaitsForEmptyEventLoop = false
  logger('Received webhook')(event)

  return Promise.resolve()
  .then(parser(event))
  .then(({ entry=[] }: any) => entry)
  .then(entries => {
    return entries.map((entry: any) => {
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

module.exports.cacheNews = function (event: any, context: any, cb: any) {
  context.callbackWaitsForEmptyEventLoop = false
  logger('Caching news')('')

  return Promise.resolve()
  .then(() => findNewArticles())
  .then(logger('New Articles'))
  .then(({ allArticles, toBeInserted }) => Promise.all([
    updateArticlesCache(allArticles),
    sendPublicationNotifications(
      'New Articles', 
      toBeInserted
    )
    .catch(logger('Publication Notifications Error'))
  ]))
  .then(logger('News Update Success'))
  .then(() => cb(null, response.json({ success: true })))
  .catch(err => cb(null, response.err(err)))
}

module.exports.activateArticle = (event: any, context: any, cb: any) => {
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

module.exports.deactivateArticle = (event: any, context: any, cb: any) => {
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

module.exports.postArticle = (event: any, context: any, cb: any) => {
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

async function updateArticlesCache (allArticles: Article[]) {
  await compressAndCache('articles', allArticles)
  return allArticles
}
