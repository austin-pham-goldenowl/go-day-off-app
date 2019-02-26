import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const pwdPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const ReducingBoilerplate = () => (
  <div>
    <h1>Anyplace in your app!</h1>
    <Formik
      initialValues={{ email: '', password: ''}}
      validate={values => {
        let errors = {};
        if (!values.email) {
          errors.email = 'Required'
        } else if (!pwdPattern.test(values.email)) {
          errors.email = 'Invalid email address'
        }
        return errors;
      }}
      onSubmit={( values, { setSubmitting }) => {
        console.log('Submitted values: ', values);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}>
        {({ isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div"/>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div"/>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
  </div>
);

export default ReducingBoilerplate;