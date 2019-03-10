import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkAuth } from '../helpers/authHelpers';

const PrivateRoute = ({ component: Comp, ...rest }) => {
  return (
    <Route 
      {...rest}
      render={props => 
        checkAuth() ? (
          <Comp {...props}/>
        ) : (
          <Redirect 
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;