import React from 'react';

import NotFound from '../components/NotFound';
import Home from '../containers/Home/container';
import SignIn from '../containers/Login/container';
import SignOut from '../containers/SignOut/container';

import DashboardWrapper from '../containers/DashboardWrapper/container';
import AbsenceLetterCreate from '../containers/AbsenceLetter/container';
import AccountInfo from '../containers/AccountInfo/container';

// import EditAccountInfo from '../containers/EditAccountInfo/container';

const routes = [
  {
    path: '/',
    isPrivate: true,
    exact: true,
    comp: props => (<Home {...props}/>)
  },
  {
    path: '/login',
    isPrivate: false,
    exact: false,
    comp: props => (<SignIn {...props}/>)
  },
  {
    path: '/logout',
    isPrivate: false,
    exact: false,
    comp: props => (<SignOut {...props}/>)
  },
  {
    path: '/dashboard',
    isPrivate: true,
    exact: true,
    comp: props => (<DashboardWrapper {...props}/>)
  },
  {
    path: '/leave-request/create',
    isPrivate: true,
    exact: true,
    comp: props => (<AbsenceLetterCreate {...props}/>)
  },
  // {
  //   path: '/leave-request/detail',
  //   isPrivate: true,
  //   exact: true,
  //   comp: props => (<ListAbsenceDefault {...props}/>)
  // },
    // {
  //   path: '/leave-request/all',
  //   isPrivate: true,
  //   exact: true,
  //   comp: props => (<ListAbsenceAll {...props}/>)
  // },
  {
    path: '/account/info',
    isPrivate: true,
    exact: true,
    comp: props => (<AccountInfo {...props}/>)
  },
  // {
  //   path: '/account/edit',
  //   isPrivate: true,
  //   exact: true,
  //   comp: props => (<EditAccountInfo {...props}/>)
  // },
  {
    path: '/',
    isPrivate: false,
    exact: false,
    comp: props => (<NotFound {...props}/>)
  },
  {
    path: '',
    isPrivate: false,
    exact: false,
    comp: props => (<NotFound />)
  },
];

export default routes;