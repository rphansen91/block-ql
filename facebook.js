const PAGE_ACCESS_TOKEN = 'EAAMMG5ua8SIBAH1wPUdVi4zOzUi2lSdjkex3xpNtVHyFUFgi171MvKZAGLyaUSZCadX3ZCzPxDHJBNh02mulzsBUZBcGJC2VvXNwlDsZCvYsr6nRU6cJzUkT5XZB4ZC4WMHOU1KRxvgSLT7O10mTd6nPu8L3MgsvskRogkduaF1AwZDZD'

const fetch = require('node-fetch')
const { graphql } = require('graphql')
const coin = require('./gqli/query/coin')
const { generic, element, postbackBtn, urlBtn, quickReply, addQrs } = require('./templates')
const formatCoin = require('./formatters/coin')
const { logger, pretty, oneWord } = require('./utils')
const defaultText = 'Enter a symbol to find relevant pricing information'
const defaultQrs = ['BTC', 'BCH', 'ETH', 'LTC'].map(t => quickReply(t))

function handleMessage (senderId, message) {
  if (typeof message.text === 'string') {
    return handleText(senderId, message.text.trim())
  } else if (message.attachments) {
    return handleAttachments(senderId, message.attachments)
  } else {
    return sendDefault(senderId)
  }
}

function handleText (senderId, text) {
  if (oneWord(text)) {
    return coin({}, { id: text, pair: "USD" })
    .then(formatCoin)
    .then(response => {
      if (!response) throw new Error(`"${text}" Not Found`)
      return response
    })
    .then(addQrs(defaultQrs))
    .then(response => {
      return callSendAPI(senderId, response)
    })
    .catch(err => {
      console.log(err)
      return sendDefault(senderId)
    })
  }
  return sendDefault(senderId)
}

function handleAttachments (senderId, attachments) {
  return sendDefault(senderId)
  // const response = generic(
  //   attachments.map(a => element("Is this the right picture?", "Tap a button to answer.", a.payload.url, [
  //     postbackBtn('Yes!', 'yes'),
  //     postbackBtn('No!', 'no')
  //   ]))
  // )
  // callSendAPI(senderId, response)
}

function handlePostback (senderId, postback) {
  const payload = postback.payload;
  return handleText(senderId, postback.payload)
}

function sendDefault (senderId) {
  return callSendAPI(senderId, {
    text: defaultText,
    quick_replies: defaultQrs
  })
}

function callSendAPI (id, message) {
  return fetch('https://graph.facebook.com/v2.6/me/messages?access_token=' + PAGE_ACCESS_TOKEN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient: { id },
      message
    })
  })
  .then(res => res.json())
  .then(res => {
    if (res.error) return Promise.reject(res.error)
    return res
  })
  .catch(err => {
    console.log(err)
  })
}

module.exports = {
  handleMessage,
  handlePostback,
  callSendAPI
}
