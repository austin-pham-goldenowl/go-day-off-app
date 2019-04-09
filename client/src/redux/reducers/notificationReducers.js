import {
  NOTIF_SHOW,
  NOTIF_HIDE,
  NOTIF_LASTEST
} from "../contants/notificationContants";

const initialState = {
  show: false,
  type: "",
  message: ""
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIF_SHOW: {
      return {
        ...state,
        show: true,
        type: action.payload.type,
        message: action.payload.message,
        autoHide: action.payload.autoHide
      };
    }
    case NOTIF_HIDE: {
      return {
        ...state,
        show: false
      };
    }
    case NOTIF_LASTEST: {
      return {
        ...state,
        show: false
      };
    }
    default:
      return {
        ...state,
        show: false
      };
  }
};

export default notificationReducer;
