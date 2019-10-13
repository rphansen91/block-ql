const fetch = require('node-fetch');

const cache = {}

module.exports = (url, opts, time) => {
  const reqId = url + JSON.stringify(opts)
  if (cache[reqId]) return cache[reqId]
  cache[reqId] = Promise.resolve()
  .then(() => fetch(url, opts))
  .then((res) => res.json())
  return cache[reqId] 
}