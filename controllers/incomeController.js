import Income from "../models/Income.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  Unauthenticated
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

//add income controller

const addIncome = async (req, res) => {
  const { title, amount, typeCategory, description, date } = req.body;

  console.log({ title, amount, typeCategory, description, date });

  if (!title || !typeCategory || !description || !date) {
    throw new BadRequestError("Please provide all values");
  }
  if (amount <= 0 || amount === "number") {
    throw new BadRequestError("Please provide correct amount");
  }

  req.body.createdBy = req.user.userId;

  const income = await Income.create(req.body);

  res.status(StatusCodes.CREATED).json({ income });
};

const getIncomes = async (req, res) => {
  let result = Income.find({ createdBy: req.user.userId });

  const page = Number(req.query.incomePage) || 1;
  const limit = Number(req.query.incomeLimit) || 10;

  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const incomes = await result;

  const totalIncomes = await Income.countDocuments({
    createdBy: req.user.userId
  });

  const numOfPagesIncomes = Math.ceil(totalIncomes / limit);

  res.status(StatusCodes.OK).json({ incomes, totalIncomes, numOfPagesIncomes });
};

const deleteIncome = async (req, res) => {
  const { id: incomeId } = req.params;

  const income = await Income.findOne({ _id: incomeId });

  if (!income) {
    throw new NotFoundError(`No income with id : ${incomeId}`);
  }

  checkPermissions(req.user, income.createdBy);

  await income.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Success! income removed" });
};

export { addIncome, getIncomes, deleteIncome };
