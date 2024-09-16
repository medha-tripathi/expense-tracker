import Transaction from "../models/transaction.model.js"

const transactionResolver = {
    Query: {
        transactions: async (_, ___, context) => {
            try {
                if (!context.getUser())
                    throw new Error("Unauthorized");
                const userId = await context.getUser()._id;
                const transactions = await Transaction.find({ userId });
                return transactions;
            } catch (err) {
                console.error("Error getting transactions", err);
                throw new Error(err.message || "Internal Server Error");
            }
        },
        transaction: async(_, {transactionId},) => {
            try {
                const transaction = await Transaction.findById(transactionId);
                return transaction;
            } catch (err) {
                console.error("Error getting transaction", err);
                throw new Error(err.message || "Internal Server Error");
            }
        }
    },
    Mutation: {
        createTransaction: async(_, {input}, context) => {
            try {
                if (!context.getUser())
                    throw new Error("Unauthorized");
                const userId = await context.getUser()._id;
                const transaction = await Transaction.create({userId, ...input});
                return transaction;
            } catch (err) {
                console.error("Error creating transaction", err);
                throw new Error(err.message || "Internal Server Error");
            }
        },
        updateTransaction: async(_, {input}) => {
            try {
                const {transactionId, ...updates} = input;
                const transaction = await Transaction.findByIdAndUpdate(transactionId, updates, {new: true});
                return transaction;
            } catch (err) {
                console.error("Error updating transaction", err);
                throw new Error(err.message || "Internal Server Error");
            }
        },
        deleteTransaction: async(_, {transactionId}) => {
            try {
                const transaction = await Transaction.findByIdAndDelete(transactionId);
                return transaction;
            } catch (err) {
                console.error("Error deleting transaction", err);
                throw new Error(err.message || "Internal Server Error");
            }
        }
    }
}

export default transactionResolver