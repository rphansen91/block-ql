import { Address, AddressValid, Block, Transaction, Unspent } from '../resolvers/types';
export declare class BlockExplorer {
    fetch(pathname: string, opts?: any): Promise<any>;
    address(addr: string): Promise<Address | null>;
    addressValid(addr: string): Promise<AddressValid | null>;
    block(hash: string): Promise<Block | null>;
    blockIndex(height: number): Promise<Block | null>;
    transaction(txid: string): Promise<Transaction>;
    unspent(addr: string): Promise<Unspent[]>;
    send(rawtx: string): Promise<Transaction>;
}
