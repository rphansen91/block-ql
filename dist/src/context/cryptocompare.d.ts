import { CoinHistoryArgs, Pair } from '../resolvers/types';
import { Resource } from '../utils/s3';
export declare class CryptoCompare {
    historyResource: Resource;
    getHistory(symbol: string, { pair, limit }: CoinHistoryArgs): Promise<Pair[]>;
    fetch(symbol: string, { pair, limit }: CoinHistoryArgs): Promise<Pair[]>;
}
