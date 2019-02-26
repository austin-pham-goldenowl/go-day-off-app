import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

export const ValidationSchemaExample = () => (
  <div>
    <h1>Signup</h1>
    <Formik 
      initialValues={{
        firstName: '',
        lastName: '',
        email: ''
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        console.log(values)
      }}>
        {({ errors, touched }) => (
          <Form>
            <Field name="firstName" />
            {errors.firstName && touched.firstName ? (<div>{errors.firstName}</div>) : null}
            <Field name="lastName" />
            {errors.lastName && touched.lastName ? (<div>{errors.lastName}</div>): null}
            <Field name="email" type="email" />
            {errors.email && touched.email ? (<div>{errors.email}</div>) : null }
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
  </div>
);

// Field Level Validation Example

function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address'
  }
  return error;
}

function validateUsername(value) {
  let error;
  if (!value) {
    error = 'Nice try!';
  } 
  return error;
}

export const FieldLevelValidationExample = () => (
  <div>
    <h1>Signup 2</h1>
    <Formik
      initialValues={{
        username: '', 
        email: ''
      }}
      onSubmit={(values, actions) => {
        console.log(values);
        console.log(actions);
      }}
    >
      {({ errors, touched, validateField, validateForm }) => (
        <Form>
          <Field name="email" validate={validateEmail} />
          {errors.email && touched.email && (<div>{errors.email}</div>)}

          <Field name="username" validate={validateUsername} />
          {errors.username && touched.username && (<div>{errors.username}</div>)}

          <button type="button" onClick={() => validateField('username')}>Check Username</button>
          <button 
            type="button" 
            onClick={() => validateForm().then(() => {
              console.log('blah');
            })}
          >
            Validate All
          </button>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
)