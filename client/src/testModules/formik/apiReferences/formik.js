import React from 'react';
import { Formik } from 'formik';

export const BasicExample = () => (
  <div>
    <h1>My Form</h1>
    <Formik
      initialValues={{ name: 'jared' }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
      render={props => {
        console.log(`Formik props: `, props);
        return (
          <form onSubmit={props.handleSubmit}>
            <input 
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.name}
              name="name"
            />
            {props.errors.name && (<div id="feedback">{props.errors.name}</div>)}
            <button type="submit">Submit</button>
          </form>
        );
      }}>
    </Formik>
  </div>
);

/** <Formik/> Props
component?: React.ComponentType>
render: (props: FormikProps) => ReactNode
children?: React.ReactNode | (props: FormikProps) => ReactNode
enableReinitialize?: boolean
isInitialValid?: boolean
initialStatus?: any
initialValues: Values
onReset?: (values: Values, formikBag: FormikBag) => void
onSubmit: (values: Values, formikBag: FormikBag) => void
validate?: (values: Values) => FormikErrors | Promise
validateOnBlur?: boolean
validateOnChange?: boolean
validationSchema?: Schema | (() => Schema)
 */


 /** <Formik/> render props
  * dirty: bool
  * errors:
  * handleBlur
  * handleChange
  * handleReset
  * handleSubmit
  * isSubmitting
  * isValid
  * isValidating
  * resetForm
  * setErrors
  * setFieldError (field: string, errorMsg: string)
  * setFieldTouched (field: string, isTouched?, shouldValidate?)
  * submitForm
  * submitCount
  * setFieldValue (field: srting, value: any, shouldValidate?)
  * setStatus (status?)
  * setSubmitting (isSubmitting: boolean)
  * setTouched 
  * setValues
  * status?
  * validateForm (values?) => Promise
  * validateField (field: string)
  */