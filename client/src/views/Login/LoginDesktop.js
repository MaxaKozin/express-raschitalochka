import React from 'react';
// import styles from './Login.module.css';
import styles from './LoginDesktop.module.css';
import { NavLink } from 'react-router-dom'
import phone from '../../assets/images/phone-mock-up.png';

export default function LoginDesktop({ email,
  onBlurEmailHandler, isValidEmail, password, onChangePasswordHandler, onChangeEmailHandler, onSubmitHandler, isBtnNotDisabled }) {


  const onChangeEmail = e => {
    onChangeEmailHandler(e.target.value)
  }

  const onChangePassword = e => {
    onChangePasswordHandler(e.target.value)
  }

  const onSubmit = e => {
    e.preventDefault()
    onSubmitHandler()
  }
  return (
    <div className={styles.main__container}>
      <div className={styles.desktopImage__container}>
        <img
          src={phone}
          alt="mobile phone"
          className={styles.desktopImage__phone}
        />
      </div>

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