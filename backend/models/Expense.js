import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    icon: { type: String },
    category: { type: String, required: true }, // ✅ changed from "category" to "source"
    amount: { type: Number, required: true },
    Date: { type: Date, default: Date.now }, // ✅ Capital "D"
}, { timestamps: true });

const model = mongoose.model("Expense", ExpenseSchema);
export default model;
