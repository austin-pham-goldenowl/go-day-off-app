import axios from "axios";
import { getCookie } from "tiny-cookie";
import { SERVER_HOST_DEV } from "../constants/api";
import { ACCESS_TOKEN_KEY } from "../constants/token";

//General header params for some methods
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';

export const getLeaveLetterDetails = id =>
  axios.get(`${SERVER_HOST_DEV}/leaveLetter/details?id=${id}`,{}, {
    headers: {
      "x-access-token": getCookie(ACCESS_TOKEN_KEY)
    }
  });

export const getAllLeaveLetters = () =>
  axios.get(`${SERVER_HOST_DEV}/leaveLetter/`, {
    headers: {
      "x-access-token": getCookie(ACCESS_TOKEN_KEY)
    }
  });

export const getMyLeaveLetters = () =>
  axios.get(`${SERVER_HOST_DEV}/leaveLetter/my-letters`, {
    headers: {
      "x-access-token": getCookie(ACCESS_TOKEN_KEY)
    }
  });
export const createLeaveLetter = (letterEntity) => {
  console.log(`leaveLetterAPI -> createLeaveLEtter -> letterEntity: `,letterEntity);
  return axios.post(`${SERVER_HOST_DEV}/leaveletter`, 
    {
      "absenceType": letterEntity.absenceType,
      "fromDT": letterEntity.fromDT,
      "status": 1,
      "substituteId": "i53FItHeMK",
      "toDT": "2019-02-17T16:29:56.000Z",
      "userId": "MytsQhUPQG"
    },
    {
      headers: {
        'x-access-token': getCookie(ACCESS_TOKEN_KEY)
      }
    }
  )
}

export const updateLetterStatus = (letterId, statusKey) => {
  console.log(`LeaveLetterAPI -> updateLetterStatus -> status: `, statusKey);
  return axios.patch(`${SERVER_HOST_DEV}/leaveletter`, 
  {
    "id": letterId,
    "info": {
      "status": statusKey,
    },
  },
  {
    headers: {
      'x-access-token': getCookie(ACCESS_TOKEN_KEY)
    }
  })
}
