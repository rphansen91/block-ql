import { QueryResolvers, ArticleResolvers } from '../types'
import { generateArticleId } from '../../context/news'
import { IContext } from '../../context'

export const newsQuery: QueryResolvers<IContext> = {
  async article(_, { id }, { getArticles }) {
    const articles = await getArticles({})
    return articles.find(a => a.publishedAt === id || a.id === id) || null
  },
  async news(_, args, { getArticles }) {
    return getArticles(args)
  }
}

export const articleResolvers: ArticleResolvers<IContext> = {
  id: (article) => generateArticleId(article)
}