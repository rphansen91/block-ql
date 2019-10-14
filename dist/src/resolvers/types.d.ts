import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export declare type Maybe<T> = T | null;
export declare type RequireFields<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    JSON: any;
};
export declare type Address = {
    __typename?: 'Address';
    addrStr?: Maybe<Scalars['String']>;
    balance?: Maybe<Scalars['Int']>;
    balanceSat?: Maybe<Scalars['Int']>;
    totalReceived?: Maybe<Scalars['Int']>;
    totalReceivedSat?: Maybe<Scalars['Int']>;
    totalSent?: Maybe<Scalars['Int']>;
    totalSentSat?: Maybe<Scalars['Int']>;
    unconfirmedBalance?: Maybe<Scalars['Int']>;
    unconfirmedBalanceSat?: Maybe<Scalars['Int']>;
    unconfirmedTxApperances?: Maybe<Scalars['Int']>;
    txApperances?: Maybe<Scalars['Int']>;
    tx?: Maybe<Array<Maybe<Transaction>>>;
    txCount?: Maybe<Scalars['Int']>;
    unspent?: Maybe<Array<Maybe<Unspent>>>;
};
export declare type AddressTxArgs = {
    limit?: Maybe<Scalars['Int']>;
    skip?: Maybe<Scalars['Int']>;
};
export declare type AddressUnspentArgs = {
    limit?: Maybe<Scalars['Int']>;
    skip?: Maybe<Scalars['Int']>;
};
export declare type AddressValid = {
    __typename?: 'AddressValid';
    isValid?: Maybe<Scalars['Boolean']>;
};
export declare type Article = {
    __typename?: 'Article';
    id: Scalars['String'];
    source?: Maybe<ArticleSource>;
    author?: Maybe<Scalars['String']>;
    title?: Maybe<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    htmlContent?: Maybe<Scalars['String']>;
    content?: Maybe<Scalars['String']>;
    url?: Maybe<Scalars['String']>;
    urlToImage?: Maybe<Scalars['String']>;
    publishedAt?: Maybe<Scalars['String']>;
    isActive?: Maybe<Scalars['Boolean']>;
};
export declare type ArticleSource = {
    __typename?: 'ArticleSource';
    id?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
};
export declare type Block = {
    __typename?: 'Block';
    hash?: Maybe<Scalars['String']>;
    size?: Maybe<Scalars['Int']>;
    height?: Maybe<Scalars['Int']>;
    version?: Maybe<Scalars['Int']>;
    merkleroot?: Maybe<Scalars['String']>;
    tx?: Maybe<Array<Maybe<Transaction>>>;
    txCount?: Maybe<Scalars['Int']>;
    time?: Maybe<Scalars['Int']>;
    nonce?: Maybe<Scalars['Int']>;
    bits?: Maybe<Scalars['String']>;
    difficulty?: Maybe<Scalars['Int']>;
    chainwork?: Maybe<Scalars['String']>;
    confirmations?: Maybe<Scalars['Int']>;
    previousblockhash?: Maybe<Scalars['String']>;
    nextblockhash?: Maybe<Scalars['String']>;
    reward?: Maybe<Scalars['Int']>;
};
export declare type BlockTxArgs = {
    limit?: Maybe<Scalars['Int']>;
    skip?: Maybe<Scalars['Int']>;
};
export declare type Coin = {
    __typename?: 'Coin';
    id?: Maybe<Scalars['String']>;
    name?: Maybe<Scalars['String']>;
    symbol?: Maybe<Scalars['String']>;
    rank?: Maybe<Scalars['Int']>;
    price_usd?: Maybe<Scalars['Float']>;
    price_btc?: Maybe<Scalars['Float']>;
    daily_volume_usd?: Maybe<Scalars['Float']>;
    market_cap_usd?: Maybe<Scalars['Float']>;
    available_supply?: Maybe<Scalars['Float']>;
    total_supply?: Maybe<Scalars['Float']>;
    max_supply?: Maybe<Scalars['Float']>;
    percent_change_1h?: Maybe<Scalars['Float']>;
    percent_change_24h?: Maybe<Scalars['Float']>;
    percent_change_7d?: Maybe<Scalars['Float']>;
    last_updated?: Maybe<Scalars['Float']>;
    history?: Maybe<Array<Maybe<Pair>>>;
    images?: Maybe<Array<Maybe<Scalars['String']>>>;
    articles?: Maybe<Array<Maybe<Article>>>;
};
export declare type CoinHistoryArgs = {
    pair: Scalars['String'];
    limit?: Maybe<Scalars['Int']>;
};
export declare type Exchange = {
    __typename?: 'Exchange';
    name?: Maybe<Scalars['String']>;
    balance?: Maybe<Array<Maybe<ExchangeBalance>>>;
    txs?: Maybe<Array<Maybe<ExchangeTx>>>;
};
export declare type ExchangeBalanceArgs = {
    apikey?: Maybe<Scalars['String']>;
    apisecret?: Maybe<Scalars['String']>;
};
export declare type ExchangeTxsArgs = {
    apikey?: Maybe<Scalars['String']>;
    apisecret?: Maybe<Scalars['String']>;
};
export declare type ExchangeBalance = {
    __typename?: 'ExchangeBalance';
    Currency?: Maybe<Scalars['String']>;
    Balance?: Maybe<Scalars['Float']>;
    Available?: Maybe<Scalars['Float']>;
    Pending?: Maybe<Scalars['Float']>;
};
export declare type ExchangeTx = {
    __typename?: 'ExchangeTx';
    coin?: Maybe<Scalars['String']>;
    symbol?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['Int']>;
    value?: Maybe<Scalars['Float']>;
};
export declare type Mutation = {
    __typename?: 'Mutation';
    empty?: Maybe<Scalars['String']>;
    send?: Maybe<Transaction>;
};
export declare type MutationSendArgs = {
    rawtx: Scalars['String'];
};
export declare type Pagination = {
    perPage?: Maybe<Scalars['Int']>;
    page?: Maybe<Scalars['Int']>;
};
export declare type Pair = {
    __typename?: 'Pair';
    ts?: Maybe<Scalars['Int']>;
    value?: Maybe<Scalars['Float']>;
};
export declare type Product = {
    __typename?: 'Product';
    name: Scalars['String'];
    amount: Scalars['Int'];
    description: Scalars['String'];
    images?: Maybe<Array<Scalars['String']>>;
    currency?: Maybe<Scalars['String']>;
    session?: Maybe<Scalars['String']>;
    shippable?: Maybe<Scalars['Boolean']>;
    tags?: Maybe<Array<Scalars['String']>>;
};
export declare type Query = {
    __typename?: 'Query';
    address?: Maybe<Address>;
    addressValid?: Maybe<AddressValid>;
    unspent?: Maybe<Array<Maybe<Unspent>>>;
    block?: Maybe<Block>;
    blockIndex?: Maybe<Block>;
    coin?: Maybe<Coin>;
    coins?: Maybe<Array<Maybe<Coin>>>;
    all_coins?: Maybe<Array<Maybe<Coin>>>;
    exchange?: Maybe<Exchange>;
    article?: Maybe<Article>;
    news?: Maybe<Array<Maybe<Article>>>;
    products?: Maybe<Array<Product>>;
    empty?: Maybe<Scalars['String']>;
    transaction?: Maybe<Transaction>;
};
export declare type QueryAddressArgs = {
    addr: Scalars['String'];
};
export declare type QueryAddressValidArgs = {
    addr: Scalars['String'];
};
export declare type QueryUnspentArgs = {
    addr: Scalars['String'];
};
export declare type QueryBlockArgs = {
    hash: Scalars['String'];
};
export declare type QueryBlockIndexArgs = {
    height: Scalars['Int'];
};
export declare type QueryCoinArgs = {
    id: Scalars['String'];
    pair?: Maybe<Scalars['String']>;
};
export declare type QueryCoinsArgs = {
    ids?: Maybe<Array<Scalars['String']>>;
    pair?: Maybe<Scalars['String']>;
};
export declare type QueryAll_CoinsArgs = {
    pair?: Maybe<Scalars['String']>;
};
export declare type QueryExchangeArgs = {
    name: Scalars['String'];
};
export declare type QueryArticleArgs = {
    id: Scalars['String'];
};
export declare type QueryNewsArgs = {
    q?: Maybe<Scalars['String']>;
    sortBy?: Maybe<Scalars['String']>;
    from?: Maybe<Scalars['String']>;
};
export declare type QueryProductsArgs = {
    q?: Maybe<Scalars['String']>;
};
export declare type QueryTransactionArgs = {
    txid: Scalars['String'];
};
export declare type Send = {
    __typename?: 'Send';
    txid?: Maybe<Scalars['String']>;
};
export declare type Sort = {
    field?: Maybe<Scalars['String']>;
    order?: Maybe<Scalars['Int']>;
};
export declare type Transaction = {
    __typename?: 'Transaction';
    txid?: Maybe<Scalars['String']>;
    version?: Maybe<Scalars['String']>;
    locktime?: Maybe<Scalars['Int']>;
    blockhash?: Maybe<Scalars['String']>;
    blockheight?: Maybe<Scalars['Int']>;
    confirmations?: Maybe<Scalars['Int']>;
    time?: Maybe<Scalars['Int']>;
    blocktime?: Maybe<Scalars['Int']>;
    valueOut?: Maybe<Scalars['Float']>;
    size?: Maybe<Scalars['Float']>;
    fees?: Maybe<Scalars['Float']>;
};
export declare type Unspent = {
    __typename?: 'Unspent';
    address?: Maybe<Scalars['String']>;
    txid?: Maybe<Scalars['String']>;
    vout?: Maybe<Scalars['Float']>;
    scriptPubKey?: Maybe<Scalars['String']>;
    amount?: Maybe<Scalars['Float']>;
    satoshis?: Maybe<Scalars['Int']>;
    height?: Maybe<Scalars['Int']>;
    confirmations?: Maybe<Scalars['Int']>;
};
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type StitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | StitchingResolver<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = {
    Query: ResolverTypeWrapper<{}>;
    String: ResolverTypeWrapper<Scalars['String']>;
    Address: ResolverTypeWrapper<Address>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    Transaction: ResolverTypeWrapper<Transaction>;
    Float: ResolverTypeWrapper<Scalars['Float']>;
    Unspent: ResolverTypeWrapper<Unspent>;
    AddressValid: ResolverTypeWrapper<AddressValid>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    Block: ResolverTypeWrapper<Block>;
    Coin: ResolverTypeWrapper<Coin>;
    Pair: ResolverTypeWrapper<Pair>;
    Article: ResolverTypeWrapper<Article>;
    ArticleSource: ResolverTypeWrapper<ArticleSource>;
    Exchange: ResolverTypeWrapper<Exchange>;
    ExchangeBalance: ResolverTypeWrapper<ExchangeBalance>;
    ExchangeTx: ResolverTypeWrapper<ExchangeTx>;
    Product: ResolverTypeWrapper<Product>;
    Mutation: ResolverTypeWrapper<{}>;
    JSON: ResolverTypeWrapper<Scalars['JSON']>;
    Pagination: Pagination;
    Sort: Sort;
    Send: ResolverTypeWrapper<Send>;
};
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = {
    Query: {};
    String: Scalars['String'];
    Address: Address;
    Int: Scalars['Int'];
    Transaction: Transaction;
    Float: Scalars['Float'];
    Unspent: Unspent;
    AddressValid: AddressValid;
    Boolean: Scalars['Boolean'];
    Block: Block;
    Coin: Coin;
    Pair: Pair;
    Article: Article;
    ArticleSource: ArticleSource;
    Exchange: Exchange;
    ExchangeBalance: ExchangeBalance;
    ExchangeTx: ExchangeTx;
    Product: Product;
    Mutation: {};
    JSON: Scalars['JSON'];
    Pagination: Pagination;
    Sort: Sort;
    Send: Send;
};
export declare type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
    addrStr?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    balance?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    balanceSat?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    totalReceived?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    totalReceivedSat?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    totalSent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    totalSentSat?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    unconfirmedBalance?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    unconfirmedBalanceSat?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    unconfirmedTxApperances?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    txApperances?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    tx?: Resolver<Maybe<Array<Maybe<ResolversTypes['Transaction']>>>, ParentType, ContextType, AddressTxArgs>;
    txCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    unspent?: Resolver<Maybe<Array<Maybe<ResolversTypes['Unspent']>>>, ParentType, ContextType, AddressUnspentArgs>;
};
export declare type AddressValidResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressValid'] = ResolversParentTypes['AddressValid']> = {
    isValid?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
};
export declare type ArticleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = {
    id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    source?: Resolver<Maybe<ResolversTypes['ArticleSource']>, ParentType, ContextType>;
    author?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    htmlContent?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    urlToImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    publishedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    isActive?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
};
export declare type ArticleSourceResolvers<ContextType = any, ParentType extends ResolversParentTypes['ArticleSource'] = ResolversParentTypes['ArticleSource']> = {
    id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};
