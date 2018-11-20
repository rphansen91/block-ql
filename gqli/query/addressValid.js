const fetch = require('node-fetch')
const parser = require('../parseResult')

function addressValid (obj, args, context, info) {
  const { addr } = args
  return fetch('https://blockexplorer.com/api/addr-validate/'+addr+'')
  .then(parser('addressValid'))
  .then(isValid => ({ isValid }))
}

addressValid.prototype.typing = () => 'addressValid(addr: String): AddressValid'

module.exports = addressValid
