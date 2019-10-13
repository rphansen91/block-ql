const pretty = require('prettyjson')

function sigmoid (x) {
  return 1 / (1 + Math.exp(-x))
}

function round (x) {
  return Math.round(x)
}

function sum (a, b) {
  return a + b
}

function product (vector1, vector2) {
  return vector1.map(function (x, i) {
    return x * vector2[i]
  })
  .reduce(sum, 0)
}

function pipe (val, fns) {
  return fns.reduce(function (v, fn) {
    return fn(v)
  }, val)
}

function constant (v) {
  return function () {
    return v
  }
}

function take (num) {
  return function pairs (fn, arr=[]) {
    return arr.reduce(function (acc, curr, i) {
      if (i < num - 1) return acc
      return acc.concat(fn.apply(null, arr.slice(i - num + 1, i + 1)))
    }, [])
  }
}

function sorter (key, inc=1) {
  return function (a, b) {
    return (a[key] - b[key]) * inc
  }
}

function pluck (key) {
  return function (obj) {
    return obj[key]
  }
}

function maximum (arr) {
  return Math.max.apply(Math, arr)
}

function minimum (arr) {
  return Math.min.apply(Math, arr)
}

function hyphenate (str) {
  return str.replace(/\ /g, '-').toLowerCase()
}

function display (obj) {
  console.log(pretty.render(obj) + '\n')
}

module.exports = {
  sigmoid,
  round,
  sum,
  product,
  pipe,
  constant,
  take,
  sorter,
  pluck,
  maximum,
  minimum,
  hyphenate,
  display
}
