import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import { useAppContext } from "../../context/AppContext";
import {
  AddTransaction,
  TransacContainer,
  PaginationComponent,
} from "../../components";
import { useEffect } from "react";

const Incomes = () => {
  const {
    displayDialog,
    incomes,
    isLoading,
    page,
    totalIncomes,
    getTransactions,
    totalAmount,
    incomePage,
  } = useAppContext();

  useEffect(() => {
    getTransactions({ endPoint: "income" });
  }, [incomePage]);

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

          {incomes.map((income) => {
            return (
              <TransacContainer
                key={income._id}
                {...income}
                endPoint="income"
              />
            );
          })}

          <Grid item xs={12} sx={{ marginTop: "20px" }}>
            <Grid container justifyContent="flex-end">
              <PaginationComponent transacType={"Income"} />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Incomes;
