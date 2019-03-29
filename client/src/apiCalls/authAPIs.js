import axios from 'axios';
import { SERVER_HOST_DEV } from '../constants/api';
axios.defaults.headers.post['Content-Type'] = 'application/json';


//
export const login = (payload) => {
  return axios.post(`${SERVER_HOST_DEV}/auth/login`, 
    {
      'username': payload.username,
      'rawPwd': payload.rawPwd,
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
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
        headers: {
          'x-ref-token': refToken
        }
      }
    );
  } else return '[error] getNewToken'
  //Redirect to login/
}
