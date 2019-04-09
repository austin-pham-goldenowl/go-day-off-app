import { 
  LETTER_FILTER_CHANGE_ALL,
  LETTER_FILTER_CHANGE_STATUS,
  LETTER_FILTER_CHANGE_TODATE,
  LETTER_FILTER_CHANGE_FROMDATE,
} from '../contants/letterFilterContants';

export const letterFilterChangeAll = ({fromDate, toDate, status}) => ({
  type: LETTER_FILTER_CHANGE_ALL,
  payload: {
    fromDate,
    toDate,
    status
  }
});

export const letterFilterChangeFromDate = (fromDate) => ({
  type: LETTER_FILTER_CHANGE_FROMDATE,
  payload: {
    fromDate
  }
});


export const letterFilterChangeToDate = (toDate) => ({
  type: LETTER_FILTER_CHANGE_TODATE,
  payload: {
    toDate
  }
});


export const letterFilterChangeStatus = (status) => ({
  type: LETTER_FILTER_CHANGE_STATUS,
  payload: {
    status
  }
});