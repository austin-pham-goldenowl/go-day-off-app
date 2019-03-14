import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    username: Yup.string().required(),
    rawPwd: Yup.string().required(),
})
export default LoginSchema;