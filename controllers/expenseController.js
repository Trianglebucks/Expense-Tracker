import Expense from "../models/Expense.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  Unauthenticated,
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
  let result = Expense.find({ createdBy: req.user.userId });

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.expenseLimit) || 10;

  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const expenses = await result;

  const totalExpenses = await Expense.countDocuments({
    createdBy: req.user.userId,
  });

  const numOfPagesExpenses = Math.ceil(totalExpenses / limit);
  res
    .status(StatusCodes.OK)
    .json({ expenses, totalExpenses, numOfPagesExpenses });
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
