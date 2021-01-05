import axios from "axios";
import { toast } from "react-toastify";
import {
  addTransactionRequest,
  addTransactionSuccess,
  getFinanceSuccess,
  getFinanceRequest,
  updateTransactionRequest,
  updateTransactionSuccess,
  deleteTransactionRequest,
  deleteTransactionSuccess,
  getError,
} from "./finance-action";
import { transactionTypes } from "../../common";

const getFinance = () => async (dispatch, getState) => {
  try {
    const {
      auth: {
        user: { _id },
      },
    } = getState();
    dispatch(getFinanceRequest());
    const data = await axios.get(`api/finance/${_id}`);
    dispatch(getFinanceSuccess(data.data));
    toast.success("User's transaction history successfully loaded")
  } catch (error) {
    dispatch(getError());
    toast.error("User's transaction history not loaded, pls try again later")
  }
};

const addTransaction = (userData) => async (dispatch, getState) => {
  dispatch(addTransactionRequest());
  try {
    const {
      auth: {
        user: { _id },
      },
    } = getState();

    let type;
    if (userData.type === transactionTypes.addIncome) {
      type = "+";
    }
    if (userData.type === transactionTypes.addCost) {
      type = "-";
    }

    const sendData = {
      ...userData,
      type,
    };
    const response = await axios.post(`api/finance/${_id}`, sendData);

    dispatch(addTransactionSuccess(response.data));
    toast.success('Transaction successfully added')
  } catch (error) {
    dispatch(getError());
    toast.error('Something going wrong, pls try again later')
  }
};

const updateTransaction = (transactionId, patchedData) => async (dispatch, getState) => {
  dispatch(updateTransactionRequest());
  try {
    const {
      auth: {
        user: { _id },
      },
    } = getState();
    const response = await axios.patch(`api/finance/${_id}`, { data: { transactionId, patchedData }, headers: { 'Content-Type': 'application/json' } });
    dispatch(updateTransactionSuccess(response.data))
    toast.success('Transaction updated');
  } catch (error) {
    dispatch(getError());
    toast.error('Transacaction has not been updated, try again later');
  }
}


const deleteTransaction = (transactionId) => async (dispatch, getState) => {
  dispatch(deleteTransactionRequest())
  try {
    const {
      auth: {
        user: { _id },
      },
    } = getState();
    const response = await axios.delete(`api/finance/${_id}`, { data: { transactionId }, headers: { 'Content-Type': 'application/json' } });
    dispatch(deleteTransactionSuccess(response.data))
    toast.success('Transaction successfully deleted');
  } catch (error) {
    dispatch(getError());
    toast.error('Transacaction has not been deleted, try again later')
  }
}

export {
  addTransaction,
  getFinance,
  updateTransaction,
  deleteTransaction
};
