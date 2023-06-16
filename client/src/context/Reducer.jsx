import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  LOGOUT_USER,
  CREATE_TRANSACTION_BEGIN,
  CREATE_TRANSACTION_SUCCESS,
  CREATE_TRANSACTION_ERROR,
  GET_TRANSACTIONS_BEGIN,
  GET_INCOMES_SUCCESS,
  GET_EXPENSES_SUCCESS,
  DELETE_TRANSACTION_BEGIN
} from "./Actions";

import { initialState } from "./AppContext";

const Reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "error",
      alertText: "Please provide all values!"
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: ""
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: action.payload.alertText
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "error",
      alertText: action.payload.msg
    };
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: "success",
      alertText: "User profile updated!"
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "error",
      alertText: action.payload.msg
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
      title: "",
      amount: "",
      date: "",
      typeCategory: "",
      description: "",
      expenseType: "Food",
      incomeType: "Salary"
    };
    return {
      ...state,
      ...initialState
    };
  }

  if (action.type === CREATE_TRANSACTION_BEGIN) {
    return {
      ...state,
      isLoading: true
    };
  }
  if (action.type === CREATE_TRANSACTION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Transaction added!"
    };
  }
  if (action.type === CREATE_TRANSACTION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "error",
      alertText: action.payload.msg
    };
  }
  if (action.type === GET_TRANSACTIONS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_INCOMES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      incomes: action.payload.incomes,
      totalIncomes: action.payload.totalIncomes,
      numOfPagesIncomes: action.payload.numOfPagesIncomes
    };
  }
  if (action.type === GET_EXPENSES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      expenses: action.payload.expenses,
      totalExpenses: action.payload.totalExpenses,
      numOfPagesExpenses: action.payload.numOfPagesExpenses
    };
  }
  if (action.type === DELETE_TRANSACTION_BEGIN) {
    return { ...state, isLoading: true };
  }

  throw new Error(`no such action : ${action.type}`);
};
export default Reducer;
