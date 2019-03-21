import moment from 'moment';

export const compareJsonObjectValue = (obj1, obj2) => {
  return (
    typeof obj1 === 'object' &&
    typeof obj2 === 'object' &&
    JSON.stringify(obj1) === JSON.stringify(obj2)
  );
};

/**
 *
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
