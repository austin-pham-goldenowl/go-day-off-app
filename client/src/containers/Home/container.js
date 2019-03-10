import React from 'react';
import { Redirect } from 'react-router-dom';
// import { 
//   getUserEntity 
// } from '../../helpers/authHelpers'; 
// import * as UserPermission from '../../constants/permission';

const Home = (props) => {
  // const userType = getUserEntity('fTypeId'); FOR FUTURE USAGE
  return <Redirect to='/dashboard'/>
}

export default Home;