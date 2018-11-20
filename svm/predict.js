const { sigmoid, round, sum, product, pipe } = require('./utils')

function predict (theta) {
  const cost = product.bind(null, theta)
  return function model (x) {
    return pipe([1].concat(x), [
      cost,
      sigmoid,
      round
    ])
  }
}

module.exports = predict([0.98460, 0.69090, -2.09003])
