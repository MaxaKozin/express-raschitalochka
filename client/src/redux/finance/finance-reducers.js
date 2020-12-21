import { combineReducers, createReducer } from '@reduxjs/toolkit';
import {
  getFinanceRequest,
  getFinanceSuccess,
  // addCostRequest,
  // addCostSuccess,
  // addIncomeRequest,
  // addIncomeSuccess,
  addTransactionRequest,
  addTransactionSuccess,
  updateTransactionRequest,
  updateTransactionSuccess,
  deleteTransactionRequest,
  deleteTransactionSuccess,
  getError,
} from './finance-action';
import { logoutSuccess } from '../auth/auth-actions';

const totalBalance = createReducer(0, {
  [getFinanceSuccess]: (_, { payload }) => payload.totalBalance,
  [logoutSuccess]: () => 0,
  [addTransactionSuccess]: (_, { payload }) => payload.totalBalance,
  [deleteTransactionSuccess]: (_, { payload }) => payload.totalBalance,
  [updateTransactionSuccess]: (_, { payload }) => payload.totalBalance
  // [getCurrentUserSuccess]: (_, { payload }) => payload.balance,
});

const transactionHistory = createReducer([], {
  [getFinanceSuccess]: (_, { payload }) => payload.finance,
  [logoutSuccess]: () => [],
  [addTransactionSuccess]: (_, { payload }) => payload.finance,
  [updateTransactionSuccess]: (_, { payload }) => payload.finance,
  [deleteTransactionSuccess]: (_, { payload }) => payload.finance,
  // [getCurrentUserSuccess]: (_, { payload }) => payload.data,
});

const isLoading = createReducer(false, {
  [getFinanceRequest]: () => true,
  [addTransactionRequest]: () => true,
  [updateTransactionRequest]: () => true,
  [deleteTransactionRequest]: () => true,
  [getFinanceSuccess]: () => false,
  [addTransactionSuccess]: () => false,
  [updateTransactionSuccess]: () => false,
  [deleteTransactionSuccess]: () => false,
  [getError]: () => false,
});

export default combineReducers({
  totalBalance,
  transactionHistory,
  isLoading,
});
