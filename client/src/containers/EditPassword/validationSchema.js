import * as Yup from 'yup';

const YupValidationSchema = Yup.object().shape({
  fPassword: Yup.string()
              .min(6, `"Password" max length is ${6}`)
              .required(`"Password" can't be empty`),
  fNewPassword: Yup.string()
              .min(6, `"New password" max length is ${6}`)
              .required(`"NewPassword" can't be empty`),
});

export default YupValidationSchema;