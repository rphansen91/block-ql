const { gzip } = require('zlib')

module.exports = (Body) => {
    return new Promise((res, rej) => gzip(
        new Buffer.from(Body), 
        (err, data) => err ? rej(err) : res(data)
    ))
}