import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { bankDataOperations } from '../../redux/bankData';

import styles from './CurrencyExchange.module.css';

export default function CurrencyExchange() {
  const dispatch = useDispatch();

  const dataFromBank = useSelector(state => state.bankData.data);
  const isLoading = useSelector(state => state.bankData.isLoading);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const FilteredData = () => {
    if (!dataFromBank) {
      return null;
    }
    const filteredData = dataFromBank.filter(el => el.ccy !== 'BTC');
    return filteredData.map(el => ({
      ...el,
      buy: Number(el.buy).toFixed(2),
      sale: Number(el.sale).toFixed(2),
    }));
  }

  useEffect(() => {
    if (dataFromBank || !isAuthenticated) {
      return;
    }
    dispatch(bankDataOperations.getBankData());
  }, [dispatch, dataFromBank, isAuthenticated]);

  return (
    <section className={styles.CurrencyExchange__container}>
      <div className={styles.CurrencyExchange}>
        {isLoading ? (
          <div>isLoading...</div>// should be changed to Loader-spinner
        ) : FilteredData ? (
          <table className={styles.CurrencyExchange__table}>
            <thead>
              <tr className={styles.CurrencyExchange__headerRow}>
                <td>Currency</td>
                <td>Sale</td>
                <td>Purchase</td>
              </tr>
            </thead>
            <tbody>
              {FilteredData.map(el => (
                <tr key={el.ccy} className={styles.CurrencyExchange__bodyRow}>
                  <td>{el.ccy}</td>
                  <td>{el.buy}</td>
                  <td>{el.sale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
              <div className={styles.CurrencyExchange__errorMessage}>
                <p>
                  <span>Sorry...</span>
              At the moment the exchange rate is not available
            </p>
              </div>
            )}
      </div>
    </section>
  );
};
