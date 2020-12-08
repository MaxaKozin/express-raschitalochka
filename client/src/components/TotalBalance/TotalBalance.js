import React from 'react';
import { useSelector } from 'react-redux'
import styles from './TotalBalance.module.css';

export default function TotalBalance() {
  const balance = useSelector(state => state.finance.totalBalance)
  return (
    <div className={styles.totalBalanceBox}>
      <p className={styles.titleParagraph}>Total Balance, </p>
      <span className={styles.currencyParagraph}> UAH </span>
      <p className={styles.balanceParagraph}> {Math.round(balance, -2)} </p>
    </div>
  )
}
