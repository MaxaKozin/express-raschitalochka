import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';
import styles from './UserMenu.module.css';
import logoutBtn from '../../assets/icons/logoutBtn.svg';

export default function UserMenu() {
  const dispatch = useDispatch();
  const userName = useSelector(state => state.auth.user.name)

  const onLogout = () => {
    dispatch(authOperations.logOut())
  }
  return (
    <div className={styles.userMenuContainer}>
      <span className={styles.userName}> {userName}</span>

      <button className={styles.logoutBtn}
        onClick={onLogout}
      >
        <img
          src={logoutBtn}
          alt="logout button"
          className={styles.logoutBtnSvg}
        />
        <p className={styles.logoutTitle}> logout</p>
      </button>
    </div>
  )
}
