import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function PrivateRoute({
  component: Component,
  redirectTo,
  child: Child,
  ...routeProps
}) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  return (<Route
    {...routeProps}
    render={props =>
      isAuthenticated ? <Component {...props} ><Child {...props} /></Component> : <Redirect to={redirectTo} />
    }
  />)
}