import axios from 'axios';
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

export const addNewSettings = settings =>
  axios.post(`${SERVER_HOST_DEV}/setting`,
    ...settings,
    {
      headers: {
        "x-access-token": getCookie(ACCESS_TOKEN_KEY)
      }
    });

export const updateSettings = settings =>
  axios.patch(`${SERVER_HOST_DEV}/setting`,
    ...settings,
    {
      headers: {
        "x-access-token": getCookie(ACCESS_TOKEN_KEY)
      }
    });