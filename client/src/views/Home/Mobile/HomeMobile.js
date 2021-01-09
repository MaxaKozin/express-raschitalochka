import React, { Suspense } from 'react';
import { AppBar, NavBar, Loader } from '../../../components';


export default function HomeMobile({ children }) {
  return (
    <>
      <AppBar />
      <NavBar />
      <Suspense fallback={<Loader />}>
        {children}
      </Suspense>
    </>
  )
}