
import React, { Component, Suspense, lazy } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

// Using containers, components
import NotificationZone from "../../components/SnackbarNotificationWrapper";
import Login from "../../containers/Login/container";
import AccountInfo from "../../containers/AccountInfo/container";

import LeaveRequestDetail from "../../components/LeaveRequestDetail";
// -- just demo lazy load
const AbsenceLetter = lazy(() =>
  import("../../containers/AbsenceLetter/container")
);
const Calendar = lazy(() => import("../../components/calendar/Calendar"));
const DemoUI = lazy(() => import("../../components/demoUI"));

const MainRouter = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        path="/calendar"
        component={() => (
          <Suspense fallback={<div>Loading...</div>}>
            <Calendar />
          </Suspense>
        )}
      />
      <Route
        path="/leaveForm"
        component={() => (
          <Suspense
            fallback={
              <div>
                <CircularProgress />
              </div>
            }
          >
            <AbsenceLetter />
          </Suspense>
        )}
      />
      <Route
        path="/demoUI"
        component={() => (
          <Suspense
            fallback={
              <div>
                <CircularProgress />
              </div>
            }
          >
            <DemoUIWrapper />
          </Suspense>
        )}
      />
      <Route path="/login" component={LoginForm} />
      <Route path="/account/edit" component={AccountInfo} />
      <Route path="/leave-letter/detail" component={LeaveRequestDetail} />
    </Switch>
  </Router>
);

const Home = () => {
  return (
    <ol>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/calendar">Calendar</Link>
      </li>
      <li>
        <Link to="/leaveForm">Leaving Form</Link>
      </li>
      <li>
        <Link to="/demoUI">Demo UI</Link>
      </li>
      <li>
        <Link to="/login">Login Form</Link>
      </li>
      <li>
        <Link to="/account/edit">Edit account info</Link>
      </li>
      <li>
        <Link to="/leave-letter/detail">Leave request detail</Link>
      </li>
    </ol>
  );
};
// =======
// import React, { Component, Suspense, lazy } from 'react';
// import './App.css';
// import {BrowserRouter, Route, Link, Switch } from 'react-router-dom';
// import routes from '../../routes/index';

// import PrivateRoute from '../../components/PrivateRoute';
// import NotificationZone from '../../components/SnackbarNotificationWrapper';
// >>>>>>> [FE] - Integrating `react-router`, Add `routes`, Handle `privateRoute`

// import CssBaseline from '@material-ui/core/CssBaseline';


const LoginForm = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

const DemoUIWrapper = () => {
  return (
    <div>
      <DemoUI />
    </div>
  );
};
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
// =======
//     const screens = routes.map(({ path, isPrivate, exact, comp }, index) => 
//       isPrivate === true ? (
//         <PrivateRoute key={index} path={path} exact={exact} component={comp}/>
//       ) : (
//         <Route key={index} path={path} exact={exact} component={comp}/>
//       )
//     );
//     console.log(`App.js -> screens: `, screens);
//     return (
//       <BrowserRouter>
//         <div className="App">
//           <CssBaseline />
//           <main>
//             <Switch>{screens}</Switch>
//           </main>
//           <NotificationZone />
//         </div>
//       </BrowserRouter>
// >>>>>>> [FE] - Integrating `react-router`, Add `routes`, Handle `privateRoute`
    );
  }
}

export default App;
