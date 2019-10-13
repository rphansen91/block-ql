const cliApply = require('cli-apply')
const { mapValues, keys, values, first, flow, map } = require('lodash')
const table = require('../formatters/table')
const exchanges = require('./')
const auth = require('./auth')

function appendAuth (authFn) {
  return function (fn) {
    return function (...opts) {
      return fn(authFn(), ...opts)
    }
  }
}

cliApply({
  bittrex: mapValues(
    exchanges.bittrex,
    appendAuth(auth.bittrex)
  )
})
.then(display)
.catch(displayErr)

const tableHead = flow(first, keys)

function display (v) {
  table({
    head: tableHead(v),
    rows: map(v, values)
  }).render()
}

function displayErr (err) {
  table({
    head: 'Error',
    rows: [[err.message]]
  }).render()
}
