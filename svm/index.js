const fs = require('fs')
const loadData = require('./load')
const normalize = require('./normalize')
const cost = require('./cost')
const predict = require('./predict')
const { scatter, marker3d } = require('./visualize')
const { constant } = require('./utils')
const scatterPlot = scatter('BTC', 'RDP-1', 'RDP-3')
const positive = marker3d('positive', 'green')
const negative = marker3d('negative', 'red')

loadData('BTC', 'BTC')
.then(function (d) {

  const { X } = normalize(d)
  const today = [X[0][X[0].length - 1], X[1][X[1].length - 1]]

  console.log(predict(today), today, d[d.length - 1])
  console.log('TOMORROW WILL BE ' + (predict(today) ? 'UP' : 'DOWN'))

  return normalize(d, true)
})
.then(function ({ X, Y }) {
  const Xtxt = X[0].map((_, i) => X.map(x => x[i]).concat(Y[i]).join(',')).join('\n')
  console.log(__dirname + '/X.csv')
  fs.writeFileSync(__dirname + '/X.csv', Xtxt, 'utf-8')



  // const initial_theta = [0,0,0,0]
  // console.log('\nInitial Cost: ', cost(initial_theta, X, Y))

  return Y.reduce(function (acc, y, i) {
    if (y) {
      acc[0].x.push(X[1][i])
      acc[0].y.push(X[2][i])
      acc[0].z.push(X[3][i])
    } else {
      acc[1].x.push(X[1][i])
      acc[1].y.push(X[2][i])
      acc[1].z.push(X[3][i])
    }
    return acc
  }, [
    positive,
    negative
  ])
})
.then(scatterPlot)
.then(function (d) {
  console.log(d)
  return d
})
.catch(function (err) {
  console.log(err, err.message)
})

module.exports = function () {}
