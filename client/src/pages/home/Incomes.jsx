import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress
} from "@mui/material";
import styled from "@emotion/styled";
import { useAppContext } from "../../context/AppContext";
import { AddTransaction, TransacContainer } from "../../components";
import { useEffect } from "react";

const Incomes = () => {
  const {
    displayDialog,
    incomes,
    isLoading,
    page,
    totalIncomes,
    getTransactions,
    totalAmount
  } = useAppContext();

  useEffect(() => {
    getTransactions({ endPoint: "income" });
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography sx={{ marginBottom: 2 }} variant="h5">
        Incomes
      </Typography>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={8}>
                    <Typography variant="h6">
                      Total Incomes:
                      <Typography
                        variant="h6"
                        sx={{ color: "green", display: "inline" }}
                      >
                        PHP{totalAmount("income")}
                      </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sx={{ textAlign: "end" }}>
                    <Button variant="contained" onClick={displayDialog}>
                      Add Income
                    </Button>
                    <AddTransaction transacType={"Income"} />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {incomes.map(income => {
            return (
              <TransacContainer
                key={income._id}
                {...income}
                endPoint="income"
              />
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default Incomes;
