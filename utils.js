const { reduce, get } = require('lodash')
const fetch = require('node-fetch')
const qs = require('querystring')

function response (body) {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: body
  }
}

function query (event) {
  return event.queryStringParameters || {}
}

function jsonResponse (json) {
  return response(JSON.stringify(json))
}

function textResponse (text) {
  return response(text)
}

function errorResponse (err) {
  return jsonResponse({ error: err && err.message })
}

function parser ({ body }) {
  return function () {
    if (typeof body === 'string') return JSON.parse(body)
    return body
  }
}

function toString (value) {
  return JSON.stringify(value)
}

function pretty (value) {
  return JSON.stringify(value, null, 2)
}

function logger (label) {
  return function (v) {
    console.log(label, v)
    return v
  }
}

function timer (label) {
  console.time(label)
  return function (value) {
    console.timeEnd(label)
    return value
  }
}

function hash (key, val) {
  return function (acc, c) {
    acc[c[key]] = val ? c[val] : c
    return acc
  }
}

function pluck (key) {
  return function (obj) {
    return obj[key]
  }
}

function loadPage (url, limit=1000) {
  return function next (page=0) {
    return fetch(url + '?' + qs.stringify({ limit, start: page * limit }))
    .then(res => res.json())
    .then(timer('Page ' + (page + 1)))
    .then(data => {
      if (!data.length) return { data: [] }
      return { data, next: () => next(page + 1) }
    })
  }
}

function combinePages (res) {
  let values = []

  function load ({ data, next }) {
    if (!next) return values.concat(data)
    values = values.concat(data)
    return next().then(load)
  }

  return load(res)
}

function findImages ({ q, limit }) {
  return fetch(`https://api.qwant.com/api/search/images?count=${limit}&q=${q}`)
  .then(res => res.json())
  .then(logger('Images'))
  .then(({ data }={}) => data)
  .then(({ result }={}) => result)
  .then(({ items }={}) => items)
  .then((items=[]) => items.map(({ media }) => media))
}

const loadSymbols = loadPage('https://api.coinmarketcap.com/v1/ticker/')
const symbols = loadSymbols()
.then(combinePages)
.then(res => res.reduce(hash('symbol', 'id'), {}))


function symbolToId (symbol) {
  return symbols.then(function (s) {
    if (s[symbol]) return s[symbol]
    if (s[symbol.toUpperCase()]) return s[symbol.toUpperCase()]
    if (s[symbol.toLowerCase()]) return s[symbol.toLowerCase()]
  })
}

function oneWord (str) {
  return typeof str === 'string' && str.indexOf(' ') === -1
}

function handleTernary (ternary) {
  return function (isTruthy=(v => true), isFalsey=(v => false)) {
    return function (value) {
      if (ternary(value)) return isTruthy(value)
      return isFalsey(value)
    }
  }
}

function getAll (keys, obj) {
  return reduce(keys, (acc, key) => {
    acc[key] = get(obj, key)
    return acc
  }, {})
}

const isPositive = handleTernary(v => v >= 0)

module.exports = {
  symbolToId,
  toString,
  parser,
  logger,
  pretty,
  oneWord,
  findImages,
  query,
  handleTernary,
  isPositive,
  getAll,
  response: {
    json: jsonResponse,
    err: errorResponse,
    text: textResponse
  }
}
