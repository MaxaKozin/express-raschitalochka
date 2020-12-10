import React from 'react';
import styles from './TableHeader.module.css';

export default function TableHeader() {
  return (
    <ul className={styles.headerBlock}>
      <li className={styles.cell}>Date</li>
      <li className={styles.cell}>Type</li>
      <li className={styles.cell}>Category</li>
      <li className={styles.cell}>Comments</li>
      <li className={styles.cell}>Amount, UAH</li>
      <li className={styles.cell}>Balance After</li>
      <li className={styles.cell}>Manage</li>
    </ul>
  )
}
