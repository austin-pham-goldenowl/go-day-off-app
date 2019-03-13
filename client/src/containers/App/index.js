import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";

// Using containers, components
import NotificationZone from "../../components/SnackbarNotificationWrapper";
import PrivateRoute from "../../components/PrivateRoute";

import routes from "../../routes";
const screens = routes.map(({ path, isPrivate, exact, comp }, index) =>
  isPrivate ? (
    <PrivateRoute key={index} path={path} exact={exact} component={comp} />
  ) : (
    <Route key={index} path={path} exact={exact} component={comp} />
  )
);

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <main>
        <Router>
          <Switch>{screens}</Switch>
        </Router>
      </main>
      <NotificationZone />
    </div>
  );
}

export default App;
