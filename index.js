
const express = require('express')
const bodyParser = require('body-parser')
const { graphqlConnect, graphiqlExpress } = require('graphql-server-express')
const { handleMessage, handlePostback } = require('./facebook')
const exchanges = require('./exchanges')
const http = require('http')
const cors = require('cors')
const schema = require('./schema')

const PORT = 3000

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use('/graphql', graphqlConnect({
  schema: schema
}))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

app.get('/facebook', (req, res) => {
  console.log(req)
  if (req.query['hub.verify_token'] === 'testbot_verify_token') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Invalid verify token');
  }
})

app.post('/facebook', (req, res) => {
  const body = req.body
  if (body.object === 'page') {
    body.entry.forEach(function(entry) {
      let webhook_event = entry.messaging[0]
      let sender_psid = webhook_event.sender.id
      console.log('Sender PSID: ' + sender_psid)

      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message)
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback)
      }
    })
    res.status(200).send('EVENT_RECEIVED')
  } else {
    res.sendStatus(404)
  }
})

http.createServer(app).listen(PORT, () => {
  console.log('GraphiQL running: http://localhost:' + PORT + '/graphiql')
})
