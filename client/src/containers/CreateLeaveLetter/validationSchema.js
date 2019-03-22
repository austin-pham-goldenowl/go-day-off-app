import * as Yup from 'yup';
/**
 *     leaveType: 1,
    startDate: new Date(),
    endDate: new Date(),
    approver: {},
    informTo: [],
    reason: '',
    otherReason: '',
 */
const AbsenceLetterSchema = Yup.object().shape({
  leaveType: Yup.number().required(`'Leave type' is required.`),
  startDate: Yup.date().required(`'From date' is required.`),
  endDate: Yup.date().required(`'End date' is required.`),
  approver: Yup.string()
    .min(1)
    .required(`'Approver' is required.`),
  informTo: Yup.array().required(`'Inform to' is required.`),
  reason: Yup.string().required(`'Reason' is required.`)
});
export default AbsenceLetterSchema;
