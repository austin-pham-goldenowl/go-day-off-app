import * as Yup from 'yup';

const YupValidationSchema = Yup.object().shape({
  fNewPassword: Yup.string()
              .min(6, `"Password" max length is ${6}`)
              .required(`"Password" can't be empty`),
});

export default YupValidationSchema;