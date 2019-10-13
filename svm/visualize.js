const plotly = require('plotly')('rphansen', 'bu9bgfdt7XV5MEDT5Atk')
const { hyphenate } = require('./utils')

function scatter (title, xAxis, yAxis) {
  const graphOptions = {
    layout: {
      title: title,
      xaxis: { title: xAxis, showgrid: false, zeroline: false },
      yaxis: { title: yAxis, showline: false }
    },
    filename: hyphenate(title),
    fileopt: "overwrite"
  }

  return function (data=[], cb) {
    return new Promise(function (res, rej) {
      plotly.plot(data, graphOptions, function (err, data) {
        if (err) return rej(err)
        res(data)
      })
    })
  }
}

function marker (name, color) {
  return {
    x: [],
    y: [],
    mode: "markers",
    type: "scatter",
    name: name,
    marker: {
      color: color,
      size: 12,
      line: {
        color: "white",
        width: 0.5
      }
    }
  }
}

function marker3d (name, color) {
  const m = marker(name, color)
  m.type = "scatter3d"
  m.z = []
  Object.assign(m.marker, {
    symbol: "circle",
    opacity: 0.9
  })
  return m
}


module.exports = {
  scatter,
  marker,
  marker3d
}
