import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  DialogActions,
  Box,
  Grid,
  MenuItem,
} from "@mui/material";
import { useAppContext } from "../context/AppContext";
import AlertComponent from "./AlertComponent";

const AddTransaction = ({ transacType }) => {
  const {
    showDialog,
    hideDialog,

    title,
    amount,
    date,
    typeCategory,
    incomeTypeOptions,

    expenseTypeOptions,

    description,
    displayAlert,
    showAlert,
    handleChange,
    clearValues,

    createTransaction,
  } = useAppContext();

  let isIncome = false;

  if (transacType === "Income") {
    isIncome = true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !amount || !date || !typeCategory || !description) {
      displayAlert();
      return;
    }
    if (transacType === "Income") {
      createTransaction("income");
    }
    if (transacType === "Expense") {
      createTransaction("expense");
    }

    clearValues();
  };
  const handleTransacInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };
  return (
    <div>
      <Dialog open={showDialog} onClose={hideDialog}>
        <DialogTitle>Add {transacType}</DialogTitle>
        <DialogContent dividers>
          {showAlert && <AlertComponent />}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {/* title */}
            <TextField
              InputLabelProps={{ required: false }}
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={title}
              autoFocus
              onChange={handleTransacInput}
            />
            {/* amount */}
            <TextField
              InputLabelProps={{ required: false }}
              margin="normal"
              required
              fullWidth
              id="amount"
              label="Amount"
              name="amount"
              type="number"
              value={amount}
              autoFocus
              onChange={handleTransacInput}
            />
            <Grid container columnSpacing={2}>
              {/* date */}
              <Grid item xs={12} md={6}>
                <TextField
                  InputLabelProps={{ shrink: true, required: false }}
                  margin="normal"
                  required
                  fullWidth
                  name="date"
                  label="Date"
                  id="date"
                  type="date"
                  value={date}
                  onChange={handleTransacInput}
                />
              </Grid>
              {/* select category type */}
              <Grid item xs={12} md={6}>
                <TextField
                  id="outlined-select-currency"
                  margin="normal"
                  fullWidth
                  select
                  value={typeCategory}
                  label="Select category"
                  name="typeCategory"
                  onChange={handleTransacInput}
                >
                  {isIncome
                    ? incomeTypeOptions.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))
                    : expenseTypeOptions.map((option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                </TextField>
              </Grid>
            </Grid>
            {/* description */}
            <TextField
              InputLabelProps={{ required: false }}
              margin="normal"
              required
              fullWidth
              value={description}
              name="description"
              label="Description"
              id="description"
              onChange={handleTransacInput}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideDialog}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default AddTransaction;
