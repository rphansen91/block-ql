const formatDollar = require('./dollar')

describe('Formatted Messenger Dollar', function () {
  test('Is a function', function () {
    expect(typeof formatDollar).toBe('function')
  })

  test('Returns 0 if 0', function () {
    expect(formatDollar(0)).toBe('0')
    expect(formatDollar('0')).toBe('0')
    expect(formatDollar('hello')).toBe('0')
  })

  test('Returns 1 if 1', function () {
    expect(formatDollar(1)).toBe('1')
    expect(formatDollar('1')).toBe('1')
  })

  test('Returns 100.00 if 100', function () {
    expect(formatDollar(100)).toBe('100.00')
    expect(formatDollar('100')).toBe('100.00')
  })

  test('Returns 1.20 if 1.2', function () {
    expect(formatDollar(1.2)).toBe('1.20')
    expect(formatDollar('1.2')).toBe('1.20')
  })

  test('Returns 10,123.20 if 10123.2', function () {
    expect(formatDollar(10123.2)).toBe('10,123.20')
    expect(formatDollar('10123.2')).toBe('10,123.20')
    expect(formatDollar('10,123.2')).toBe('10,123.20')
  })

  test('Returns 10,123,123.20 if 10123123.2', function () {
    expect(formatDollar(10123123.2)).toBe('10,123,123.20')
    expect(formatDollar('10123123.2')).toBe('10,123,123.20')
    expect(formatDollar('10,123,123.2')).toBe('10,123,123.20')
  })

  test('Returns 10,123,123.24 if 10123123.235543', function () {
    expect(formatDollar(10123123.235543)).toBe('10,123,123.24')
    expect(formatDollar('10123123.235543')).toBe('10,123,123.24')
    expect(formatDollar('10,123,123.235543')).toBe('10,123,123.24')
  })
})
