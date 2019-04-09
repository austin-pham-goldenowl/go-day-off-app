import { combineReducers } from 'redux';

import notificationReducers from './notificationReducers';
import letterFilterReducers from './letterFilterReducers';

export default combineReducers({
  notificationReducers,
  letterFilterReducers
});