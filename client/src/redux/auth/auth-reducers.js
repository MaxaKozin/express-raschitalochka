import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  getError,
  registerRequest,
  registerSuccess,
  loginRequest,
  loginSuccess,
  logoutSuccess,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError
} from './auth-actions';

const initialUserState = { name: null, email: null };

const user = createReducer(initialUserState, {
  [registerSuccess]: (_, { payload }) => payload.user,
  [loginSuccess]: (_, { payload }) => payload,
  [logoutSuccess]: () => initialUserState,
  [getCurrentUserSuccess]: (_, { payload }) => payload
});

const token = createReducer(null, {
  [registerSuccess]: (_, { payload }) => payload.token,
  [loginSuccess]: (_, { payload }) => payload.token,
  [getCurrentUserSuccess]: (_, { payload }) => payload.token,
  [logoutSuccess]: () => null,
});


const isAuthenticated = createReducer(false, {
  [registerSuccess]: () => true,
  [loginSuccess]: () => true,
  [getCurrentUserSuccess]: () => true,
  [getCurrentUserError]: () => false,
  [logoutSuccess]: () => false,
});

const isLoading = createReducer(false, {
  [registerRequest]: () => true,
  [registerSuccess]: () => false,
  [loginRequest]: () => true,
  [loginSuccess]: () => false,
  [logoutSuccess]: () => false,
  [getCurrentUserRequest]: () => true,
  [getCurrentUserSuccess]: () => false,
  [getCurrentUserError]: () => false,
  [getError]: () => false,
});

export default combineReducers({
  user,
  isAuthenticated,
  token,
  isLoading,
});
