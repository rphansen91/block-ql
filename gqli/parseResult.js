module.exports = function parser (name='') {
  return function (res) {
    return Promise.resolve()
    .then(() => res.text())
    .then(text => new Promise(resolve => {
      try {
        resolve(JSON.parse(text))
      } catch (err) {
        console.log(err, text)
        const message = [name, text].filter(v => v).join(': ')
        throw new Error(message)
      }
    }))
    .then(data => {
      if (data && data.error) throw new Error(data.error)
      return data
    })
  }
}
