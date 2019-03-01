import * as Actions from './actionType';

export function changeLeaveType(payload) {
  console.log('AbsenceLetterReducer/CHANGE_LEAVE_TYPE');
  return {
    type: Actions.CHANGE_LEAVE_TYPE,
    payload
  }
}

export function changeDateStart(payload) {
  console.log('AbsenceLetterReducer/CHANGE_DATE_START');
  return {
    type: Actions.CHANGE_DATE_START,
    payload
  }
}

export function changeDateEnd(payload) {
  console.log('AbsenceLetterReducer/CHANGE_DATE_END');
  return {
    type: Actions.CHANGE_DATE_END,
    payload
  }
}

export function changeApprover(payload) {
  console.log('AbsenceLetterReducer/CHANGE_APPROVER');
  return {
    type: Actions.CHANGE_APPROVER,
    payload
  }
}

export function changeInformTo(payload) {
  console.log('AbsenceLetterReducer/CHANGE_INFORM_TO');
  return {
    type: Actions.CHANGE_INFORM_TO,
    payload
  }
}

export function changeReason(payload) {
  console.log('AbsenceLetterReducer/CHANGE_REASON');
  return {
    type: Actions.CHANGE_REASON,
    payload
  }
}