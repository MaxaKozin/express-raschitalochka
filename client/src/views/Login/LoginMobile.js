import React from 'react';
import styles from './Login.module.css';
import { NavLink } from 'react-router-dom'
// import styles from './LoginDesktop.module.css';

export default function LoginMobile({ email, password, isValidEmail, onChangeEmailHandler, onChangePasswordHandler, onBlurEmailHandler, onSubmitHandler, isBtnNotDisabled }) {
  return (
    <div className={styles.loginBlock__container}>
      <div className={styles.loginBlock}>
        <div className={styles.logo}></div>
        <span className={styles.projectName}>Raschitalochka 2.0</span>
        <form
          className={styles.loginForm}
          onSubmit={onSubmitHandler}
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
              onChange={onChangeEmailHandler}
              onBlur={onBlurEmailHandler}
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
              onChange={onChangePasswordHandler}
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
    </div>)
}