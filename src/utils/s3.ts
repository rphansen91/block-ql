import AWS from 'aws-sdk';
import fetch from 'node-fetch'
import compressResource from './compress'

const apiVersion = '2006-03-01';
const s3 = new AWS.S3({ apiVersion });
const Bucket = process.env.BUCKET || 'hodlstream-resources'

const store: { [key: string]: any } = {}

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

export async function fetchResource (Key: string, maxAge?: number) {
    try {
        if (store && store[Key]) return store[Key]
        const res = await fetch(`https://s3.amazonaws.com/${Bucket}/${Key}`)
        const modified = res.headers.get('last-modified')
        if (maxAge && modified) {
            const age = Date.now() - new Date(modified).valueOf()
            const ttl = maxAge - age
            console.log({ modified, age, ttl })
            if (age > maxAge) return null
        }
        const data = await res.json()
        if (store) {
            store[Key] = data
        }
        return data
    } catch (err) {
        return null
    }
}

export async function compressAndCache (Key: string, data: any) {
    try {
        store[Key] = data
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