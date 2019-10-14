import fetch from 'node-fetch'
import { CoinHistoryArgs, Pair } from '../resolvers/types';
import { Resource } from '../utils/s3'
import qs from 'querystring'

export class CryptoCompare {
    historyResource: Resource = new Resource

    async getHistory (symbol: string, { pair, limit }: CoinHistoryArgs): Promise<Pair[]> {
        const cacheKey = `coins/${symbol}/${pair}_history`
        return this.historyResource.use(cacheKey, async () => {
            return this.fetch(symbol, { pair, limit })
        })
    }

    async fetch (symbol: string, { pair, limit }: CoinHistoryArgs): Promise<Pair[]> {
        const res = await fetch('https://min-api.cryptocompare.com/data/histoday?' + qs.stringify({
            aggregate: 1,
            e: 'CCCAGG',
            fsym: symbol.toUpperCase(),
            tsym: (symbol === pair) ? 'USD' : pair.toUpperCase(),
            limit: limit || 365,
            tryConversion: false
        }))
        const data = await res.json()
        if (data && data.Message) {
            throw new Error(data.Message)
        }
        const result: Pair[] = (data.Data || [])
        .filter((d: any) => d)
        .map((d: any) => ({
            value: (symbol === pair) ? 1 : ((d.high + d.low) / 2),
            ts: d.time
        }))
        return result
    }
}