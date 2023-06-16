import { Card, CardContent, Grid, Typography } from "@mui/material";

const HistoryContainer = ({ title, amount, transactionType }) => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between">
            <Grid item xs={6}>
              <Typography
                variant="body2"
                color={transactionType === "income" ? "green" : "red"}
              >
                {title}
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "right" }}>
              <Typography
                variant="body2"
                color={transactionType === "income" ? "green" : "red"}
                s
              >
                PHP{amount}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
export default HistoryContainer;
