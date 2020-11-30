import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import {
  // PrivateRoute,
  PublicRoute,
} from "./common";
import Login from "./views/Login";
import Registration from "./views/Registration";
import {
  setIsDesktop,
  setIsMobile,
  setIsTablet,
} from "./redux/resolution/resolution-operations";
// import * as routes from './constants/routes';
import "./css/styles.css";

function App() {
  const dispatch = useDispatch();
  const [width, setWidth] = useState(null);

  const changeWidth = () => {
    setWidth(window.innerWidth);
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
      </Switch>
    </div>
  );
}

export default App;
