const fetch = require('node-fetch')
const apiKey = new Buffer(process.env.PRINTFUL_API_KEY || '46thpmix-asgj-lqzn:7pvm-0hsu2sotihvi').toString('base64')
const uri = 'https://api.printful.com'

module.exports = function printful (path) {
    return fetch(`${uri}${path}`, {
        headers: {
            Authorization: `Basic ${apiKey}`
        }
    }).then(res => res.json())
}