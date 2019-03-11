import {
  LEAVE_REQUEST_PENDING,
  LEAVE_REQUEST_APPROVED,
  LEAVE_REQUEST_REJECTED
} from '../constants/requestStatusType';
import PropTypes from 'prop-types';
const leaveTypesDescription = {1: 'Việc cá nhân', 2: 'Nghỉ ốm', 3: 'Nghỉ phép năm', 4: 'Nghỉ chế độ'};
const leaveReqStatusDescription = {
  [LEAVE_REQUEST_PENDING]: 'Pending',
  [LEAVE_REQUEST_APPROVED]: 'Approved',
  [LEAVE_REQUEST_REJECTED]: 'Rejected', 
}

export const getLeaveType = (typeCode) => {
  return leaveTypesDescription[typeCode];
}

export const getLeaveReqStatus = (typeCode) => {
  return leaveReqStatusDescription[typeCode];
}

getLeaveType.propTypes = {
  typeCode: PropTypes.number.isRequired,
}
getLeaveReqStatus.propTypes = {
  typeCode: PropTypes.number.isRequired
}