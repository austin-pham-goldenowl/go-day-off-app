import axios from 'axios';
import { SERVER_HOST_DEV } from '../constants/api';

//Global general configurations
axios.defaults.headers.post['Content-Type'] = 'application/json';


//
export const userLogin = async (payload) => {
  return axios.post(`${SERVER_HOST_DEV}/login`, 
    {
      'username': payload.username,
      'rawPwd': payload.rawPwd,
    },
  )
}

