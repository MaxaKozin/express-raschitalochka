import React from 'react';
import { useSelector } from 'react-redux';
import styles from './TransferHistoryPcTablet.module.css';
import TableHeader from '../TableHeader'
import TableRow from '../TableRow'


export default function TransferHistoryPcTablet() {
  const transactionHistory = useSelector(
    (state) => state.finance.transactionHistory
  );
  return (
    <>
      <TableHeader />
      {transactionHistory.length === 0 ? (<h1 className={styles.warning}>Your transaction list empty. Pls add transactions to start supervise the accounts</h1>) : (
        <ul className={styles.tableBody}>
          {transactionHistory.map((
            props,
            index,
          ) => (
              <li key={index} className={styles.tableRow}>
                <TableRow {...props} />
              </li>
            ))}
        </ul>
      )
      }
    </>
  )
};
