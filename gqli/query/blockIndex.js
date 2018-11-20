const fetch = require('node-fetch')
const block = require('./block')
const parser = require('../parseResult')

function blockIndex (obj, args, context, info) {
  const { height } = args
  return fetch('https://blockexplorer.com/api/block-index/'+height+'')
  .then(parser('blockIndex'))
  .then(loadBlock)
}

function loadBlock ({ blockHash: hash }) {
  return block(null, { hash })
}

blockIndex.prototype.typing = () => 'blockIndex(height: Int): Block'

module.exports = blockIndex
