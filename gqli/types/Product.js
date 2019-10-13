function Product () {}

Product.prototype.typing = () => `
type Product {
	name: String!
	amount: Int!
	description: String!
	images: [String!]
	currency: String
    session: String
    shippable: Boolean
}
`

Product.session = function ({
    name,
    amount,
    description,
    images,
    currency = 'usd',
    shippable
}, args, { createCheckoutSession }) {
    return createCheckoutSession({
        billing_address_collection: shippable,
        line_items: [{
            name,
            amount,
            description,
            images,
            currency,
            quantity: 1
        }]
    })
    .then(({ session }) => session)
}

module.exports = Product