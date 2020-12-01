import React from 'react';
import { NavLink } from 'react-router-dom';
import SvgIcons from './SvgIcons';
import styles from './NavBar.module.css';
import { useSelector } from "react-redux";


export default function NavBar({ children }) {
  const isMobile = useSelector((state) => state.isMobile);
  const isTablet = useSelector((state) => state.isTablet);

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
          {isMobile && (
            <NavLink
              exact
              to={"/currency"}
              className={styles.navLink}
              activeClassName={styles.navLink__active}
            >
              <SvgIcons id="icon-currency" />
            </NavLink>
          )}
          {isTablet && <>{children}</>}
        </div>
      </div>
    </>
  );
}
