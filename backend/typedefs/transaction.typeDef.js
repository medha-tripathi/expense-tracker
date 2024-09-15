const transactionTypeDef = `#graphql

    type Transaction {
        id: ID!
        userId: ID!
        amount: Float!
        paymentType: String!
        description: String!
        category: String!
        location: String
        date: String!
    }

    type Query {
        transactions: [Transaction!]
        transaction(transactionId: ID!): Transaction
    }

    type Mutation {
        createTransaction(input: CreateTransactionInput!): Transaction!
        updateTransaction(input: UpdateTransactionInput!): Transaction!
        deleteTransaction(transactionId: ID!): Transaction!
    }

    input CreateTransactionInput {
        amount: Float!
        paymentType: String!
        description: String!
        category: String!
        location: String
        date: String!
    }

    input UpdateTransactionInput {
        transactionId: ID!
        amount: Float
        paymentType: String
        description: String
        category: String
        location: String
        date: String
    }
`

export default transactionTypeDef;