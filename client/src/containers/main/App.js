import React, { Component, Suspense, lazy } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

// Using containers, components
import NotificationZone from '../../components/SnackbarNotificationWrapper';
import Login from '../../containers/Login/container';
import AccountInfo from '../../containers/AccountInfo/container';

import LeaveRequestDetail from '../../components/LeaveRequestDetail';
// -- just demo lazy load
const AbsenceLetter = lazy(() => import('../../containers/AbsenceLetter/container'));
const Calendar = lazy(() => import('../../components/Calendar'));
const DemoUI = lazy(() => import('../../components/DemoUI'));


const MainRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/calendar" component={
        () => (
          <Suspense fallback={<div>Loading...</div>}>
            <Calendar/>
          </Suspense>
        )
      }/>
      <Route path="/leaveForm" component={
        () => (
          <Suspense fallback={<div><CircularProgress /></div>}>
            <AbsenceLetter/>
          </Suspense>
        )
      }/>
      <Route path="/demoUI" component={
        () => (
          <Suspense fallback={<div><CircularProgress /></div>}>
            <DemoUIWrapper/>
          </Suspense>
        )
      }/>
      <Route path="/login" component={LoginForm}/>
      <Route path="/account/edit" component={AccountInfo}/>
      <Route path="/leave-letter/detail" component={LeaveRequestDetail}/>
    </Switch>
  </Router>
);

const Home = () => {
  return (
    <ol>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/calendar">Calendar</Link></li>
      <li><Link to="/leaveForm">Leaving Form</Link></li>
      <li><Link to="/demoUI">Demo UI</Link></li>
      <li><Link to="/login">Login Form</Link></li>
      <li><Link to="/account/edit">Edit account info</Link></li>
      <li><Link to="/leave-letter/detail">Leave request detail</Link></li>

    </ol>
  );
};

const LeaveForm = () => {
  return (
    <div>
      <h1>Leaving Form</h1>
      <AbsenceLetter />
    </div>
  );
};

const LoginForm = () => {
  return (
    <div>
      <Login />
    </div>
  )
}

const DemoUIWrapper = () => {
  return (
    <div>
      <DemoUI/>
    </div>
  )
}

class App extends Component {
  render() {
  return (
    <div className="App">
      <header>
        <div id="logo">
          <span>
            Golden Owl<b> Leaves</b>
          </span>
        </div>
      </header>
      <main>
        <MainRouter />
      </main>
      <NotificationZone />
    </div>
  );
  }
}

export default App;