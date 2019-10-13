const printful = require('../printful')
const fireFetch = require('../firebase')

function printfulProducts () {
    return printful('/store/products')
    .then((v) => v.result)
    .catch(e => [])
}

function productsFilter (products, args) {
    if (!args || !args.q) return products
    if (!products || !products.length) return []
    return products.filter((product) => {
        return product.tags && product.tags.includes(args.q)
    })
}

function products (obj, args, context, info) {
    return fireFetch('products')
    .then((products) => productsFilter(products, args))
}

products.prototype.typing = () => 'products(q: String): [Product!]'

module.exports = products
