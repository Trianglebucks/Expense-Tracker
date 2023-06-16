import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { useEffect } from "react";
import { Chart, HistoryContainer } from "../../components";
import { useAppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { getTransactions, totalAmount, totalBalance, transactionHistory } =
    useAppContext();

  useEffect(() => {
    getTransactions({ endPoint: "income" });
    getTransactions({ endPoint: "expense" });
  }, []);

  const [...history] = transactionHistory();

  return (
    <Box>
      <Typography sx={{ marginBottom: 2 }} variant="h5">
        Dashboard
      </Typography>
      <Box>
        <Grid container spacing={2}>
          {/* First column */}
          <Grid item xs={12} md={6}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              {/* Chart */}
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Chart />
                  </CardContent>
                </Card>
              </Grid>
              {/* Total income */}
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Total Income</Typography>
                    <Typography
                      variant="h6"
                      sx={{ textAlign: "center", color: "green" }}
                    >
                      PHP {totalAmount("income")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              {/* total expenses */}
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Total Expenses</Typography>
                    <Typography
                      variant="h6"
                      sx={{ textAlign: "center", color: "red" }}
                    >
                      PHP {totalAmount("expense")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              {/* Total balance */}
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h5">Total Balance</Typography>
                    <Typography
                      variant="h6"
                      sx={{ textAlign: "center", color: "blue" }}
                    >
                      PHP {totalBalance()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          {/* Second column */}
          <Grid item xs={12} md={6}>
            <Typography sx={{ marginBottom: 2 }} variant="h6">
              Recent History
            </Typography>
            <Grid container spacing={2}>
              {/* Recent 3 transactions */}

              {history.map(item => {
                return <HistoryContainer key={item._id} {...item} />;
              })}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default Dashboard;
