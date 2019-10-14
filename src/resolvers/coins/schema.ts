import gql from 'graphql-tag'

export default gql`
  type Pair {
    ts: Int
    value: Float
  }

  type Coin {
    id: String
    name: String
    symbol: String
    rank: Int
    price_usd: Float
    price_btc: Float
    daily_volume_usd: Float
    market_cap_usd: Float
    available_supply: Float
    total_supply: Float
    max_supply: Float
    percent_change_1h: Float
    percent_change_24h: Float
    percent_change_7d: Float
    last_updated: Float
    history(pair: String!, limit: Int): [Pair]
    images: [String]
    articles: [Article]
  }

  type Query {
    coin(id: String!, pair: String): Coin
    coins(ids: [String!], pair: String): [Coin]
    all_coins(pair: String): [Coin]
  }
`
