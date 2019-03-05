import * as Actions from './actionType';

const initialState = {
  content: {
    leaveType: 1,
    startDate: new Date(),
    endDate: new Date(),
    approver: { id: '222', label: 'Nguyen Quoc Cuong', value: '@awfawfawf'},
    informTo: [
      {
        id: '333', 
        label: 'Nguyen Quoc Cuong', 
        value: '@awfawfawf',
      },
      {
        id: '444', 
        label: 'Tran Thi B', 
        value: '@a30awfawef',
      },
    ],
    reason: '(reason goes here)',
  },
  status: {
    label: 'CREATING',
    value: 1,
  },
};

function absenceLetterReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.CHANGE_LEAVE_TYPE: {
      return {
        ...state,
        content: {
          ...state.content,
          leaveType: action.payload
        },
      }
    }
    case Actions.CHANGE_DATE_START: {
      return {
        ...state,
        content: {
          ...state.content,
          startDate: action.payload
        },
      }
    }
    case Actions.CHANGE_DATE_END: {
      return {
        ...state,
        content: {
          ...state.content,
          endDate: action.payload
        },
      }
    }
    case Actions.CHANGE_APPROVER: {
      return {
        ...state,
        content: {
          ...state.content,
          approver: action.payload
        },
      }
    }
    case Actions.CHANGE_INFORM_TO: {
      return {
        ...state,
        content: {
          ...state.content,
          informTo: action.payload
        },
      }
    }
    case Actions.CHANGE_REASON: {
      return {
        ...state,
        reason: action.payload
      }
    }
    case Actions.SEND_LEAVE_REQUEST: {
      return {
        ...state,
      }
    }
    case Actions.DISCARD_LEAVE_REQUEST: {
      return {
        ...state,
      }
    }
    case Actions.RESOLVED_LOADED_DATA: {
      return {
        ...state,
      }
    }
    default: return {
      ...state
    }
  }
}

export default absenceLetterReducer;