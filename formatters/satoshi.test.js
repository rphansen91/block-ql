const formatSatoshi = require('./satoshi')

describe('Formatted Messenger Satoshi', function () {
  test('Is a function', function () {
    expect(typeof formatSatoshi).toBe('function')
  })

  test('Returns 0 if 0', function () {
    expect(formatSatoshi(0)).toBe('0')
    expect(formatSatoshi('0')).toBe('0')
    expect(formatSatoshi('hello')).toBe('0')
  })

  test('Returns 1 if 1', function () {
    expect(formatSatoshi(1)).toBe('1')
    expect(formatSatoshi('1')).toBe('1')
  })

  test('Returns 0.34 if 0.34000000', function () {
    expect(formatSatoshi(0.34)).toBe('0.34000000')
    expect(formatSatoshi('0.34')).toBe('0.34000000')
  })

  test('Returns 0.024 if 0.02400000', function () {
    expect(formatSatoshi(0.024)).toBe('0.02400000')
    expect(formatSatoshi('0.024')).toBe('0.02400000')
  })

  test('Returns 0.00000970 if 0.00000970', function () {
    expect(formatSatoshi(0.00000970)).toBe('0.00000970')
    expect(formatSatoshi('0.00000970')).toBe('0.00000970')
  })
})
