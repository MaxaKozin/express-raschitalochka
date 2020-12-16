import React from 'react'
import styles from './Loader.module.css'

export default function Loader() {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinnerCircle + ' ' + styles.spinnerCircleOuter}></div>
      <div className={styles.spinnerCircle + ' ' + styles.spinnerCircleInner}></div>
      <div className={styles.spinnerCircle + ' ' + styles.spinnerCircleSingle1}></div>
      <div className={styles.spinnerCircle + ' ' + styles.spinnerCircleSingle2}></div>
      <div className={styles.text}>...loading</div>
    </div>
  )
}
