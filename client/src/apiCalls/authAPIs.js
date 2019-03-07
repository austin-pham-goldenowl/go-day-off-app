import axios from 'axios';
import { SERVER_HOST_DEV } from '../constants/api';
import { getRefToken, signOut } from '../helpers/authHelpers';
//Global general configurations
axios.defaults.headers.post['Content-Type'] = 'application/json';


//
export const login = (payload) => {
  console.log('authAPIs -> login -> payload: ', payload);
  return axios.post(`${SERVER_HOST_DEV}/login`, 
    {
      'username': payload.email,
      'rawPwd': payload.rawPwd,
    },
  )
}

export const signUp = (payload) => {
  //Do later
}

export const getNewToken = (refToken) => {
  if(refToken) {
    return axios.get(`${SERVER_HOST_DEV}/token`,
      {},
      {
        header: {
          'x-ref-token': refToken
        }
      }
    );
  } else return '[error] getNewToken'
  //Redirect to login/
}