export declare type BlockResolvers<ContextType = any, ParentType extends ResolversParentTypes['Block'] = ResolversParentTypes['Block']> = {
    hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    version?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    merkleroot?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    tx?: Resolver<Maybe<Array<Maybe<ResolversTypes['Transaction']>>>, ParentType, ContextType, BlockTxArgs>;
    txCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    nonce?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    bits?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    difficulty?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    chainwork?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    confirmations?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    previousblockhash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    nextblockhash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    reward?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};
export declare type CoinResolvers<ContextType = any, ParentType extends ResolversParentTypes['Coin'] = ResolversParentTypes['Coin']> = {
    id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    rank?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    price_usd?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    price_btc?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    daily_volume_usd?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    market_cap_usd?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    available_supply?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    total_supply?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    max_supply?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    percent_change_1h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    percent_change_24h?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    percent_change_7d?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    last_updated?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    history?: Resolver<Maybe<Array<Maybe<ResolversTypes['Pair']>>>, ParentType, ContextType, RequireFields<CoinHistoryArgs, 'pair'>>;
    images?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
    articles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Article']>>>, ParentType, ContextType>;
};
export declare type ExchangeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Exchange'] = ResolversParentTypes['Exchange']> = {
    name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    balance?: Resolver<Maybe<Array<Maybe<ResolversTypes['ExchangeBalance']>>>, ParentType, ContextType, ExchangeBalanceArgs>;
    txs?: Resolver<Maybe<Array<Maybe<ResolversTypes['ExchangeTx']>>>, ParentType, ContextType, ExchangeTxsArgs>;
};
export declare type ExchangeBalanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExchangeBalance'] = ResolversParentTypes['ExchangeBalance']> = {
    Currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    Balance?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    Available?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    Pending?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};
