import axios from "axios";
import {
  addTransactionRequest,
  addTransactionSuccess,
  getFinanceSuccess,
  getFinanceRequest,
  updateTransactionRequest,
  updateTransactionSuccess,
  deleteTransactionRequest,
  deleteTransactionSuccess,
  // getError,
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
  } catch (error) {
    console.log(error);
  }
};

const updateTransaction = (transactionId, patchedData) => async (dispatch, getState) => {
  dispatch(updateTransactionRequest);
  try {
    const {
      auth: {
        user: { _id },
      },
    } = getState();
    const data = await axios.patch(`api/finance/${_id}`, { transactionId, patchedData });
    dispatch(updateTransactionSuccess(data))
  } catch (error) {
    console.log(error);
  }
}


// const deleteTransaction = (transactionId) => async (dispatch, getState) => {
//   try {

//     await axios.delete(`api/finance/${_id}`, { transactionId });
//   } catch (error) {
//     console.log(error);
//   }
// }

export {
  addTransaction,
  getFinance,
  updateTransaction,
  // deleteTransaction
};
