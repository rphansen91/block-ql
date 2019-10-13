import { gzip } from 'zlib'

export default (Body: string): Promise<Buffer> => {
    return new Promise((res, rej) => gzip(
        Buffer.from(Body), 
        (err, data) => err ? rej(err) : res(data)
    ))
}