import { Article, QueryNewsArgs } from '../resolvers/types';
export declare function fetchCachedArticles(): Promise<Article[]>;
export declare function getArticles(args: QueryNewsArgs): Promise<Article[]>;
export declare function findNewArticles(): Promise<{
    toBeInserted: Article[];
    allArticles: Article[];
}>;
export declare function generateArticleId({ id, publishedAt }: any): string;