export declare type ExchangeTxResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExchangeTx'] = ResolversParentTypes['ExchangeTx']> = {
    coin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    createdAt?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    value?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};
export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
    name: 'JSON';
}
export declare type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
    empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    send?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<MutationSendArgs, 'rawtx'>>;
};
export declare type PairResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pair'] = ResolversParentTypes['Pair']> = {
    ts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    value?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};
export declare type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
    name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    images?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
    currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    session?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    shippable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
    tags?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
};
export declare type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
    address?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<QueryAddressArgs, 'addr'>>;
    addressValid?: Resolver<Maybe<ResolversTypes['AddressValid']>, ParentType, ContextType, RequireFields<QueryAddressValidArgs, 'addr'>>;
    unspent?: Resolver<Maybe<Array<Maybe<ResolversTypes['Unspent']>>>, ParentType, ContextType, RequireFields<QueryUnspentArgs, 'addr'>>;
    block?: Resolver<Maybe<ResolversTypes['Block']>, ParentType, ContextType, RequireFields<QueryBlockArgs, 'hash'>>;
    blockIndex?: Resolver<Maybe<ResolversTypes['Block']>, ParentType, ContextType, RequireFields<QueryBlockIndexArgs, 'height'>>;
    coin?: Resolver<Maybe<ResolversTypes['Coin']>, ParentType, ContextType, RequireFields<QueryCoinArgs, 'id'>>;
    coins?: Resolver<Maybe<Array<Maybe<ResolversTypes['Coin']>>>, ParentType, ContextType, QueryCoinsArgs>;
    all_coins?: Resolver<Maybe<Array<Maybe<ResolversTypes['Coin']>>>, ParentType, ContextType, QueryAll_CoinsArgs>;
    exchange?: Resolver<Maybe<ResolversTypes['Exchange']>, ParentType, ContextType, RequireFields<QueryExchangeArgs, 'name'>>;
    article?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<QueryArticleArgs, 'id'>>;
    news?: Resolver<Maybe<Array<Maybe<ResolversTypes['Article']>>>, ParentType, ContextType, QueryNewsArgs>;
    products?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType, QueryProductsArgs>;
    empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    transaction?: Resolver<Maybe<ResolversTypes['Transaction']>, ParentType, ContextType, RequireFields<QueryTransactionArgs, 'txid'>>;
};
export declare type SendResolvers<ContextType = any, ParentType extends ResolversParentTypes['Send'] = ResolversParentTypes['Send']> = {
    txid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};
