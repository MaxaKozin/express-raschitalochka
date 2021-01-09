import axios from 'axios';
import { financeOperation } from '../finance';
import {
  getError,
  registerRequest,
  registerSuccess,
  loginRequest,
  loginSuccess,
  logoutSuccess,
  logoutRequest,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError
} from './auth-actions';
import { toast } from "react-toastify";

axios.defaults.baseURL = 'https://mernstackrasschitalochka.herokuapp.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = token;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = userData => async dispatch => {
  dispatch(registerRequest());

  try {
    const res = await axios.post('/api/register', userData);
    toast.success(`Welcome, ${res.data.user.name}`)
    token.set(res.data.token)
    dispatch(registerSuccess(res.data));
  } catch (error) {
    dispatch(getError())
    if (error.message === 'Request failed with status code 409') {
      toast.error('User is already exist')
      return;
    }
    toast.error('Something going wrong, pls try again later');
  }
};

const login = userData => async dispatch => {
  dispatch(loginRequest());

  try {
    const res = await axios.post('/api/login', userData);
    toast.success(`Welcome, ${res.data.user.name}`)
    token.set(res.data.token);
    dispatch(loginSuccess(res.data.user));
    dispatch(financeOperation.getFinance());
  } catch (error) {
    dispatch(getError())
    if (error.message === 'Request failed with status code 401') {
      toast.error('Email or password wrong')
      return;
    }
    toast.error('Something going wrong, pls try again later');
  }
};

const logOut = () => async dispatch => {
  dispatch(logoutRequest());

  try {
    toast.success('See you next time!')
    token.unset();
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(getError());;
    toast.error('Something going wrong, pls try again later');
  }
};


const getCurrentUser = () => async (dispatch, getState) => {
  const { auth: { token: persistedToken }, } = getState();
  if (!persistedToken) {
    return;
  }
  token.set(persistedToken);
  try {
    dispatch(getCurrentUserRequest());
    const response = await axios.get('api/current');
    dispatch(getCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(getCurrentUserError());;
    toast.error('Something going wrong, pls try again later');
  }
};

export {
  logOut,
  getCurrentUser,
  register,
  login,
  token,
};
