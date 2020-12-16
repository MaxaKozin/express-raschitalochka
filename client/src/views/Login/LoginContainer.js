import React, { lazy, Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authOperations } from "../../redux/auth";
// import LoginDesktop from "./Desktop";
// import LoginMobile from "./Mobile";
// import LoginTablet from "./Tablet";

const LoginMobile = lazy(() => import("./Mobile"));
const LoginTablet = lazy(() => import("./Tablet"));
const LoginDesktop = lazy(() => import("./Desktop"));

export default function Login() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setIsValidEmail("");
  };

  const onChangeEmailHandler = (value) => {
    setEmail(value);
  };

  const onChangePasswordHandler = (value) => {
    setPassword(value);
  };

  const onBlurEmailHandler = (bool) => {
    setIsValidEmail(bool);
  };

  const onSubmitHandler = () => {
    dispatch(authOperations.login({ email, password }));
    resetForm();
  };

  const isLoading = useSelector((state) => state.auth.isLoading);

  const isBtnNotDisabled = isValidEmail && password.length > 4;

  const params = {
    email,
    password,
    isValidEmail,
    onChangeEmailHandler,
    onChangePasswordHandler,
    isBtnNotDisabled,
    onSubmitHandler,
    onBlurEmailHandler,
  };

  const isMobile = useSelector((state) => state.isMobile);
  const isTablet = useSelector((state) => state.isTablet);
  const isDesktop = !isMobile && !isTablet;

  const defineDevice = () => {
    if (isMobile) {
      return <LoginMobile {...params} />;
    }
    if (isDesktop) {
      return <LoginDesktop {...params} />;
    }
    if (isTablet) {
      return <LoginTablet {...params} />;
    }
  };

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <>
        {isLoading ? (
          <div style={{ position: "absolute", top: 30, right: 30 }}>
            {" "}
            LOADING ...
          </div> // should be changed to loader-spinner
        ) : (
          defineDevice()
        )}
      </>
    </Suspense>
  );
}
