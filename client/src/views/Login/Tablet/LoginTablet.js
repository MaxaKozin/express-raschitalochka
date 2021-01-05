import React from 'react';
import { NavLink } from 'react-router-dom';
import { emailValidate } from '../../../services';

import styles from '../Login.module.css';

export default function LoginTablet({ email,
  onBlurEmailHandler, isValidEmail, password, onChangePasswordHandler, onChangeEmailHandler, onSubmitHandler, isBtnNotDisabled }) {

  const onChangeEmail = e => {
    onChangeEmailHandler(e.target.value)
  };

  const onChangePassword = e => {
    onChangePasswordHandler(e.target.value)
  };

  const onSubmit = e => {
    e.preventDefault()
    onSubmitHandler()
  };

  const onBlurEmail = e => {
    if (emailValidate(email)) {
      onBlurEmailHandler(true);
    } else {
      onBlurEmailHandler(false);
    }
  };

  return (
    <div className={styles.main__container}>
      <div className={styles.loginBlock__container}>
        <div className={styles.loginBlock}>
          <div className={styles.logo}></div>
          <span className={styles.projectName}>Raschitalochka 2.0</span>
          <form
            className={styles.loginForm}
            onSubmit={onSubmit}
            autoComplete="off"
          >
            <label>
              <input
                className={styles.emailInput}
                type="email"
                name="email"
                placeholder="E-mail as Login"
                autoComplete="off"
                value={email}
                onChange={onChangeEmail}
                onBlur={onBlurEmail}
              />
            </label>
            {isValidEmail === false && (
              <div className={styles.warningText}>
                <span>Please enter valid email address!</span>
              </div>
            )}
            <label>
              <input
                className={styles.passwordInput}
                type="password"
                name="password"
                value={password}
                autoComplete="off"
                placeholder="Password"
                onChange={onChangePassword}
              />
            </label>
            <button
              className={styles.btnLogin}
              type="submit"
              disabled={!isBtnNotDisabled}
            >
              Enter
            </button>
          </form>
          <NavLink className={styles.regLink} exact to={'/register'}>
            Register
          </NavLink>
        </div>
      </div>

      <p className={styles.appDescription}>
        <span>Manage your budget</span>
        <span> with finance app</span>
      </p>
    </div>)
}