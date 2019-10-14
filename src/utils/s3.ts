import AWS from 'aws-sdk';
import fetch, { Response } from 'node-fetch'
import compressResource from './compress'

const apiVersion = '2006-03-01';
const s3 = new AWS.S3({ apiVersion });
const Bucket = process.env.BUCKET || 'hodlstream-resources'

const store: { [Key: string]: any } = {}

export class Resource<V=any> {
    public maxAge: number = 60 * 60 * 24
    private store: { [Key: string]: Promise<V> } = {}
    async use (Key: string, fn: () => Promise<V>): Promise<V|null> {
        if (this.store[Key]) {
            // Use in memory cache
            console.log(Key, 'Using memory')
            return this.store[Key]
        }

        let response, bucketData, sourceData
        try {
            response = await fetch(`https://s3.amazonaws.com/${Bucket}/${Key}`)
            bucketData = (await response.json()) as any as V
            if (this.maxAge && getResourceTTL(response, this.maxAge) < 0) {
                throw new Error('TTL expired')
            }
            this.set(Key, bucketData)
            console.log(Key, 'Using bucketData')
            return bucketData
        } catch (e) {
            // Cached resource error
            console.log('Cached resource error', Key, e)
        }

        try {
            sourceData = await fn()
            this.set(Key, sourceData)
            await this.save(Key, sourceData)
            console.log(Key, 'Using sourceData')
            return sourceData
        } catch (e) {
            console.log('Source resource error', Key, e)
        }

        if (bucketData) {
            // If we have bucket data use it as final fallback
            console.log(Key, 'Using bucketData fallback')
            return bucketData
        }

        console.log(Key, 'Not found')

        return null
    }
    async save (Key: string, data: V) {
        await compressAndCache(Key, data)
    }
    set (Key: string, data: V) {
        this.store[Key] = Promise.resolve(data)
    }
}

export async function cacheResource (Key: string, Body: string|Buffer, Options: any){
    const params = Object.assign({}, Options, {
        ACL: 'public-read',
        Body, 
        Bucket, 
        Key
    })
    return new Promise((res, rej) => s3.putObject(
        params, 
        (err, data) => err ? rej(err) : res(data)
    ))
}

export function getLocalResource (Key: string) {
    if (store && store[Key]) return store[Key]
    return null
}

function getResourceTTL (res: Response, maxAge: number) {
    const modified = res.headers && res.headers.get('last-modified')
    if (modified) {
        const age = Date.now() - new Date(modified).valueOf()
        const ttl = maxAge - age
        return ttl
    }
    return 0
}

export async function fetchResource (Key: string, maxAge?: number) {
    try {
        if (store && store[Key]) return store[Key]
        const res = await fetch(`https://s3.amazonaws.com/${Bucket}/${Key}`)
        const data = await res.json()
        if (store) store[Key] = data
        return data
    } catch (err) {
        return null
    }
}

export async function compressAndCache (Key: string, data: any) {
    try {
        const Body = await compressResource(JSON.stringify(data))
        await cacheResource(Key, Body, compressedOptions)
    } catch (err) {
        console.log('Error caching resource', Key, err)
    }
}

export const compressedOptions = {
    ContentType: 'application/json',
    ContentEncoding: 'gzip'
}

export default cacheResource