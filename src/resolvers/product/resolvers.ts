import { QueryResolvers, ProductResolvers } from '../types'
import { IContext } from '../../context'

export const productQuery: QueryResolvers<IContext> = {
  async products(_, args, { getProducts }) {
    return getProducts(args)
  }
}

export const productResolvers: ProductResolvers<IContext> = {
  async session ({
    name,
    amount,
    description,
    images,
    currency = 'usd',
    shippable
}, args, { createCheckoutSession }) {
    const { session } = await createCheckoutSession({
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
    return session
  }
}