import React, { useRef, useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { authOperations } from '../../redux/auth';
import emailValidate from '../../services/emailValidate';
import PasswordStrengthBar from 'react-password-strength-bar';

import styles from './Registration.module.css';
// import icon from '../../assets/icons/logo.svg';
// import { clearError } from '../../redux/auth/auth-actions';

export default function Registration() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isValidEmail, setIsValidEmail] = useState('');
  const [isEqualPassword, setIsEqualPassword] = useState('');
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const confirmPassword = useRef('');

  const onChangeHandler = useCallback(({ currentTarget: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;

      default:
        console.log(new Error());
        break;
    }
  }, []);

  const onBlurEmailHandler = e => {
    if (emailValidate(email)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const onChangeConfrimPassHandler = e => {
    if (confirmPassword.current.value === password) {
      setIsEqualPassword(true);
    } else {
      setIsEqualPassword(false);
    }
  };

  const resetInput = () => {
    setName('');
    setEmail('');
    setPassword('');
    setIsValidEmail('');
    setIsEqualPassword('');
    setIsPasswordStrong(false);
    confirmPassword.current.value = '';
  };

  // const error = useSelector(state => state.error);
  // const token = useSelector(state => state.token);

  // useEffect(() => {
  //   Notification('error', error, 2000);
  //   if (error) dispatch(clearError());
  // }, [error, dispatch]);

  // useEffect(() => {
  //   if (token) {
  //     Notification('success', 'Registration successful!', 2000);
  //   }
  // }, [token]);

  const onSubmitHandler = async e => {
    e.preventDefault();
    if (isValidEmail && isEqualPassword) {
      const response = await dispatch(
        authOperations.register({ name, email, password }),
      );
      resetInput();
      if (response) {
        dispatch(authOperations.login({ email, password }));
      }
    }
  };

  const CheckStrenthPass = score => {
    if (score > 0) {
      setIsPasswordStrong(true);
    } else {
      setIsPasswordStrong(false);
    }
  };

  const isBtnNotDisable =
    isValidEmail && isEqualPassword && name && isPasswordStrong;

  return (
    <div className={styles.pageWrap}>
      {/* <Media device="desktop">
        <div className={styles.leftSide}>
          <div className={styles.appNameContainer}>
            <svg className={styles.icon}>
              <use href={`${icon}#logo`}></use>
            </svg>
            <span className={styles.projectName}>Raschitalochka</span>
          </div>
          <h2 className={styles.losung}>
            <span>Create your own</span>
            <span>categories of costs</span>
          </h2>
        </div>
      </Media> */}
      <div className={styles.registerWrap}>
        <div className={styles.registerBlock}>
          <div className={styles.container}>
            {/* <Media device="mobile">
              <div className={styles.logo}></div>
              <span className={styles.projectName}>Raschitalochka</span>
            </Media> */}

            {/* <Media device="fromTablet">
              <h2 className={styles.title}>Registration</h2>
            </Media> */}
            <form
              className={styles.registerForm}
              onSubmit={onSubmitHandler}
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
                  onChange={onChangeHandler}
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
                  className={styles.input + ' ' + styles.passwordInput}
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={onChangeHandler}
                  onBlur={onChangeConfrimPassHandler}
                />
              </label>
              <label>
                <input
                  className={styles.input + ' ' + styles.passwordInput}
                  type="password"
                  name="password confirmation"
                  placeholder="Password Confirmation"
                  onChange={onChangeConfrimPassHandler}
                  onBlur={onChangeConfrimPassHandler}
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
                onChangeScore={score => CheckStrenthPass(score)}
              />
              <label>
                <input
                  className={styles.input + ' ' + styles.nameInput}
                  type="name"
                  name="name"
                  value={name}
                  placeholder="Your Name"
                  onChange={onChangeHandler}
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
