import React from 'react';
import { AppBar, NavBar, CurrencyExchange, TotalBalance } from '../../../components';
import styles from './HomeTablet.module.css'


export default function HomeTablet({ children }) {
  return (
    <>
      <AppBar />
      <div className={styles.wrapper}>
        <div className={styles.navWrapper}>
          <NavBar />
          <TotalBalance />
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </>
  )
}