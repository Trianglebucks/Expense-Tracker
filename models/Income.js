import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema(
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
      enum: ["Salary", "Freelancing", "Investments", "Stocks", "Bank", "Other"],
      default: "Salary"
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
      default: "income"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Income", IncomeSchema);