export declare type TransactionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Transaction'] = ResolversParentTypes['Transaction']> = {
    txid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    locktime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    blockhash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    blockheight?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    confirmations?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    time?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    blocktime?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    valueOut?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    size?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    fees?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};
export declare type UnspentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Unspent'] = ResolversParentTypes['Unspent']> = {
    address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    txid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    vout?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    scriptPubKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
    amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
    satoshis?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
    confirmations?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};
export declare type Resolvers<ContextType = any> = {
    Address?: AddressResolvers<ContextType>;
    AddressValid?: AddressValidResolvers<ContextType>;
    Article?: ArticleResolvers<ContextType>;
    ArticleSource?: ArticleSourceResolvers<ContextType>;
    Block?: BlockResolvers<ContextType>;
    Coin?: CoinResolvers<ContextType>;
    Exchange?: ExchangeResolvers<ContextType>;
    ExchangeBalance?: ExchangeBalanceResolvers<ContextType>;
    ExchangeTx?: ExchangeTxResolvers<ContextType>;
    JSON?: GraphQLScalarType;
    Mutation?: MutationResolvers<ContextType>;
    Pair?: PairResolvers<ContextType>;
    Product?: ProductResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    Send?: SendResolvers<ContextType>;
    Transaction?: TransactionResolvers<ContextType>;
    Unspent?: UnspentResolvers<ContextType>;
};
/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export declare type IResolvers<ContextType = any> = Resolvers<ContextType>;
