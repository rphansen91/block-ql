const { isPositive } = require('../utils')

const rounder = num => Math.round(num * 100) / 100
const formatNum = num => Math.abs(rounder(num))
module.exports = isPositive(v => `(+${formatNum(v)}%)`, v => `(-${formatNum(v)}%)`)
