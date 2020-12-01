import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { financeOperation } from "../../redux/finance";
import { ToastContainer } from "react-toastify";
import {
  CurrencyExchange,
  ModalBtn,
  TotalBalance,
  TransferMobile,
  TransferPcTablet,
} from "../../components";

export default function HomeView() {
  const dispatch = useDispatch();
  const transactionHistory = useSelector((state) => state.transactionHistory);

  useEffect(() => {
    if (!transactionHistory) {
      dispatch(financeOperation.getFinance());
    }
  }, [transactionHistory, dispatch]);

  const isMobile = useSelector((state) => state.isMobile);
  const isTablet = useSelector((state) => state.isTablet);

  return (
    <>
      <div className="main_container main_container__table">
        {isMobile && <TotalBalance />}
        <ModalBtn />
        {isMobile ? <TransferMobile /> : <TransferPcTablet />}
      </div>
      {isTablet && <CurrencyExchange />}
      <ToastContainer />
    </>
  );
}
