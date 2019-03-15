import axios from 'axios';
import { getCookie } from 'tiny-cookie';
import { SERVER_HOST_DEV } from '../constants/api';
import { ACCESS_TOKEN_KEY } from '../constants/token';

import { getUserId } from '../helpers/authHelpers';

//Global headers configurations
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const getProfile = id => {
  return axios.get(`${SERVER_HOST_DEV}/user/profile?id=${id}`, {
    headers: {
      'x-access-token': getCookie(ACCESS_TOKEN_KEY)
    }
  });
};

export const updateProfile = profileEntity => {
  let parsedEntity = {
    firstName: profileEntity.fFirstName,
    lastName: profileEntity.fLastName,
    phone: profileEntity.fPhone,
    email: profileEntity.fEmail,
    gender: profileEntity.fGender
  };
  let id = getUserId();
  console.log(`id: `, id);
  console.log(`parsedEntity: `, parsedEntity);
  return axios.patch(
    `${SERVER_HOST_DEV}/user/profile`,
    {
      id: getUserId(),
      info: {
        ...parsedEntity
      }
    },
    {
      headers: {
        'x-access-token': getCookie(ACCESS_TOKEN_KEY)
      }
    }
  );
};
