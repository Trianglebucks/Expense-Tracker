import React from "react";
import Pagination from "@mui/material/Pagination";
import { useAppContext } from "../context/AppContext";

const PaginationComponent = ({ transacType }) => {
  const {
    incomePage,
    numOfPagesIncomes,
    expensePage,
    numOfPagesExpenses,
    changePageIncome,
    changePageExpense,
  } = useAppContext();

  const handleChangeIncome = (event, value) => {
    console.log("hello", transacType);
    changePageIncome(value);
  };

  const handleChangeExpense = (event, value) => {
    console.log("hello", transacType);
    changePageExpense(value);
  };
  return (
    <Pagination
      count={transacType === "Income" ? numOfPagesIncomes : numOfPagesExpenses}
      color="primary"
      size="large"
      onChange={
        transacType === "Income" ? handleChangeIncome : handleChangeExpense
      }
      page={transacType === "Income" ? incomePage : expensePage}
    />
  );
};

export default PaginationComponent;
