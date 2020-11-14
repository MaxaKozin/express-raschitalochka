import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
import { authOperations } from '../../redux/auth';
import { emailValidate } from '../../services';
// import Loader from 'react-loader-spinner';

// import 'react-toastify/dist/ReactToastify.css';
import styles from './Login.module.css';

// import phone from '../../assets/images/phone-mock-up.png';
// import { clearError } from '../../redux/auth/auth-actions';

export default function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState('');

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setIsValidEmail('');
  };

  const onChangeEmailHandler = e => {
    setEmail(e.target.value);
  };

  const onChangePasswordHandler = e => {
    setPassword(e.target.value);
  };

  const onBlurEmailHandler = e => {
    if (emailValidate(email)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  // const error = useSelector(state => state.auth.error);

  // useEffect(() => {
  //   Notification('error', error, 2000);
  //   if (error) dispatch(clearError());
  // }, [error, dispatch]);

  const onSubmitHandler = useCallback(
    event => {
      event.preventDefault();
      dispatch(authOperations.login({ email, password }));
      resetForm();
    },
    [dispatch, email, password],
  );

  const isLoading = useSelector(state => state.auth.isLoading);

  const isBtnNotDisabled = isValidEmail && password.length > 4;

  return (
    <div className={styles.main__container}>
      {isLoading && (
        <div style={{ position: 'absolute', top: 30, right: 30 }}> LOADING ...</div>
      )}
      {/* <Media device="desktop">
        <div className={styles.desktopImage__container}>
          <img
            src={phone}
            alt="mobile phone"
            className={styles.desktopImage__phone}
          />
        </div>
      </Media> */}
      <div className={styles.loginBlock__container}>
        <div className={styles.loginBlock}>
          <div className={styles.logo}></div>
          <span className={styles.projectName}>Raschitalochka</span>
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
          {/* <NavLink className={styles.regLink} exact to={'/register'}>
            Register
          </NavLink> */}
        </div>
      </div>

      <p className={styles.appDescription}>
        <span>Manage your budget</span>
        <span> with finance app</span>
      </p>
    </div>
  );
}
