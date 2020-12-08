import React from 'react';
import UserMenu from '../UserMenu';
import styles from './AppBar.module.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg';

export default function AppBar() {
  return (
    <div className={styles.header}>
      <div className="page_wrap">
        <div className={styles.container}>
          <div className={styles.headerNameBox}>
            <NavLink exact to={"/"}>
              <img src={logo} alt="logo" width="50" className={styles.logo} />
            </NavLink>
            <h1 className={styles.appName}>Raschitalochka 2.0</h1>
          </div>
          <UserMenu />
        </div>
      </div>
    </div>
  )
};