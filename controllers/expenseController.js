import Expense from "../models/Expense.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  Unauthenticated
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
//add Expense controller

const addExpense = async (req, res) => {
  const { title, amount, typeCategory, description, date } = req.body;

  if (!title || !typeCategory || !description || !date) {
    throw new BadRequestError("Please provide all values");
  }
  if (amount <= 0 || amount === "number") {
    throw new BadRequestError("Please provide correct amount");
  }

  req.body.createdBy = req.user.userId;

  const expense = await Expense.create(req.body);

  res.status(StatusCodes.CREATED).json({ expense });
};

const getExpenses = async (req, res) => {
  const expenses = await Expense.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ expenses, totalExpenses: expenses.length, numOfPagesExpenses: 1 });
};

const deleteExpense = async (req, res) => {
  const { id: expenseId } = req.params;

  const expense = await Expense.findOne({ _id: expenseId });

  if (!expense) {
    throw new NotFoundError(`No expense with id : ${expenseId}`);
  }

  checkPermissions(req.user, expense.createdBy);

  await expense.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Success! expense removed" });
};

export { addExpense, getExpenses, deleteExpense };
