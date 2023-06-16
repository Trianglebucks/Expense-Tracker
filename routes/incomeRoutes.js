import express from "express";
const router = express.Router();

import {
  addIncome,
  getIncomes,
  deleteIncome
} from "../controllers/incomeController.js";

router.route("/add-income").post(addIncome);
router.route("/get-incomes").get(getIncomes);
router.route("/delete-income/:id").delete(deleteIncome);

export default router;
