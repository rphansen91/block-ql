import { BlockExplorer } from './blockexplorer';
import { CoinMarketcap } from './coinmarketcap';
import { CryptoCompare } from './cryptocompare';
import { createCheckoutSession } from './stripe';
import { getProducts } from './products'
import { getArticles } from './news'

export type IContext = ReturnType<typeof context>

const blockExplorer = new BlockExplorer
const coinMarketcap = new CoinMarketcap
const cryptoCompare = new CryptoCompare

export const context = (request: any) => ({
  token: '',
  blockExplorer,
  coinMarketcap,
  cryptoCompare,
  createCheckoutSession,
  getProducts,
  getArticles
})