import fetch from 'node-fetch'

const uri = 'https://firestore.googleapis.com/v1/projects/hodlstream-223517/databases/(default)/documents/'

function getFieldValue (field: any) {
    if (field.hasOwnProperty('stringValue')) return field.stringValue
    if (field.hasOwnProperty('arrayValue')) return field.arrayValue.values.map(getFieldValue)
    if (field.hasOwnProperty('integerValue')) return Number(field.integerValue)
    if (field.hasOwnProperty('booleanValue')) return field.booleanValue
    if (field.hasOwnProperty('timestampValue')) return field.timestampValue
    return null
}

export function fireFetch (doc: string) {
    return fetch(`${uri}${doc}`)
    .then(res => res.json())
    .then(({ documents }) => {
      const docs = (documents || []).map(({ fields }: any) => {
        return Object.keys(fields || {})
        .reduce((acc: any, key: string) => {
          const field = fields[key]
          acc[key] = getFieldValue(field)
          return acc
        }, {})
      })
      return docs
    })
}