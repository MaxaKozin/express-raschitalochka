import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PublicRoute({
  component: Component,
  redirectTo,
  ...routeProps
}) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  return (
    < Route
      {...routeProps}
      render={
        props =>
          isAuthenticated && routeProps.restricted ? (
            <Redirect to={redirectTo} />
          ) : (
              <Component {...props} />
            )
      }
    />)
}