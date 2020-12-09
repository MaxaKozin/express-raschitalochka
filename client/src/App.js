import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import {
  PrivateRoute,
  PublicRoute,
} from "./common";
import Login from "./views/Login";
import Registration from "./views/Registration";
import Home from "./views/Home";
import HomeMobile from "./views/Home/Mobile";
import {
  setIsDesktop,
  setIsMobile,
  setIsTablet,
} from "./redux/resolution/resolution-operations";
// import * as routes from './constants/routes';
import "./css/styles.css";
import { Dashboard, CurrencyExchange } from "./components";

function Statistics() {
  return (
    <h1>STATISTICS</h1>
  )
}
function AddIncome() {
  return (
    <h1>Add Income</h1>
  )
}
function AddCost() {
  return (
    <h1>Add Costs</h1>
  )
}

function App() {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(window.screen.width);

  const changeWidth = () => {
    setWidth(window.screen.width);
  };

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
    <div>
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
          component={HomeMobile}
          child={AddIncome}
        />
        <PrivateRoute
          path={"/addcost"}
          exact
          redirectTo={"/"}
          component={HomeMobile}
          child={AddCost}
        />
      </Switch>
    </div>
  );
}

export default App;
