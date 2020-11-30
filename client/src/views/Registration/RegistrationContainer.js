import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations } from '../../redux/auth';
import RegistrationMobile from './Mobile';
import RegistrationDesktop from './Desktop'


export default function Registration() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isValidEmail, setIsValidEmail] = useState(null);
  const [isEqualPassword, setIsEqualPassword] = useState(null);
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);


  const onChangeNameHandler = (value) => {
    setName(value);
  };

  const onChangeEmailHandler = (value) => {
    setEmail(value)
  };

  const onChangePasswordHandler = (value) => {
    setPassword(value);
  };

  const onBlurEmailHandler = (bool) => {
    setIsValidEmail(bool);
  };

  const onChangeConfrimPassHandler = (bool) => {
    setIsEqualPassword(bool);
  };

  const resetInput = () => {
    setName('');
    setEmail('');
    setPassword('');
    setIsValidEmail(null);
    setIsEqualPassword(null);
    setIsPasswordStrong(false);
  };

  const onSubmitHandler = () => {
    if (isValidEmail && isEqualPassword) {
      dispatch(
        authOperations.register({ name, email, password }),
      );
      resetInput();
    }
  };

  const checkStrenthPassHandler = (bool) => {
    setIsPasswordStrong(bool);
  };

  const isBtnNotDisable = isValidEmail && isEqualPassword && name && isPasswordStrong;

  const isLoading = useSelector(state => state.auth.isLoading);

  const isMobile = useSelector(state => state.isMobile);
  const isTablet = useSelector(state => state.isTablet);
  const isDesktop = !isMobile && !isTablet

  const params = { name, email, password, isValidEmail, isEqualPassword, isPasswordStrong, onChangeNameHandler, onChangeEmailHandler, onChangePasswordHandler, onChangeConfrimPassHandler, checkStrenthPassHandler, isBtnNotDisable, onSubmitHandler, onBlurEmailHandler };

  return (
    <>
      {isLoading ? (
        <div style={{ position: 'absolute', top: 30, right: 30 }}> LOADING ...</div> // should be changed to loader-spinner
      ) : (isMobile ? (<RegistrationMobile {...params} />) :
        (<RegistrationDesktop {...params} />)
        )
      }
    </>
  )
}
