import express from "express";
const router = express.Router();

import {
  addExpense,
  getExpenses,
  deleteExpense
} from "../controllers/expenseController.js";

router.route("/add-expense").post(addExpense);
router.route("/get-expenses").get(getExpenses);
router.route("/delete-expense/:id").delete(deleteExpense);

export default router;
