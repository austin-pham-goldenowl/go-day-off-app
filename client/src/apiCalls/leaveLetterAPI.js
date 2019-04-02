import axios from 'axios'
import PropTypes from 'prop-types'
import { getCookie } from 'tiny-cookie'

//constants
import { SERVER_HOST_DEV } from '../constants/api'
import { userTypes } from '../constants/permission';
import { ACCESS_TOKEN_KEY } from '../constants/token';
import { REJECT_TYPE } from '../constants/rejectType';
import { 
  LEAVE_REQUEST_PENDING, 
  LEAVE_REQUEST_APPROVED,
} from '../constants/requestStatusType';

//helpers
import { getUserId, getUserEntity } from '../helpers/authHelpers'

// General header params for some methods
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'

// Promise Functions
export const getLeaveLetterDetails = id =>
  axios.get(`${SERVER_HOST_DEV}/leaveLetter/details?id=${id}`, {
    headers: {
      'x-access-token': getCookie(ACCESS_TOKEN_KEY)
    }
  });

export const getAllLeaveLetters = (page = 1, size = 10) =>
  axios.get(`${SERVER_HOST_DEV}/leaveLetter?page=${page}&size=${size}`, {
    headers: {
      'x-access-token': getCookie(ACCESS_TOKEN_KEY)
    }
  });

export const getMyLeaveLetters = (
  page = 1,
  size = 10,
  demandUserId = getUserId()
) => 
  axios.get(
    `${SERVER_HOST_DEV}/leaveLetter/my-letters?userId=${demandUserId}&page=${page}&size=${size}`,
    {
      headers: {
        'x-access-token': getCookie(ACCESS_TOKEN_KEY)
      }
    }
  );

export const createLeaveLetter = letterEntity => {
  return axios.post(
    `${SERVER_HOST_DEV}/leaveletter`,
    {
      absenceType: letterEntity.leaveType,
      fromDT: letterEntity.startDate,
      toDT: letterEntity.endDate,
      status: LEAVE_REQUEST_PENDING, // This must be set on the server-side
      substituteId: letterEntity.substituteId,
      userId: getUserId(),
      approver: letterEntity.approver,
      informTo:letterEntity.informTo,
      reason:
        letterEntity.otherReason !== ''
          ? letterEntity.otherReason
          : letterEntity.reason
    },
    {
      headers: {
        'x-access-token': getCookie(ACCESS_TOKEN_KEY)
      }
    }
  );
};

export const rejectLeaveLetterRequest = (letterId, rejectReason) => {
  //get the permission info
  let { userType } = getUserEntity();

  return axios.post(`${SERVER_HOST_DEV}/reject`, {
      letterId: letterId,
      reason: rejectReason,
      rejectType: userType && (userType === userTypes.MODE_PERSONNEL 
        ? REJECT_TYPE.BY_SELF : REJECT_TYPE.BY_APPROVER),
    },
    {
      headers: {
        'x-access-token': getCookie(ACCESS_TOKEN_KEY)
      }
    }
  );
}

export const approveLeaveLetterRequest = (letterId, userId) => {
  return axios.patch(`${SERVER_HOST_DEV}/leaveletter`, 
    {
      'id': letterId,
      'info': {
        'status': LEAVE_REQUEST_APPROVED,
        'userId': userId,
      }
    },
    {
      headers: {
        'x-access-token': getCookie(ACCESS_TOKEN_KEY)
      }
    }
  );
};
