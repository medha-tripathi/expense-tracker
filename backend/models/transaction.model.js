import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentType: {
        type: String,
        enum: ["cash", "card"],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        default: "Unknown"
    },
    category: {
        type: String,
        required: true,
        enum: ["saving", "expense", "investment" ]
    },
    date:{
        type: Date,
        required: true
    }
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction; 