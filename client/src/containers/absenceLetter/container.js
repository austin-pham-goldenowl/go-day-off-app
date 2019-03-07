import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import SelectCustom from '../../components/customSelect';
import TextFieldReadOnly from '../../components/readOnlyTextField';
import DatePickerField from '../../components/datePicker';
import SelectWithChips from '../../components/selectWithChips';

import ValidationSchema from './validationSchema';

// const emailRegexPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)] : {
      minWidth: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)] : {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttonGroupTop: {
    justifyContent: 'flex-start',
    marginBottom: theme.spacing.unit * 3,
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
    [theme.breakpoints.up('sm')]:{
      display: 'flex'
    }
  },
  buttonGroupBottom: {
    justifyContent: 'flex-end',
    marginTop: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
    [theme.breakpoints.down('xs')]:{
      display: 'flex',
    }
  }
  ,
  button: {
    marginLeft: theme.spacing.unit,
    width: 100
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  smallIcon: {
    fontSize: 20,
  },
  formTitle: {
    marginBottom: theme.spacing.unit * 3,
  }
});

class AbsenceLetterWithFormik extends React.Component{

  componentDidMount() {
    // Call api request:
    // + loadLeaveType
    // + loadApprover
    // + loadInformto
  }

  render() {
  const {
    classes,
    initialValues } = this.props;
    console.log('initialValues', initialValues);
    return (
      <div>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                console.log('[AbsenceLetterWithFormik] - onSubmit - values: ',values);
                console.log('[AbsenceLetterWithFormik] - onSubmit - actions: ',actions);
              }}
              render={({ 
                errors, 
                values, 
                handleReset, 
                handleSubmit,
                setFieldValue, 
                handleChange, 
                ...formikProps 
              }) => {
                return (
                  <Form>
                    {/* Top buttons */}
                    <React.Fragment>
                      <Grid item container xs={12} className={classes.buttonGroupTop}>
                        <Field render={({ field, form }) => (
                          <Button
                            className={classes.button}
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                          >
                            Send
                          </Button>
                        )} />
                        <Field render={({ field, form }) => (
                          <Button
                            className={classes.button}
                            size="small"
                            variant="outlined"
                            color="secondary"
                            onClick={handleReset}
                          >
                            Discard
                          </Button>
                        )}/>
                      </Grid>
                    </React.Fragment>
                    {/* End - Top buttons */}
                    <React.Fragment>
                      <Typography className={classes.formTitle} component="h1" variant="h5" align="center">
                        Create new request
                      </Typography>
                    </React.Fragment>
                    {/* Form's content*/}
                    <React.Fragment>
                      {/* Form */}
                      <Grid container spacing={24}>
                      {/* Left side */}
                        <Grid item xs={12} sm={6}>
                          <Grid item xs={12}>
                            {/* Select Leave type */}
                            <Field
                              render={({ field, form, ...otherProps }) => {
                                console.log(values);
                                console.log('otherProps', otherProps);
                                return (
                                  <SelectCustom
                                    name="leaveType"
                                    label="Leave Types"
                                    value={values.leaveType}
                                    options={mockup_LeaveType} //this will load after api request
                                    onChange={({target: {name, value}}) => {
                                      setFieldValue(name, value);
                                    }}
                                  />
                                )
                              }}/>
                          </Grid>
                          <Grid item xs={12} >
                            {/* Show Duration */}
                            <Field name="duration" render={({ field, form }) => {
                              //do something
                              return (
                                <TextFieldReadOnly
                                  label="Duration"
                                  defaultValue={`${initialValues.endDate-initialValues.startDate+1}`}
                                />
                              )
                            }}/>
                          </Grid>

                          {/* Date picker */}
                          <Grid item container spacing={24}>
                            <Grid item xs={6}>
                              {/* From startDate - to endDate*/}
                              <Field 
                                fullWidth
                                label="From"
                                name="startDate" 
                                component={DatePickerField}
                              />
                            </Grid>
                            <Grid item xs={6}>
                            <Field 
                              fullWidth 
                              label="To"
                              name="endDate" 
                              component={DatePickerField}
                            />
                            </Grid>
                          </Grid>
                          {/* End - Date picker */}
                        </Grid>
                        {/* End - Left side */}
                        {/* Right side */}
                        <Grid item xs={12} sm={6}>
                          <Grid item xs={12}>
                            {/* Supervisor */}
                            <Field render={({ field, form }) => (
                              <SelectCustom
                                name="approver"
                                label="Approver"
                                value={values.approver}
                                options={mockup_Approver}
                                onChange={({ target: {name, value} }) => 
                                  setFieldValue(name, value)
                                }
                              />
                            )} />
                          </Grid>
                          <Grid item xs={12}>
                            {/* Inform to  */}
                            <Field 
                              multiple 
                              name="informTo" 
                              label='Inform to' 
                              options={mockup_InformTo}
                              component={SelectWithChips} 
                            />
                          </Grid>
                          <Grid item xs={12}>
                            {/* Reason Selection  */}
                            <Field render={({ field, form }) => (
                              <SelectCustom
                                name="reason"
                                label="Reason"
                                value={values.reason}
                                options={mockup_Reason}
                                onChange={({ target: {name, value}}) => 
                                  setFieldValue(name, value)
                                }
                              />
                            )} />
                          </Grid>
                          {/* Reason in detail */}
                          <Grid item xs={12}>
                            <Field name="otherReason" render={({ field, form }) => (
                              <TextField
                                required
                                multiline
                                fullWidth
                                id="otherReason"
                                name="otherReason"
                                label="Reason detail"
                                onChange={({ target: {name, value} }) =>
                                  setFieldValue(name, value)
                                }
                              />
                            )} />
                          </Grid>
                          {/* End - Reason in detail */}
                        </Grid>
                        {/* End - Right side */}
                      </Grid>
                      {/* End - Form */}
                    </React.Fragment>
                    <React.Fragment>
                      {/* Bottom buttons */}
                      <Grid item xs={12} className={classes.buttonGroupBottom} >
                      <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        onClick={handleSubmit}
                        className={classes.button}
                      >
                        Send
                      </Button>
                      <Button
                        size="small"
                        color="secondary"
                        variant="outlined"
                        onClick={handleReset}
                        className={classes.button}
                      >
                        Discard
                      </Button>
                    </Grid>
                    </React.Fragment>
                  </Form>
                )
              }}
            />
          </Paper>
        </main>
      </div>
    );
  }
}

