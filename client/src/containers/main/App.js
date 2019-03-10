import React, { Component, Suspense, lazy } from 'react';
import './App.css';
import {BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import routes from '../../routes/index';

import PrivateRoute from '../../components/PrivateRoute';
import NotificationZone from '../../components/SnackbarNotificationWrapper';

import CssBaseline from '@material-ui/core/CssBaseline';

// Using containers, components

// demo lazy load
// const DemoUI = lazy(() => import('../../components/DemoUI'));
      // <Route path="/demoUI" component={
      //   () => (
      //     <Suspense fallback={<div><CircularProgress /></div>}>
      //       <DemoUIWrapper/>
      //     </Suspense>
      //   )
      // }/>
////////////////////////////////////////////////
class App extends Component {

  render() {
    const screens = routes.map(({ path, isPrivate, exact, comp }, index) => 
      isPrivate === true ? (
        <PrivateRoute key={index} path={path} exact={exact} component={comp}/>
      ) : (
        <Route key={index} path={path} exact={exact} component={comp}/>
      )
    );
    console.log(`App.js -> screens: `, screens);
    return (
      <BrowserRouter>
        <div className="App">
          <CssBaseline />
          <main>
            <Switch>{screens}</Switch>
          </main>
          <NotificationZone />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;