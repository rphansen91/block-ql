import { BlockExplorer } from './blockexplorer'

export type IContext = ReturnType<typeof context>

export const context = (request: any) => ({
  token: '',
  blockExplorer: new BlockExplorer
})