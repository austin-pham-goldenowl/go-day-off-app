import GenderTypeValues from '../constants/genderTypes';
import * as GenderTypes from '../constants/genderTypes';

export const getGenderName = typeCode => {
  switch (typeCode) {
    case GenderTypes.GENDER_TYPE_FEMALE:
    case GenderTypes.GENDER_TYPE_MALE:
    case GenderTypes.GENDER_TYPE_OTHERS: {
      return GenderTypeValues[typeCode];
    }
    default:
      return 'N/A';
  }
};
