import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations } from '../../redux/auth';
import { emailValidate } from '../../services';
import LoginDesktop from './LoginDesktop'
import LoginMobile from './LoginMobile'
// import Loader from 'react-loader-spinner';
// import 'react-toastify/dist/ReactToastify.css';
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

  const isMobile = false;

  return (
    <>
      {isLoading && (
        <div style={{ position: 'absolute', top: 30, right: 30 }}> LOADING ...</div>
      )}:{isMobile && (<LoginMobile props={email, password, isValidEmail, onChangeEmailHandler, onChangePasswordHandler, onBlurEmailHandler, onSubmitHandler, isBtnNotDisabled} />)}:{
        <LoginDesktop props={email, password, isValidEmail, onChangeEmailHandler, onChangePasswordHandler, onBlurEmailHandler, onSubmitHandler, isBtnNotDisabled} />
      }
    </>)
}
