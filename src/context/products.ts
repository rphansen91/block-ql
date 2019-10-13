import { fireFetch } from '../utils/firebase'
import { Product, QueryProductsArgs } from '../resolvers/types';

function productsFilter (products: Product[], args: QueryProductsArgs): Product[] {
    if (!args || !args.q) return products
    if (!products || !products.length) return []
    return products.filter((product) => {
        return product.tags && args.q && product.tags.includes(args.q)
    })
}

export async function getProducts (args: QueryProductsArgs): Promise<Product[]> {
    const products = await fireFetch('products')
    return productsFilter(products, args)
}
