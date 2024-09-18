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
        },
        categoryStatistics: async(_, __, context) => {
            if(!context.getUser()) throw new Error("Unauthorized");

            const userId = context.getUser()._id;
            const transactions = await Transaction.find({userId});
            const categoryMap = {};

            transactions.forEach((transaction) => {
                if (!categoryMap[transaction.category]) {
                    categoryMap[transaction.category] = 0;
                } 
                categoryMap[transaction.category] += transaction.amount;
            })

            return Object.entries(categoryMap).map(([category, totalAmount])=> ({category, totalAmount}))
        }
    },
    Mutation: {
        createTransaction: async(_, {input}, context) => {
            try {
                const newTransaction = new Transaction({
					...input,
					userId: context.getUser()._id,
				});
				await newTransaction.save();
				return newTransaction;
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