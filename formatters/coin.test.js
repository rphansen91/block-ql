const formatCoin = require('./coin')
const coin = require('../gqli/query/coin')

const mockBTC = {
  id: 'bitcoin',
  name: 'Bitcoin',
  symbol: 'BTC',
  price_usd: 100,
  price_btc: 1,
  percent_change_24h: 1.2
}

const logjson = () => c => {
  console.log(JSON.stringify(c, null, 2))
  return c
}


describe('Formatted Messenger Coin', function () {
  test('Is a function', function () {
    expect(typeof formatCoin).toBe('function')
  })

  test('Returns undefined if given undefined', function () {
    expect(formatCoin()).toBeUndefined()
  })

  test('Returns generic template', function () {
    const { attachment } = formatCoin(mockBTC)
    const { payload: { template_type } } = attachment
    expect(template_type).toBe("generic")
  })

  describe('Integration', function () {

    const coin$ = coin({}, { id: 'BTC' })
    const payload$ = coin$.then(formatCoin).then(({ attachment: { payload } }) => payload)
    const elementOne$ = payload$.then(({ elements }) => elements[0])

    test('Returns generic template', function () {
      return payload$.then(({ template_type }) => {
        expect(template_type).toBe("generic")
      })
    })

    test('Finds the correct coin', function () {
      return elementOne$.then(({ title }) => {
        expect(title.indexOf('Bitcoin')).toBe(0)
      })
    })

    test('Adds USD value', function () {
      return elementOne$.then(({ subtitle }) => {
        expect(subtitle.indexOf('USD')).toBeGreaterThan(-1)
      })
    })

    test('Adds Satoshi value', function () {
      return elementOne$.then(({ subtitle }) => {
        expect(subtitle.indexOf('BTC')).toBeGreaterThan(-1)
      })
    })
  })
})
