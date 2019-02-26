import React from 'react';
import { Formik, Form, Field, } from 'formik';

// Nested Objects

export const NestedExample = () => (
  <div>
    <h1>Social Profiles</h1>
    <Formik
      initialValues={{
        social: {
          facebook: '',
          twitter: ''
        },
      }}
      onSubmit={(values, actions) => {
        console.log('values: ', values);
        console.log('actions: ', actions);
      }}
    >
      <Form>
        <Field name="social.facebook" />
        <Field name="social.twitter" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
);

export const BasicArrayExample = () => (
  <div>
    <h1>Friends</h1>
    <Formik
      initialValues={{
        friend: ['jared', 'ian']
      }}
      onSubmit={(values, actions) => {
        console.log('values: ', values);
        console.log('actions: ', actions);
      }}
    >
      <Field name='friend[0]' />
      <Field name='friend[1]' />
      <button type='submit'>Submit</button>
    </Formik>
  </div>
);

