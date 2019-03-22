import * as Yup from 'yup';

const SettingSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email"),
    password: Yup.string("Password must be at least 8 characters long"),
});

export default SettingSchema;