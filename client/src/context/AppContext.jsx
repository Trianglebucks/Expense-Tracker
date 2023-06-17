import { useReducer, useContext, createContext, useState } from "react";
import reducer from "./Reducer";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT_USER,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_TRANSACTION_BEGIN,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_ERROR,
  GET_TRANSACTIONS_BEGIN,
  GET_INCOMES_SUCCESS,
  GET_EXPENSES_SUCCESS,
  DELETE_TRANSACTION_BEGIN,
  CHANGE_PAGE_INCOME,
  CHANGE_PAGE_EXPENSE,
} from "./Actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  isEditing: false,
  editTransacId: "",
  title: "",
  amount: "",
  date: "",
  incomeTypeOptions: [
    "Salary",
    "Freelancing",
    "Investments",
    "Stocks",
    "Bank",
    "Other",
  ],
  incomeType: "Salary",
  expenseTypeOptions: [
    "Food",
    "Healthcare",
    "Entertainment",
    "Transportation",
    "Housing",
    "Internet",
    "Insurance",
    "Other",
  ],
  expenseType: "Food",
  typeCategory: "",
  description: "",
  incomes: [],
  totalIncomes: 0,
  numOfPagesIncomes: 1,
  incomePage: 1,
  expenses: [],
  totalExpenses: 0,
  numOfPagesExpenses: 1,
  expensePage: 1,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  //for all things
  const [state, dispatch] = useReducer(reducer, initialState);
  //sidebar state
  const [showSidebar, setShowSidebar] = useState(true);
  //dialog state
  const [showDialog, setShowDialog] = useState(false);

  //axios
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  //request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  //response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  //toggles sidebar
  const displaySidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const hideDialog = () => {
    setShowDialog(false);
    clearValues();
  };

  const displayDialog = () => {
    setShowDialog(true);
  };

  //displays the alert
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  //clears the alert after 3 seconds
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  // register or login user
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );

      const { user, token } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      });
      //localstorage
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      const { user, token } = data;

      dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, token } });
      addUserToLocalStorage({ user, token });
      console.log(data);
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  // dynamic transaction

  const createTransaction = async (endPoint) => {
    dispatch({ type: CREATE_TRANSACTION_BEGIN });
    try {
      const { title, amount, date, typeCategory, description } = state;
      await authFetch.post(`/${endPoint}/add-${endPoint}`, {
        title,
        amount,
        date,
        typeCategory,
        description,
      });
      dispatch({ type: CREATE_TRANSACTION_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) {
        dispatch({
          type: CREATE_TRANSACTION_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    getTransactions({ endPoint });
    clearAlert();
  };

  const getTransactions = async ({ endPoint }) => {
    const { incomePage, expensePage } = state;
    ("");
    let page;
    if (endPoint === "income") {
      page = incomePage;
    } else {
      page = expensePage;
    }

    let url = `/${endPoint}/get-${endPoint}s?page=${page}`;

    dispatch({ type: GET_TRANSACTIONS_BEGIN });
    try {
      if (endPoint === "income") {
        const { data } = await authFetch(url);
        const { incomes, totalIncomes, numOfPagesIncomes } = data;
        dispatch({
          type: GET_INCOMES_SUCCESS,
          payload: {
            incomes,
            totalIncomes,
            numOfPagesIncomes,
          },
        });
      } else if (endPoint === "expense") {
        const { data } = await authFetch(url);
        const { expenses, totalExpenses, numOfPagesExpenses } = data;
        dispatch({
          type: GET_EXPENSES_SUCCESS,
          payload: {
            expenses,
            totalExpenses,
            numOfPagesExpenses,
          },
        });
      }
    } catch (error) {
      console.log(error.response);
    }
    clearAlert();
  };

  const deleteTransaction = async (id, endPoint) => {
    dispatch({ type: DELETE_TRANSACTION_BEGIN });
    try {
      await authFetch.delete(`/${endPoint}/delete-${endPoint}/${id}`);
      getTransactions({ endPoint });
    } catch (error) {}
  };

  const totalAmount = (endPoint) => {
    let totalAmount = 0;
    if (endPoint === "income") {
      state.incomes.forEach((income) => {
        totalAmount += income.amount;
      });
    }
    if (endPoint === "expense") {
      state.expenses.forEach((expense) => {
        totalAmount += expense.amount;
      });
    }
    return totalAmount;
  };

  const totalBalance = () => {
    return totalAmount("income") - totalAmount("expense");
  };

  const transactionHistory = () => {
    const history = [...state.incomes, ...state.expenses];
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return history.slice(0, 3);
  };

  const changePageIncome = (incomePage) => {
    dispatch({ type: CHANGE_PAGE_INCOME, payload: { incomePage } });
  };

  const changePageExpense = (expensePage) => {
    dispatch({ type: CHANGE_PAGE_EXPENSE, payload: { expensePage } });
  };

  return (
    // export the function and state here
    <AppContext.Provider
      value={{
        ...state,
        showSidebar,
        displaySidebar,
        showDialog,
        displayDialog,
        hideDialog,
        displayAlert,
        setupUser,
        updateUser,
        logoutUser,
        handleChange,
        clearValues,
        createTransaction,
        getTransactions,
        deleteTransaction,
        totalAmount,
        totalBalance,
        transactionHistory,
        changePageExpense,
        changePageIncome,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

//hook for appcontext
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
