import gql from 'graphql-tag'

export default gql`
  type Address {
    addrStr: String
    balance: Int
    balanceSat: Int
    totalReceived: Int
    totalReceivedSat: Int
    totalSent: Int
    totalSentSat: Int
    unconfirmedBalance: Int
    unconfirmedBalanceSat: Int
    unconfirmedTxApperances: Int
    txApperances: Int
    tx(limit: Int, skip: Int): [Transaction]
    txCount: Int
    unspent(limit: Int, skip: Int): [Unspent]
  }

  type AddressValid {
    isValid: Boolean
  }

  type Unspent {
    address: String
    txid: String
    vout: Float
    scriptPubKey: String
    amount: Float
    satoshis: Int
    height: Int
    confirmations: Int
  }

  type Query {
    address(addr: String!): Address
    addressValid(addr: String!): AddressValid
    unspent(addr: String!): [Unspent]
  }
`