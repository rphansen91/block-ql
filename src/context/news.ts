import { fetchResource } from '../utils/s3';
import { fireFetch } from '../utils/firebase';
import { Article, QueryNewsArgs } from '../resolvers/types';
import groupBy from 'lodash/groupBy';
import qs from 'querystring';

export async function fetchCachedArticles () {
    const data = await fetchResource('articles')
    return data
}

export async function getArticles (args: QueryNewsArgs): Promise<Article[]> {
    const cachedArticles = await fetchResource('articles')
    const fireArticles = await fireFetch('articles')
    return articlesFilter([].concat(cachedArticles, fireArticles), args)
}

export async function findNewArticles () {
    const [
        cachedNews,
        currentNews
    ] = await Promise.all([
        fetchResource('articles').catch(() => ([])),
        fetchNewsApi({ q: 'cryptocurrency' }),
    ])
    const cachedNewsById = groupBy(cachedNews, generateArticleId)
    const toBeInserted = currentNews.filter(article => !cachedNewsById[generateArticleId(article)])
    const allArticles = cachedNews.concat(toBeInserted)
    return {
        toBeInserted,
        allArticles
    }
}

export function generateArticleId ({ id, publishedAt }: any): string {
    return id || publishedAt
}

function fetchNewsApi (args: { q: string }): Promise<Article[]> {
  return fetch(`https://newsapi.org/v2/everything?${qs.stringify(Object.assign({
    apiKey: 'c7cc23b6655a4b18855e50c553cf5c65',
    sortBy: 'popularity'
  }, args))}`)
  .then(res => res.json())
  .then(res => res.articles || [])
  .catch(err => {
    console.log('News api err', err)
    return []
  })
}

function articlesFilter (articles: Article[], args: QueryNewsArgs): Article[] {
    if (!args || !args.q) return articles
    if (!articles || !articles.length) return []

    return articles
    .sort((a, b) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
    .slice(0, 20)
}