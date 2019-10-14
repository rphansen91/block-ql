/// <reference types="node" />
export declare class Resource<V = any> {
    maxAge: number;
    private store;
    use(Key: string, fn: () => Promise<V>): Promise<V | null>;
    save(Key: string, data: V): Promise<void>;
    set(Key: string, data: V): void;
}
export declare function cacheResource(Key: string, Body: string | Buffer, Options: any): Promise<unknown>;
export declare function getLocalResource(Key: string): any;
export declare function fetchResource(Key: string, maxAge?: number): Promise<any>;
export declare function compressAndCache(Key: string, data: any): Promise<void>;
export declare const compressedOptions: {
    ContentType: string;
    ContentEncoding: string;
};
export default cacheResource;
