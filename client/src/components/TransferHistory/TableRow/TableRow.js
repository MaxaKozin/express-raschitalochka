import React from 'react';
import styles from './TableRow.module.css'

export default function TableRow({ date, type, category, comments, amount, balanceAfter, id }) {

  const onEditClick = (transactionId) => {
    console.log(transactionId);
  }

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
      <li className={styles.cell + ' ' + styles.btnBlock}>
        <div className={styles.btn + ' ' + styles.btnEdit}
          onClick={onEditClick(id)}>
          <span>EDIT</span>
        </div>
        <div className={styles.btn + ' ' + styles.btnDel}>
          <span>DEL</span>
        </div>
      </li>
    </ul>
  )
}
