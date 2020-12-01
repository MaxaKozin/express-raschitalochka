import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { financeOperation } from '../../redux/finance';
// import { ToastContainer } from 'react-toastify';
import {
  CurrencyExchange,
  ModalBtn,
  TotalBalance,
  TransferMobile,
  TransferPcTablet,
} from '../../components';


export default function HomeView() {
  const dispatch = useDispatch();
  const transactionHistory = useSelector(state => state.transactionHistory);

  useEffect(() => {
    if (!transactionHistory) {
      dispatch(financeOperation.getFinance());
    }
  }, [transactionHistory, dispatch]);

  return (
    <>
      <div className="main_container main_container__table">
        <h1>HOME PAGE</h1>
        {/* <Media children={ */}
        {/* <TotalBalance /> */}
        {/* } device="mobile" /> */}

        {/* <ModalBtn /> */}
        {/* <Media device="mobile"> */}
        {/* <TransferMobile /> */}
        {/* </Media> */}
        {/* <Media device="fromTablet"> */}
        {/* <TransferPcTablet /> */}
        {/* </Media> */}
      </div>
      {/* <Media children={ */}
      {/* <CurrencyExchange /> */}
      {/* } device="onlyTablet" /> */}
      {/* <ToastContainer /> */}
    </>
  );
}