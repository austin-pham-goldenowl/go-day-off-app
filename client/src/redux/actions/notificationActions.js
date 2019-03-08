import {
  NOTIF_SHOW,
  NOTIF_HIDE,
  NOTIF_LASTEST
} from '../contants/notificationContants';

export const showNotification = (type, message) => ({
  type: NOTIF_SHOW,
  payload: {
    type,
    message
  }
});

export const hideNotification = () => ({
  type: NOTIF_HIDE,
});

export const showLastedNotification = () => ({
  type: NOTIF_LASTEST
});