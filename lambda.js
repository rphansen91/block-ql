const { graphql } = require('graphql')
const { response, parser, logger, query } = require('./utils')
const { handleMessage, handlePostback } = require('./facebook')
const schema = require('./schema')

module.exports.graphql = function(event, context, cb) {
  context.callbackWaitsForEmptyEventLoop = false
  logger('Received event')(event)

  return Promise.resolve()
  .then(parser(event))
  .then(({ query, operationName, variables }) =>
    graphql(schema, query, null, null, variables, operationName))
  .then(logger('result'))
  .then(response.json)
  .then(res => cb(null, res))
  .catch(err => cb(null, response.error(error)))
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
  .catch(err => cb(null, response.error(err)))
}
