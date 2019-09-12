import React from 'react';

import Home from '../containers/Home';
import SignIn from '../containers/SignIn';
import SignOut from '../containers/SignOut';
import NotFound from '../components/NotFound';
import Settings from '../containers/Settings';
import Dashboard from '../containers/Dashboard';
import MyLetters from '../containers/MyLetters';
import EditAccountInfo from '../containers/EditAccountInfo';
import UsersManagement from '../containers/UsersManagement';
import LeaveRequestDetail from '../containers/LeaveRequestDetail';
import AbsenceLetterCreate from '../containers/CreateLeaveLetter';
import CreateNewUserAccout from '../containers/CreateNewUserAccount';
import AllLettersManagement from '../containers/AllLettersManagement';
import BookingRoom from '../containers/BookingRoom';
import CreateBookingRoom from '../containers/CreateBookingRoom';
import ChangePassword from '../containers/EditPassword';

const routes = [
  {
    path: '/',
    isPrivate: true,
    exact: true,
    comp: props => <Home {...props} />
  },
  {
    path: '/login',
    isPrivate: false,
    exact: false,
    comp: props => <SignIn {...props} />
  },
  {
    path: '/logout',
    isPrivate: false,
    exact: false,
    comp: props => <SignOut {...props} />
  },
  {
    path: '/dashboard',
    isPrivate: true,
    exact: true,
    comp: props => <Dashboard {...props} />
  },
  {
    path: '/booking-meeting',
    isPrivate: true,
    exact: true,
    comp: props => <BookingRoom {...props} />
  },
  {
    path: '/booking-meeting-request/create',
    isPrivate: true,
    exact: true,
    comp: props => <CreateBookingRoom {...props} />
  },
  {
    path: '/leave-request/create',
    isPrivate: true,
    exact: true,
    comp: props => <AbsenceLetterCreate {...props} />
  },
  {
    path: '/account/info/:id',
    isPrivate: true,
    exact: true,
    comp: props => <EditAccountInfo {...props} />
  },
  {
    path: '/create-user',
    isPrivate: true,
    exact: true,
    comp: props => <CreateNewUserAccout {...props} />
  },
  {
    path: '/leave-request/:id',
    isPrivate: true,
    exact: true,
    comp: props => <LeaveRequestDetail {...props} />
  },
  {
    path: '/leave-requests',
    isPrivate: true,
    exact: true,
    comp: props => <AllLettersManagement {...props} />
  },
  {
    path: '/my-letters',
    isPrivate: true,
    exact: true,
    comp: props => <MyLetters {...props} />
  },
  {
    path: '/setting',
    isPrivate: true,
    exact: true,
    comp: props => <Settings {...props} />
  },
  {
    path: '/users-management',
    isPrivate: true,
    exact: true,
    comp: props => <UsersManagement {...props}/>
  },
  {
    path: '/password/:id',
    isPrivate: true,
    exact: true,
    comp: props => <ChangePassword {...props}/>
  },
  {
    path: '',
    isPrivate: false,
    exact: false,
    comp: props => <NotFound {...props} />
  }
];

export default routes;
