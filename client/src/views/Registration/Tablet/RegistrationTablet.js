import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { emailValidate } from '../../../services';
import PasswordStrengthBar from 'react-password-strength-bar';

import styles from '../Registration.module.css';


export default function RegistrationTablet({ name, email, password, isValidEmail, isEqualPassword, onChangeNameHandler, onChangeEmailHandler, onChangePasswordHandler, onBlurEmailHandler, onChangeConfrimPassHandler, checkStrenthPassHandler, onSubmitHandler, isBtnNotDisable }) {
  ;
  const confirmPassword = useRef('');

  const onChangeName = (e) => {
    onChangeNameHandler(e.target.value)
  };

  const onChangeEmail = (e) => {
    onChangeEmailHandler(e.target.value)
  }
  const onChangePassword = (e) => {
    onChangePasswordHandler(e.target.value)
  }

  const onBlurEmail = e => {
    if (emailValidate(email)) {
      onBlurEmailHandler(true);
    } else {
      onBlurEmailHandler(false);
    }
  };

  const onChangeConfrimPass = e => {
    if (confirmPassword.current.value === password) {
      onChangeConfrimPassHandler(true);
    } else {
      onChangeConfrimPassHandler(false);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    onSubmitHandler();
    confirmPassword.current.value = '';
  };

  const checkStrenthPass = (score) => {
    if (score > 0) {
      checkStrenthPassHandler(true);
    } else {
      checkStrenthPassHandler(false);
    }
  };

  return (
    <div className={styles.pageWrap}>
      <div className={styles.registerWrap}>
        <div className={styles.registerBlock}>
          <div className={styles.container}>
            <h2 className={styles.title}>Registration</h2>
            <form
              className={styles.registerForm}
              onSubmit={onSubmit}
              autoComplete="off"
            >
              <label>
                <input
                  className={styles.input + ' ' + styles.emailInput}
                  type="email"
                  name="email"
                  value={email}
                  autoComplete="off"
                  placeholder="E-mail as Login"
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
                  className={styles.input + ' ' + styles.passwordInput}
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={onChangePassword}
                  onBlur={onChangeConfrimPass}
                />
              </label>
              <label>
                <input
                  className={styles.input + ' ' + styles.passwordInput}
                  type="password"
                  name="password confirmation"
                  placeholder="Password Confirmation"
                  onChange={onChangeConfrimPass}
                  onBlur={onChangeConfrimPass}
                  ref={confirmPassword}
                />
              </label>
              {isEqualPassword === false && (
                <div className={styles.warningText}>
                  <span>Password doesn't match!</span>
                </div>
              )}
              <PasswordStrengthBar
                password={password}
                minLength="5"
                onChangeScore={score => checkStrenthPass(score)}
              />
              <label>
                <input
                  className={styles.input + ' ' + styles.nameInput}
                  type="name"
                  name="name"
                  value={name}
                  placeholder="Your Name"
                  onChange={onChangeName}
                />
              </label>
              <button
                className={styles.btnRegister}
                type="submit"
                disabled={!isBtnNotDisable}
              >
                Register
              </button>
            </form>
            <NavLink className={styles.loginLink} exact to={'/login'}>
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
