const cleanFloat = n => parseFloat((n + '').replace(/\,/g, ''))

module.exports = function formatDollar (num) {
  const n = cleanFloat(num)

  if (!n || typeof n !== 'number') return '0'
  if (n === 1) return '1'
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
