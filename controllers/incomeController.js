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
  const incomes = await Income.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ incomes, totalIncomes: incomes.length, numOfPagesIncomes: 1 });
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
