import React, { Component, Suspense, lazy } from "react";
import "./Router.css";
import { Route, Switch } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

// Using containers, components
import NotificationZone from "../../components/SnackbarNotificationWrapper";
import Dashboard from "../Dashboard";
import Login from "../../containers/login/container";
import AccountInfo from "../accountInfo/container";
import LeaveRequestDetail from "../../components/LeaveRequestDetail";
// -- just demo lazy load
const AbsenceLetter = lazy(() =>
  import("../../containers/absenceLetter/container")
);
const Calendar = lazy(() => import("../../components/calendar/Calendar"));
const DemoUI = lazy(() => import("../../components/demoUI"));

const MainRouter = () => (
  <Switch>
    <Route
      exact
      path="/"
      component={() => (
        <Suspense fallback={<div>Loading...</div>}>
          <Dashboard />
        </Suspense>
      )}
    />
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
);

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
class AppRouter extends Component {
  render() {
    return (
      <div className="App">
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

export default AppRouter;
