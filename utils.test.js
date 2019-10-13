const { symbolToId, oneWord, isPositive, handleTernary } = require('./utils')

describe('Utils', function () {
  describe('Convert symbol to id', function () {
    test('BTC should return bitcoin', function () {
      return expect(symbolToId('BTC')).resolves.toBe('bitcoin')
    })

    test('LTC should return litecoin', function () {
      return expect(symbolToId('LTC')).resolves.toBe('litecoin')
    })

    test('XAUR should return xaurum', function () {
      return expect(symbolToId('XAUR')).resolves.toBe('xaurum')
    })

    test('ltc should return litecoin', function () {
      return expect(symbolToId('ltc')).resolves.toBe('litecoin')
    })

    test('Xaur should return xaurum', function () {
      return expect(symbolToId('Xaur')).resolves.toBe('xaurum')
    })
  })

  describe('One Word', function () {
    test('undefined', function () {
      return expect(oneWord(undefined)).toBeFalsy()
    })

    test('1', function () {
      return expect(oneWord(1)).toBeFalsy()
    })

    test('Hello World', function () {
      return expect(oneWord('Hello World')).toBeFalsy()
    })

    test('Hello', function () {
      return expect(oneWord('Hello')).toBeTruthy()
    })
  })

  describe('Is Positive', function () {
    test('0', function () {
      expect(isPositive(() => true, () => false)(0)).toBeTruthy()
    })
    test('1', function () {
      expect(isPositive(() => true, () => false)(1)).toBeTruthy()
    })
    test('-1', function () {
      expect(isPositive(() => true, () => false)(-1)).toBeFalsy()
    })
  })
})
