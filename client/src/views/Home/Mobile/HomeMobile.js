import React from 'react';
import { AppBar, NavBar } from '../../../components';


export default function HomeMobile({ children }) {
  return (
    <>
      <AppBar />
      <NavBar />
      {children}
    </>
  )
}