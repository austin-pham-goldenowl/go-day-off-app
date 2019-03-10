import axios from 'axios';
import { getCookie } from 'tiny-cookie';
import { SERVER_HOST_DEV } from '../constants/api';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../constants/token';

//Global headers configurations
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getProfile = () => {
  return axios.get(`${SERVER_HOST_DEV}/api/user/profile`, 
    {}, //body
    { //config
      headers: {
        'x-access-token': getCookie(ACCESS_TOKEN_KEY)
      }
    }
  )
}