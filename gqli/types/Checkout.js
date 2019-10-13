function Checkout () {}

Checkout.prototype.typing = () =>
`
input LineItemInput {
	name: String!
	amount: Int!
	description: String!
	images: [String!] = []
	currency: String = "usd"
	quantity: Int = 1
}

type CheckoutSession {
	session: String
}

type Checkout {
	session(
		billing_address_collection: String
		payment_method_types: [String!] = ["card"]
		line_items: [LineItemInput!]
	): CheckoutSession
}`

Checkout.session = function (
	_, 
	{ billing_address_collection, payment_method_types, line_items },
	{ createCheckoutSession }
) {
	return createCheckoutSession({
		billing_address_collection,
		payment_method_types,
		line_items
	})
}

module.exports = Checkout