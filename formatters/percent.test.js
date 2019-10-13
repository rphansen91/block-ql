const formatPercent = require('./percent')

describe('Formatted Messenger Percent', function () {
  test('Is a function', function () {
    expect(typeof formatPercent).toBe('function')
  })
  test('0', function () {
    expect(formatPercent(0)).toBe('(+0%)')
  })
  test('1', function () {
    expect(formatPercent(1)).toBe('(+1%)')
  })
  test('-1', function () {
    expect(formatPercent(-1)).toBe('(-1%)')
  })
  test('10.24', function () {
    expect(formatPercent(10.236)).toBe('(+10.24%)')
  })
  test('-100.24', function () {
    expect(formatPercent(-100.24)).toBe('(-100.24%)')
  })
  test('-1.21', function () {
    expect(formatPercent(-1.21304)).toBe('(-1.21%)')
  })
})
