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
    leaveType: Yup.number().required('Required'),
    startDate: Yup.date().required('Required'),
    endDate: Yup.date().required('Required'),
    approver: Yup.string().required('Required'),
    informTo: Yup.array(),
    reason: Yup.string().required(),
});
export default AbsenceLetterSchema;