const { createCheckoutSession } = require('../resource/stripe')
const cacheFetch = require('./cacheFetch')

function getAllCoins (pair='USD') {
    return cacheFetch(`https://api.coinmarketcap.com/v1/ticker/?convert=${pair}`)
}

async function getOneCoin (id, pair='USD') {
    const coins = await getAllCoins(pair)
    const coin = (coins || []).find(coin => coin.id === id || coin.name.toLowerCase() === id.toLowerCase())
    if (!coin) return cacheFetch(`https://api.coinmarketcap.com/v1/ticker/${id}?convert=${pair}`)
    return coin
}

function getContext () {
    return {
        createCheckoutSession,
        getAllCoins,
        getOneCoin
    }
}

module.exports = {
    getContext
}