import React from 'react';
import { Redirect } from 'react-router-dom';
import { signOut } from '../../helpers/authHelpers';

export default () => {
  signOut();
  return <Redirect to='/login' />
}