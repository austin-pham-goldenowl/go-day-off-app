import GenderTypesDescription, { GENDER_TYPE_FEMALE, GENDER_TYPE_MALE, GENDER_TYPE_OTHERS } from '../genderTypes';

// Mockup data
export const mockupLeaveLetterReasons = [
  {
    value: 'Bị ốm',
    label: 'Bị ốm'
  },
  {
    value: 'Giải quyết việc gia đình',
    label: 'Giải quyết việc gia đình'
  },
  {
    value: 'Có lịch hẹn khám bệnh',
    label: 'Có lịch hẹn khám bệnh'
  },
  {
    value: 'Áp lực công việc',
    label: 'Áp lực công việc'
  },
  {
    value: 'Lý do khác',
    label: 'Lý do khác'
  }
];


export const mockupGender = [
  {
    value: GENDER_TYPE_FEMALE,
    label: GenderTypesDescription[GENDER_TYPE_FEMALE]
  },
  {
    value: GENDER_TYPE_MALE,
    label: GenderTypesDescription[GENDER_TYPE_MALE]
  },
  {
    value: GENDER_TYPE_OTHERS,
    label: GenderTypesDescription[GENDER_TYPE_OTHERS]
  }
];