import { QueryResolvers, ArticleResolvers } from '../types'
import { IContext } from '../../context'

export const newsQuery: QueryResolvers<IContext> = {
  async news(_, { q, sortBy, from }, {}) {
    return null
  }
}

export const articleResolvers: ArticleResolvers<IContext> = {}