import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import { authOperations } from './redux/auth'
import {
  setIsDesktop,
  setIsMobile,
  setIsTablet,
} from "./redux/resolution/resolution-operations";
import Notification from './components/Notification'
import { PrivateRoute, PublicRoute } from "./common";
import { income, costs } from "./components/ModalBtn/categoryValues";
import "./css/styles.css";

const Login = lazy(() => import("./views/Login"));
const Registration = lazy(() => import("./views/Registration"));
const Home = lazy(() => import("./views/Home"));
const HomeMobile = lazy(() => import("./views/Home/Mobile"));
const Statistics = lazy(() => import("./components/Statistics"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const CurrencyExchange = lazy(() => import("./components/CurrencyExchange"));
const AddTransactionMobile = lazy(() =>
  import("./components/AddTransactionMobile")
);

function App() {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.screen.width);

  const changeWidth = () => {
    setWidth(window.screen.width);
  };

  useEffect(() => {
    dispatch(authOperations.getCurrentUser())
  }, [dispatch])

  useEffect(() => {
    window.addEventListener("resize", changeWidth);
  });

  useEffect(() => {
    if (width < 768) {
      dispatch(setIsMobile(true));
    } else if (width > 767 && width < 1024) {
      dispatch(setIsTablet(true));
    } else {
      dispatch(setIsDesktop());
    }
  }, [width, dispatch]);

  return (
    <>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Switch>
          <PublicRoute
            path={"/login"}
            restricted
            exact
            redirectTo={"/"}
            component={Login}
          />
          <PublicRoute
            path={"/register"}
            restricted
            exact
            redirectTo={"/"}
            component={Registration}
          />
          <PrivateRoute
            path={"/"}
            exact
            redirectTo={"/login"}
            component={Home}
            child={Dashboard}
          />
          <PrivateRoute
            path={"/statistics"}
            exact
            redirectTo={"/"}
            component={Home}
            child={Statistics}
          />
          <PrivateRoute
            path={"/currency"}
            exact
            redirectTo={"/"}
            component={HomeMobile}
            child={CurrencyExchange}
          />
          <PrivateRoute
            path={"/addincome"}
            exact
            redirectTo={"/"}
            type={"Add Income"}
            radioButtonData={income}
            component={HomeMobile}
            child={AddTransactionMobile}
          />
          <PrivateRoute
            path={"/addcost"}
            exact
            redirectTo={"/"}
            type={"Add Cost"}
            radioButtonData={costs}
            component={HomeMobile}
            child={AddTransactionMobile}
          />
        </Switch>
        <Notification />
      </Suspense>
    </>
  );
}

export default App;
