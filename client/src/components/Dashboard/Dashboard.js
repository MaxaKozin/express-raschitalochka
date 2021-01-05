import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { financeOperation } from '../../redux/finance';

import CurrencyExchange from '../CurrencyExchange';
import ModalBtn from '../ModalBtn';
import TotalBalance from '../TotalBalance';
import TransferHistoryMobile from '../TransferHistory/TransferHistoryMobile';
import TransferHistoryPcTablet from '../TransferHistory/TransferHistoryPcTablet';

export default function Dashboard() {
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
        {isMobile ? <TransferHistoryMobile /> : <TransferHistoryPcTablet />}
      </div>
      {isTablet && <CurrencyExchange />}
    </>
  );
}
