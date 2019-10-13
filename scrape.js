const http = require('http')
const fetch = require('node-fetch')
const querystring = require('querystring')
const cheerio = require('cheerio')

const port = 9095

function roundToNearestOrderOfMagnitude (number) {
    const digits = Math.round(Math.log10(number) - 1)
    const magnitude = Math.pow(10, digits)
    return Math.floor(number / magnitude) * magnitude
}

function classListToSelector (classList) {
    return classList.split(' ').reduce((str, c) => {
        if (!c.trim()) return str
        return `${str}.${c.trim()}`
    }, '')
}

async function scrapeContent ({ url, startAt, contentLength }) {
    const document = await fetch(url)
    const htmlContent = await document.text()
    const startIndex = htmlContent.indexOf(startAt)
    if (startIndex === -1) return 'Not found'
    const match = (
        htmlContent
        .slice(0, startIndex)
        .match(/(?<=class=")([a-zA-Z0-9 -]*)(?=")/g)
    )
    if (!match) return 'Selector not found'
    const $ = cheerio.load(htmlContent)
    for (const classList of match.reverse()) {
        console.log(classList)
        const selector = classListToSelector(classList)
        console.log(selector)
        const content = $(selector).text()
        if (
            roundToNearestOrderOfMagnitude(content.length) >=
            roundToNearestOrderOfMagnitude(contentLength)
        ) return $(selector).html()
    }
}

http.createServer(async function server (req, res) {
    try {
        console.log(req.url)
        const query = querystring.parse(req.url.split('?')[1])
        console.log(query)
        const content = await scrapeContent(query)
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write(content)
        res.end()
    } catch (e) {
        console.log(e)
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.write(e.message)
        res.end()
    }
})
.listen(port, (err) => console.log(err || 'Running on ' + port))
