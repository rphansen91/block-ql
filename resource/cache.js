const AWS = require('aws-sdk');
const fetch = require('node-fetch');

const apiVersion = '2006-03-01';
const s3 = new AWS.S3({ apiVersion });

module.exports = (Bucket, Key, Body, Options) => {
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

module.exports.compressedOptions = {
    ContentType: 'application/json',
    ContentEncoding: 'gzip'
}