import fetch from 'node-fetch'
import { Address, AddressValid, Block, Transaction, Unspent } from '../resolvers/types';

export class BlockExplorer {

  async fetch (pathname: string, opts?: any) {
    const result = await fetch(`https://blockexplorer.com/api${pathname}`, opts)
    return parse(await result.text())
  }

  async address(addr: string): Promise<Address|null> {
    return this.fetch(`/addr/${addr}`)
  }

  async addressValid(addr: string): Promise<AddressValid|null> {
    return this.fetch(`/addr-validate/${addr}`)
  }
  
  async block(hash: string): Promise<Block|null> {
    return this.fetch(`/block/${hash}`)
  }

  async blockIndex(height: number): Promise<Block|null> {
    const result = await this.fetch(`/block-index/${height}`)
    if (!result) return null
    return this.block(result.blockHash)
  }

  async transaction(txid: string): Promise<Transaction> {
    return this.fetch(`/tx/${txid}`)
  }

  async unspent (addr: string): Promise<Unspent[]> {
    return this.fetch(`/addr/${addr}/utxo`)
  }

  async send (rawtx: string) {
    const { txid } = await this.fetch('/tx/send', {
      method: 'POST',
      body: JSON.stringify({ rawtx })
    })
    return this.transaction(txid)
  }
}

function parse (text: string) {
  try {
    const data = JSON.parse(text)
    if (data && data.error) throw new Error(data.error)
    return data
  } catch (e) {
    console.log(e)
    throw new Error(text)
  }
}