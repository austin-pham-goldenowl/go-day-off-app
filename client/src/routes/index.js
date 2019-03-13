import React from "react";

import NotFound from "../components/NotFound";
import Home from "../containers/Home/container";
import SignIn from "../containers/login/container";
import SignOut from "../containers/SignOut/container";

import AbsenceLetterCreate from "../containers/absenceLetter/container";
import AccountInfo from "../containers/accountInfo/container";
import Dashboard from "../containers/Dashboard";
import AllLettersManagement from "../containers/AllLettersManagement";
import LeaveRequestDetail from '../containers/LeaveRequestDetail'

// import EditAccountInfo from '../containers/EditAccountInfo/container';

const routes = [
  {
    path: "/",
    isPrivate: true,
    exact: true,
    comp: props => <Home {...props} />
  },
  {
    path: "/login",
    isPrivate: false,
    exact: false,
    comp: props => <SignIn {...props} />
  },
  {
    path: "/logout",
    isPrivate: false,
    exact: false,
    comp: props => <SignOut {...props} />
  },
  {
    path: "/dashboard",
    isPrivate: true,
    exact: true,
    comp: props => <Dashboard {...props} />
  },
  {
    path: "/leave-request/create",
    isPrivate: true,
    exact: true,
    comp: props => <AbsenceLetterCreate {...props} />
  },
  {
    path: "/account/info",
    isPrivate: true,
    exact: true,
    comp: props => <AccountInfo {...props} />
  },
  // {
  //   path: '/account/edit',
  //   isPrivate: true,
  //   exact: true,
  //   comp: props => (<EditAccountInfo {...props}/>)
  // },
  {
    path: '/leave-request/details',
    isPrivate: true,
    exact: true,
    comp: props => (<LeaveRequestDetail {...props}/>)
  },
  {
    path: "/leave-request/all",
    isPrivate: true,
    exact: true,
    comp: props => <AllLettersManagement {...props} />
  },
  {
    path: "",
    isPrivate: false,
    exact: false,
    comp: props => <NotFound {...props} />
  }
];

export default routes;
