import { Coin } from '../resolvers/types';
export declare class CoinMarketcap {
    private coinsResource;
    fetch(pathname: string, opts?: any): Promise<any>;
    getAll(pair?: string): Promise<Coin[]>;
    getOne(id: string, pair?: string): Promise<Coin>;
}
