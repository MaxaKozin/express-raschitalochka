import React from 'react';
import { AppBar, NavBar, CurrencyExchange, TotalBalance } from '../../components';
import styles from './Home.module.css'


export default function Home({ children }) {
  return (
    <>
      <AppBar />
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <NavBar />
          <TotalBalance />
          <CurrencyExchange />
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </>
  )
}