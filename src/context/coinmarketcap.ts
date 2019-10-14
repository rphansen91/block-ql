import fetch from 'node-fetch'
import { Coin } from '../resolvers/types';
import { Resource } from '../utils/s3'

export class CoinMarketcap {
    private coinsResource: Resource = new Resource

    async fetch (pathname: string, opts?: any) {
        const result = await fetch(`https://api.coinmarketcap.com/v1/ticker${pathname}`, opts)
        const data = await result.json()
        if (data && data.error) throw new Error(data.error)
        return data
    }

    async getAll (pair ='USD'): Promise<Coin[]> {
        const cacheKey = `coins/all/${pair}`
        return this.coinsResource.use(
            cacheKey, 
            () => this.fetch(`/?convert=${pair}`)
        )
    }

    async getOne (id: string, pair = 'USD'): Promise<Coin> {
        const cacheKey = `coins/${id}/${pair}`
        return this.coinsResource.use(cacheKey, async () => {
            const [coin] = await this.fetch(`/${id}?convert=${pair}`)
            return coin
        })
    }
}