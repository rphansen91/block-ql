const fetch = require('node-fetch')

const uri = 'https://firestore.googleapis.com/v1/projects/hodlstream-223517/databases/(default)/documents/'

function getFieldValue (field) {
    if (field.hasOwnProperty('stringValue')) return field.stringValue
    if (field.hasOwnProperty('arrayValue')) return field.arrayValue.values.map(getFieldValue)
    if (field.hasOwnProperty('integerValue')) return Number(field.integerValue)
    if (field.hasOwnProperty('booleanValue')) return field.booleanValue
    if (field.hasOwnProperty('timestampValue')) return field.timestampValue
    return null
}

module.exports = function fireFetch (doc) {
    return fetch(`${uri}${doc}`)
    .then(res => res.json())
    .then(({ documents }) => {
      const docs = (documents || []).map(({ fields }) => {
        return Object.keys(fields || {})
        .reduce((acc, key) => {
          const field = fields[key]
          acc[key] = getFieldValue(field)
          return acc
        }, {})
      })
      return docs
    })
}