AbsenceLetterWithFormik.defaultProps = {
  initialValues: {
    leaveType: 1,
    startDate: new Date(),
    endDate: new Date(),
    approver: {},
    informTo: [],
    reason: '',
    otherReason: '',
  },
}

export default connect(null, null)(
  withStyles(styles)(AbsenceLetterWithFormik)
);
// Mockup data
let mockup_LeaveType = [
  {
    value: 10,
    label: 'Viec ca nhan',
  },
  {
    value: 20,
    label: 'Nghi om',
  },
  {
    value: 30,
    label: 'Phep nam',
  },
  {
    value: 99999,
    label: 'Nghi che do'
  }
];
let mockup_Approver= [
  {
    value: 'tamdh@mail.com',
    label: 'Đặng Hà Tâm',
  },
  {
    value: 'phuocot@mail.com',
    label: 'Ôn Thanh Phước',
  }
];
let mockup_InformTo = [
  { label: 'Timon', value: 'timon@email.com' },
  { label: 'Jayce', value: 'jayce@email.com' },
];

let mockup_Reason = [
  {
    value: 'Bị ốm',
    label: 'Bị ốm',
  },
  {
    value: 'Giải quyết việc gia đình',
    label: 'Giải quyết việc gia đình',
  },
  {
    value: 'Có lịch hẹn khám bệnh',
    label: 'Có lịch hẹn khám bệnh',
  },
  {
    value: 'Áp lực công việc',
    label: 'Áp lực công việc',
  },
  {
    value: 'Lý do khác',
    label: 'Lý do khác',
  },
];
