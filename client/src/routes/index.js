import React from "react";

import NotFound from "../components/NotFound";
import Home from "../containers/Home";
import SignIn from "../containers/SignIn";
import SignOut from "../containers/SignOut";

import AbsenceLetterCreate from "../containers/CreateLeaveLetter";
import AccountInfo from "../containers/AccountInfo";
import Dashboard from "../containers/Dashboard";
import AllLettersManagement from "../containers/AllLettersManagement";
import LeaveRequestDetail from "../containers/LeaveRequestDetail";
import MyLetters from "../containers/MyLetters";

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
    path: "/leave-request/details",
    isPrivate: true,
    exact: true,
    comp: props => <LeaveRequestDetail {...props} />
  },
  {
    path: "/leave-request/all",
    isPrivate: true,
    exact: true,
    comp: props => <AllLettersManagement {...props} />
  },
  {
    path: "/my-letters",
    isPrivate: true,
    exact: true,
    comp: props => <MyLetters {...props} />
  },
  {
    path: "",
    isPrivate: false,
    exact: false,
    comp: props => <NotFound {...props} />
  }
];

export default routes;
