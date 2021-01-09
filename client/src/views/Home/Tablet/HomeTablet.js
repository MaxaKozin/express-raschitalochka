import React, { Suspense } from 'react';
import { AppBar, NavBar, TotalBalance, Loader } from '../../../components';
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
        <Suspense fallback={<Loader />}>
          <div className={styles.content}>
            {children}
          </div>
        </Suspense>
      </div>
    </>
  )
}