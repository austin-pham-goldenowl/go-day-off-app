import * as Yup from 'yup';
import { mockupLeaveLetterReasons } from '../../constants/mockups';
import { compareDatesWithoutTime } from '../../utilities';

export const YupValidationSchema = Yup.object().shape({
  name: Yup.string().required(`Name is required.`),
});

export const CustomValidationSchema = (values) => {
  let errors = {};
  //Validate OtherReason
  if (values.reason === mockupLeaveLetterReasons[mockupLeaveLetterReasons.length - 1].value 
    && values.otherReason === '') {
      errors.otherReason = `'Reason detail' can't be empty`;
  }
  if (compareDatesWithoutTime(values.startDate, values.endDate) === 1) {
    errors.startDate = `'From' date can't be after 'To' date`
  }
  return errors;
}