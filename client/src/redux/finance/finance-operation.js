import axios from "axios";
import {
  addTransactionRequest,
  addTransactionSuccess,
  getFinanceSuccess,
  getFinanceRequest,
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
  } catch (error) {
    console.error(error);
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
    const {
      data: {
        finance: { totalBalance: balance, data },
      },
    } = await axios.post(`api/finance/${_id}`, sendData);

    dispatch(addTransactionSuccess({ balance, data }));
  } catch (e) {
    dispatch(getError(e));
  }
};

export default {
  addTransaction,
  getFinance,
};
