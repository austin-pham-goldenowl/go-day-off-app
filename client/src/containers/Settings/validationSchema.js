import * as Yup from 'yup';

const SettingSchema = Yup.object().shape({
    email: Yup.email(),
    password: Yup.string(),
});

export default SettingSchema;