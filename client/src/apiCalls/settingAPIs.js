import axios from 'axios';
import { getCookie } from 'tiny-cookie';
import { SERVER_HOST_DEV } from '../constants/api';
import { ACCESS_TOKEN_KEY } from '../constants/token';

// General header params for some methods
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';

export const getAllSettings = () =>
  axios.get(`${SERVER_HOST_DEV}/setting`, {
    headers: {
      "x-access-token": getCookie(ACCESS_TOKEN_KEY)
    }
  });

export const saveSettings = pairs =>
  axios.post(`${SERVER_HOST_DEV}/setting`,
    { pairs },
    {
      headers: {
        "x-access-token": getCookie(ACCESS_TOKEN_KEY)
      }
    });