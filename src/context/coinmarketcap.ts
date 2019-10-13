import fetch from 'node-fetch'
import { Coin } from '../resolvers/types';
import { fetchResource, compressAndCache } from '../utils/s3'

const one_hour = 60 * 60 * 1000

export class CoinMarketcap {
    async fetch (pathname: string, opts?: any) {
        const result = await fetch(`https://api.coinmarketcap.com/v1/ticker${pathname}`, opts)
        const data = await result.json()
        if (data && data.error) throw new Error(data.error)
        return data
    }

    async getAll (pair ='USD'): Promise<Coin[]> {
        const cacheKey = `coins/all/${pair}`
        const current = await fetchResource(cacheKey, one_hour)
        if (current) return current
        const allCoins = await this.fetch(`/?convert=${pair}`)
        await compressAndCache(cacheKey, allCoins)
        return allCoins
    }

    async getOne (id: string, pair = 'USD'): Promise<Coin> {
        const cacheKey = `coins/${id}/${pair}`
        const current = await fetchResource(cacheKey, one_hour)
        if (current) return current
        const [coin] = await this.fetch(`/${id}?convert=${pair}`)
        await compressAndCache(cacheKey, coin)
        return coin
    }
}