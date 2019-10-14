import { BlockExplorer } from './blockexplorer';
import { CoinMarketcap } from './coinmarketcap';
import { CryptoCompare } from './cryptocompare';
import { createCheckoutSession } from './stripe';
import { getProducts } from './products';
import { getArticles } from './news';
export declare type IContext = ReturnType<typeof context>;
export declare const context: (request: any) => {
    token: string;
    blockExplorer: BlockExplorer;
    coinMarketcap: CoinMarketcap;
    cryptoCompare: CryptoCompare;
    createCheckoutSession: typeof createCheckoutSession;
    getProducts: typeof getProducts;
    getArticles: typeof getArticles;
};
