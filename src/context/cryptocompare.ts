import fetch from 'node-fetch'
import { CoinHistoryArgs, Pair } from '../resolvers/types';
import { fetchResource, compressAndCache } from '../utils/s3'
import qs from 'querystring'

const one_hour = 60 * 60 * 1000

export class CryptoCompare {
    async getHistory (symbol: string, { pair, limit }: CoinHistoryArgs): Promise<Pair[]> {
        const cacheKey = `coins/${symbol}/${pair}_history`
        const current = await fetchResource(cacheKey, one_hour)
        if (current) return current
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
        await compressAndCache(cacheKey, result)
        return result
    }
}