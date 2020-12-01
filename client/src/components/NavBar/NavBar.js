import React from 'react';
import { NavLink } from 'react-router-dom';
import SvgIcons from './SvgIcons';
import styles from './NavBar.module.css';

export default function NavBar({ children }) {
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.container}>
          <NavLink
            exact
            to={"/"}
            className={styles.navLink}
            activeClassName={styles.navLink__active}
          >
            <SvgIcons id="icon-home" />

            <span className={styles.navLink_text}>Home</span>
          </NavLink>

          <NavLink
            exact
            to={"/statistics"}
            className={styles.navLink}
            activeClassName={styles.navLink__active}
          >
            <SvgIcons id="icon-diagram" />

            <span className={styles.navLink_text}>Diagram</span>
          </NavLink>

          {/* <Media device="mobile"> */}
          <NavLink
            exact
            to={"/currency"}
            className={styles.navLink}
            activeClassName={styles.navLink__active}
          >
            <SvgIcons id="icon-currency" />
          </NavLink>
          {/* </Media> */}

          {/* <Media device="onlyTablet">{children}</Media> */}
        </div>
      </div>
    </>
  );
};
