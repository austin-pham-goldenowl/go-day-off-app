import * as Yup from 'yup';

/**
 * Fields' maxLength
 * 
 * firstName: 30
 * lastName: 30
 * phone: 10
 * email: 45
 */
const YupValidationSchema = Yup.object().shape({
  fFirstName: Yup.string()
              .max(30, `"First name" max length is ${30}`)
              .required(`"First name" can't be empty`),
  fLastName: Yup.string()
            .max(30, `"Last name" max length is ${30}`)
            .required(`"Last name" can't be empty`),
  fEmail: Yup.string()
          .max(45, `"Email" max length is ${45}`)
          .required(`"Email" can't be empty`),
  fPhone: Yup.string()
          .min(10, `"Phone number" must be 10-character string`)
          .max(10, `"Phone number" must be 10-character string`)
          .required(`"Phone number" can't be empty`),
});

export default YupValidationSchema;