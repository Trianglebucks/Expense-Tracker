import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import styled from "@emotion/styled";
import { useEffect } from "react";
import {
  AddTransaction,
  TransacContainer,
  PaginationComponent,
} from "../../components";
import { useAppContext } from "../../context/AppContext";

const Expenses = () => {
  const {
    displayDialog,
    expenses,
    isLoading,
    page,
    totalExpenses,
    getTransactions,
    totalAmount,
    expensePage,
  } = useAppContext();

  useEffect(() => {
    getTransactions({ endPoint: "expense" });
  }, [expensePage]);

  if (isLoading) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <Typography sx={{ marginBottom: 2 }} variant="h5">
        Expenses
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h6">
                      Total Expenses:
                      <Typography
                        variant="h6"
                        sx={{ color: "red", display: "inline" }}
                      >
                        PHP{totalAmount("expense")}
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ textAlign: "end" }}>
                    <Button variant="contained" onClick={displayDialog}>
                      Add Expense
                    </Button>
                    <AddTransaction transacType={"Expense"} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {expenses.map((expense) => {
            return (
              <TransacContainer
                key={expense._id}
                {...expense}
                endPoint="expense"
              />
            );
          })}

          <Grid item xs={12} sx={{ marginTop: "20px" }}>
            <Grid container justifyContent="flex-end">
              <PaginationComponent transacType={"Expense"} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default Expenses;
