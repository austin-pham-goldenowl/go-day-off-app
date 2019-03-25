import moment from 'moment';

export const compareJsonObjectValue = (obj1, obj2) => {
  return (
    typeof obj1 === 'object' &&
    typeof obj2 === 'object' &&
    JSON.stringify(obj1) === JSON.stringify(obj2)
  );
};

/**
 * @todo
 * Subtract two Date, except Saturday and Sunday
 *
 * @param {moment} day1
 * @param {moment} day2
 *
 * @returns {number} totalday(s)
 */
export const calculateFullDayOff = (day1, day2) => {
  let date = moment(day2); //clone
  let counter = 0;
  while (date.dayOfYear() > day1.dayOfYear()) {
    if (date.isoWeekday() !== 6 && date.isoWeekday() !== 7) {
      counter++;
    }
    date = date.subtract(1, 'days');
  }
  return counter;
};

/**
 * @todo
 * Check if object's type is Date or Moment
 *
 * @param {moment || Date} date
 *
 * @returns true: valid date
 *          false: invalid date
 */
const isValidDate = date => {
  return (
    date &&
    (moment.isMoment(date) ||
      (Object.prototype.toString.call(date) === '[object Date]' &&
        !isNaN(date)))
  );
};

/**
 * @todo
 * Compare two date without comparing the time (hours, minutes and seconds)
 *
 * @param {moment} date1
 * @param {moment} date2
 *
 * @returns 1: date1 > date2
 *          0: date1 = date2
 *          -1: date1 < date2
 */
export const compareDatesWithoutTime = (date1, date2, options) => {
  if (isValidDate(date1) && isValidDate(date2)) {
    const d1 = moment(date1);
    const d2 = moment(date2);
    if (d1.isAfter(d2, 'day')) return 1;
    if (d1.isSame(d2, 'day')) return 0;
    return -1;
  } else {
    // throws 'invalid day input'
    return -1;
  }
};
