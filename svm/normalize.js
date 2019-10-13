const stats = require('math-stats')
const { take, sorter, maximum, minimum, pluck, display } = require('./utils')
const pairs = take(2)
const trips = take(3)
const quads = take(4)

function percentChange (prev, curr) {
  return (curr - prev) / prev
}

function normalize (name, arr) {
  const max = maximum(arr)
  const min = minimum(arr)
  const norm =  arr.map(function (value) {
    return (value - min) / (max - min)
  })

  display({
    name,
    min, max,
    length: arr.length,
    norm_max: maximum(norm),
    norm_min: minimum(norm)
  })

  return norm
}

function zScore (name, arr) {
  const mean = stats.mean(arr)
  const sd = stats.standardDeviation(arr)
  const zscore =  arr.map(function (value) {
    return (value - mean) / sd
  })

  display({
    name, mean, sd,
    length: arr.length,
    zscore_max: maximum(zscore),
    zscore_min: minimum(zscore)
  })

  return zscore
}

function featuresUnlabeled (a, b, c) {
  return {
    delta_1: percentChange(b['close'], c['close']) * 100,
    delta_2: percentChange(a['close'], c['close']) * 100,
    volume: c['volumeto']
  }
}

function featuresLabeled (a, b, c, d) {
  const f = featuresUnlabeled(a, b, c)
  f.y = c['close'] <= d['close'] ? 1 : 0
  return f
}

module.exports = function (data=[], label=false) {
  if (data.length < 5) throw new Error('Data length must be larger than 4')

  const sorted = data.sort(sorter('time'))
  const features = label ? quads(featuresLabeled, sorted) : trips(featuresUnlabeled, sorted)

  const X = [
    normalize('delta_1', features.map(pluck('delta_1'))),
    normalize('delta_2' ,features.map(pluck('delta_2'))),
    // normalize('volume', features.map(pluck('volume'))),
  ]

  const Y = features.map(pluck('y'))
  return { X, Y }
}
