import React, { Suspense } from 'react';
import { AppBar, NavBar, CurrencyExchange, TotalBalance, Loader } from '../../../components';
import styles from './HomeDesktop.module.css'


export default function HomeDesktop({ children }) {
  return (
    <>
      <AppBar />
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <NavBar />
          <TotalBalance />
          <CurrencyExchange />
        </div>
        <Suspense fallback={<Loader />}>
          <div className={styles.content}>
            {children}
          </div>
        </Suspense>
      </div>
    </>
  )
}