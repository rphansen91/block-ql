import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_qZRfLsFYmSfIUUhTAZyzL5K8')
const success_url = process.env.STRIPE_SUCCESS_URL || 'https://hodlstream.com/success'
const cancel_url = process.env.STRIPE_CANCEL_URL || 'https://hodlstream.com/shop'

export function createCheckoutSession ({ 
    billing_address_collection, 
    payment_method_types = ["card"], 
    line_items 
}: any) {
    const variables: Stripe.checkouts.sessions.ICheckoutCreationOptions = {
		payment_method_types,
		line_items,
		success_url,
		cancel_url,
    }
    if (billing_address_collection) {
        variables['billing_address_collection'] = 'required'
    }
	return stripe.checkout.sessions.create(variables)
	.then(({ id }) => ({ session: id }));
}