import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bankDataOperations } from '../../redux/bankData';
import { filterData } from '../../services'
import styles from './CurrencyExchange.module.css';

export default function CurrencyExchange() {
  const dispatch = useDispatch();

  const dataFromBank = useSelector(state => state.bankData.data);
  const isLoading = useSelector(state => state.bankData.isLoading);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (dataFromBank || !isAuthenticated) {
      return;
    }
    dispatch(bankDataOperations.getBankData());
  }, [dispatch, dataFromBank, isAuthenticated]);

  const filteredData = () => {
    if (dataFromBank) {
      return filterData(dataFromBank)
    }
  }

  return (
    <section className={styles.CurrencyExchange__container}>
      <div className={styles.CurrencyExchange}>
        {isLoading ? (
          <div>isLoading...</div>// should be changed to Loader-spinner
        ) : dataFromBank ? (
          <table className={styles.CurrencyExchange__table}>
            <thead>
              <tr className={styles.CurrencyExchange__headerRow}>
                <td>Currency</td>
                <td>Sale</td>
                <td>Purchase</td>
              </tr>
            </thead>
            <tbody>
              {filteredData().map(el => (
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
