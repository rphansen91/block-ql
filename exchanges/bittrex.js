const { omit, filter, map, includes, curry, reduce, get } = require('lodash')
const { getAll, symbolToId } = require('../utils')
const hmacSha512 = require('crypto-js/hmac-sha512')
const fetch = require('node-fetch')
const qs = require('querystring')
const api = '//bittrex.com/api/v1.1'

var lastNonces = [];

function getNonce () {
  var nonce = new Date().getTime();
  if (lastNonces.indexOf(nonce) > -1) {
    return getNonce();
  }
  lastNonces = lastNonces.slice(-50);
  lastNonces.push(nonce);
  return nonce;
};

function signedRequest (url, opts) {
  if (!opts.apikey) throw new Error('Must supply apikey')
  if (!opts.apisecret) throw new Error('Must supply apisecret')
  const options = omit(opts, 'apisecret')
  options.nonce = getNonce()
  const uri = url + '?' + qs.stringify(options)
  const apisign = hmacSha512(uri, opts.apisecret).toString()
  const headers = { apisign }
  return fetch(uri, { method: 'GET', headers })
  .then(res => res.json())
}

function getTime ({ TimeStamp }={}) {
  return (TimeStamp ? new Date(TimeStamp) : new Date()).getTime() / 1000
}

function getValue ({ OrderType, Quantity }={}) {
  if (OrderType.includes('SELL')) return -Quantity
  return Quantity
}

function getSymbol (pair, { Exchange }={}) {
  return Exchange.replace(pair + '-', '')
}

function formatTransaction (pair, tx) {
  const createdAt = getTime(tx)
  const value = getValue(tx)
  const symbol = getSymbol(pair, tx)
  return symbolToId(symbol)
  .then(coin => ({ coin, createdAt, value, symbol }))
}

function handleResult ({ success, result, message }) {
  if (!success) throw new Error(message)
  return result
}

module.exports = {
  getBalance: function (opts) {
    const formatBalance = curry(getAll)(['Currency', 'Balance', 'Available', 'Pending'])
    return signedRequest(api + '/account/getbalances', opts)
    .then(handleResult)
    .then(result => map(result, formatBalance))
  },
  getOrders: function (opts) {
    return signedRequest(api + '/account/getorderhistory', opts)
    .then(handleResult)
    .then(result => map(result, curry(formatTransaction)('BTC')))
    .then(result => Promise.all(result))
  }
}
