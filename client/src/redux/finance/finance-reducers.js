import { combineReducers, createReducer } from '@reduxjs/toolkit';
import {
  getFinanceRequest,
  getFinanceSuccess,
  addCostRequest,
  addCostSuccess,
  addIncomeRequest,
  addIncomeSuccess,
  addTransactionRequest,
  addTransactionSuccess,
  updateTransactionRequest,
  updateTransactionSuccess,
  deleteTransactionRequest,
  deleteTransactionSuccess,
} from './finance-action';
import { logoutSuccess } from '../auth/auth-actions';

const totalBalance = createReducer(0, {
  [getFinanceSuccess]: (_, { payload }) => payload.totalBalance,
  [logoutSuccess]: () => 0,
  [addTransactionSuccess]: (_, { payload }) => payload.balance,
  [updateTransactionSuccess]: (_, { payload }) => payload.balance
  // [getCurrentUserSuccess]: (_, { payload }) => payload.balance,
});

const transactionHistory = createReducer([], {
  [getFinanceSuccess]: (_, { payload }) => payload.finance,
  [logoutSuccess]: () => [],
  [addTransactionSuccess]: (_, { payload }) => payload.data,
  [updateTransactionSuccess]: (_, { payload }) => payload.data,
  // [getCurrentUserSuccess]: (_, { payload }) => payload.data,
});

// const setError = (_, { payload }) => payload.message;

// const error = createReducer(null, {
//   [getError]: setError,
// });

const isLoading = createReducer(false, {
  [getFinanceRequest]: () => true,
  [addTransactionRequest]: () => true,
  [updateTransactionRequest]: () => true,
  [getFinanceSuccess]: () => false,
  [addTransactionSuccess]: () => false,
  [updateTransactionSuccess]: () => false

  // [getError]: () => false,
});

export default combineReducers({
  totalBalance,
  transactionHistory,
  isLoading,
  // error,
});
