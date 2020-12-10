import React from 'react';
import styles from './TableRow.module.css'

export default function TableRow({ date, type, category, comments, amount, balanceAfter }) {

  const localDate = new Date(date).toLocaleDateString();

  return (
    <ul className={styles.row}>
      <li className={styles.cell}>{localDate}</li>
      <li className={styles.cell}>{type}</li>
      <li className={styles.cell}>{category}</li>
      <li className={styles.cell}>{comments}</li>
      <li className={styles.cell}
        style={{ color: type === '+' ? '#75c16e' : '#ff6c00' }}>{amount}</li>
      <li className={styles.cell}>{balanceAfter}</li>
      <li className={styles.cell}>update/delete</li>
    </ul>
  )
}
