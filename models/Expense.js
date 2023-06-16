import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50
    },
    amount: {
      type: Number,
      required: true,
      maxlength: 20,
      trim: true
    },
    date: {
      type: Date,
      required: true,
      trim: true
    },
    typeCategory: {
      type: String,
      enum: [
        "Food",
        "Healthcare",
        "Entertainment",
        "Transportation",
        "Housing",
        "Internet",
        "Insurance",
        "Other"
      ],
      default: "Food"
    },
    description: {
      type: String,
      required: true,
      maxlength: 20,
      trim: true
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"]
    },
    transactionType: {
      type: String,
      default: "expense"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Expense", ExpenseSchema);
