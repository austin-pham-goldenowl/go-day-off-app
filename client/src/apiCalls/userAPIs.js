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

export const createNewUser = userEntity => {
  return axios.post(
    `${SERVER_HOST_DEV}/auth/account`,
    {
      ...userEntity
    },
    {
      headers: {
        'x-access-token': getCookie(ACCESS_TOKEN_KEY)
      }
    }
  );
};

export const updateProfile = profileEntity => {
  let parsedEntity = {
    firstName: profileEntity.fFirstName,
    lastName: profileEntity.fLastName,
    bday: new Date(),
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

//
export const getAllApprover = () => {
  return axios.get(`${SERVER_HOST_DEV}/user/approver`, {
    headers: {
      'x-access-token': getCookie(ACCESS_TOKEN_KEY)
    }
  });
};

export const getAllInformTo = () => {
  return axios.get(`${SERVER_HOST_DEV}/user/team-leader`, {
    headers: {
      'x-access-token': getCookie(ACCESS_TOKEN_KEY)
    }
  });
};

export const getAllSubsitutes = () => {
  let id = getUserId();
  console.log(`[UserAPIs] -> getAllSubsitutes: `);
  console.log(`-> userId: ${id}}`);
  return axios.get(`${SERVER_HOST_DEV}/user/substitutes`, {
    headers: {
      'x-access-token': getCookie(ACCESS_TOKEN_KEY)
    }
  });
};

export const getAllSubsitutesByUserId = userId => {
  console.log(`[UserAPIs] -> getAllSubsitutes: `);
  console.log(`-> userId: ${userId}}`);
  return axios.get(`${SERVER_HOST_DEV}/user/substitutes?id=${userId}`, {
    headers: {
      'x-access-token': getCookie(ACCESS_TOKEN_KEY)
    }
  });
};