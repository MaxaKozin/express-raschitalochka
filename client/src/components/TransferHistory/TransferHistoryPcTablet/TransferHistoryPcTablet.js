import React from 'react';
import { useSelector } from 'react-redux';
import styles from './TransferHistoryPcTablet.module.css';
const { tableShadow, table, tableRow, tableTopRow, tableBody, th, td } = styles;

export default function TransferHistoryPcTablet() {
  const transactionHistory = useSelector(state => state.finance.transactionHistory);

  return (
    <section className={tableShadow}>
      <table className={table}>
        <thead className={tableTopRow}>
          <tr>
            <th className={th}>Date</th>
            <th className={th}>Type</th>
            <th className={th}>Category</th>
            <th className={th}>Comments</th>
            <th className={th}>Amount, UAH</th>
            <th className={th}>Balance After</th>
          </tr>
        </thead>
      </table>
      <div className={tableBody}>
        <table className={table}>
          <tbody>
            {transactionHistory.map(
              (
                { date, type, category, comments, amount, balanceAfter },
                index,
              ) => (
                  <tr key={index} className={tableRow}>
                    <td className={td}>{new Date(date).toLocaleDateString()}</td>
                    <td className={td}>{type}</td>
                    <td className={td}>{category}</td>
                    <td className={td}>{comments}</td>
                    <td
                      className={td}
                      style={{ color: type === '+' ? '#75c16e' : '#ff6c00' }}
                    >
                      {amount}
                    </td>
                    <td className={td}>{balanceAfter}</td>
                  </tr>
                ),
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
