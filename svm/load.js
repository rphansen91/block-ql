const fetch = require('node-fetch')
const qs = require('querystring')

module.exports = function loadData (symbol, pair, limit) {
  return fetch('https://min-api.cryptocompare.com/data/histoday?' + qs.stringify({
    aggregate: 1,
    e: 'CCCAGG',
    fsym: symbol.toUpperCase(),
    tsym: (symbol === pair) ? 'USD' : pair.toUpperCase(),
    limit: limit || 365,
    tryConversion: false
  }))
  .then(res => res.json())
  .then(res => {
    if (res.Message) return Promise.reject(new Error(res.Message))
    return res
  })
  .then(({ Data }) => Data)
}
