import { QueryResolvers, ArticleResolvers } from '../types'
import { IContext } from '../../context'

export const newsQuery: QueryResolvers<IContext> = {
  async news(_, args, { getArticles }) {
    return getArticles(args)
  }
}

export const articleResolvers: ArticleResolvers<IContext> = {}