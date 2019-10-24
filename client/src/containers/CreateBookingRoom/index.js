import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Paper, Grid, Typography, TextField, Button, Slide } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Icon from '@material-ui/core/Icon';

// Using components
import SelectCustom from '../../components/CustomSelect';
import DatePickerField from '../../components/DatePickers/FormDatePicker';
import TimePickerField from '../../components/DatePickers/FormTimePicker';
import DashContainer from '../DashContainer';
// Validation
import { YupValidationSchema, CustomValidationSchema } from './validationSchema';

// API calls
import { CancelToken } from 'axios';

import CircularUnderLoad from '../../components/Animation/CircularUnderLoad';


class BookingMeetingWithFormik extends React.Component {
  state = {
    buttonClickable: true,
    lastLetterId: undefined,
  };

  componentDidMount() {
    this.__isMounted = true;
    this.cancelSource = CancelToken.source();
  }

  componentWillUnmount = () => {
    this.__isMounted = false;
    this.cancelSource.cancel(`User has suddenly left the page!`);
  }

  render() {
    const { classes, initialValues } = this.props;
    const optionTeam = [
      {label: 'Javascript', value: 'Javascript'},
      {label: 'Python', value: 'Python'},
      {label: 'Ruby on rails', value: 'Ruby on rails'}
    ]
    return (
      <DashContainer>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Formik
              initialValues={initialValues}
              // validateOnChange
              validationSchema={YupValidationSchema}
              validate={CustomValidationSchema}
              onReset={(values, action) => {}}
              onSubmit={(values, action) => {
                action.resetForm();
                action.setSubmitting(false);
              }}
              render={({
                values,
                handleBlur,
                handleReset,
                handleSubmit,
                handleChange,
                isSubmitting,
                setFieldValue,
              }) => {
                const { buttonClickable, isRequestCreated, lastLetterId } = this.state;
                return (
                  <Form>
                    {/* Top buttons */}
                    <React.Fragment>
                      <Grid
                        item
                        container
                        xs={12}
                        className={classes.buttonGroupTop}
                      >
                        <Field
                          render={({ field, form }) => (
                            <Button
                              className={classes.button}
                              size="small"
                              color="primary"
                              variant="contained"
                              onClick={handleSubmit}
                              disabled={isSubmitting || !buttonClickable}
                            >
                              Send
                              <Icon
                                fontSize="small"
                                className={classes.rightIcon}
                              >
                                send_outlined
                              </Icon>
                            </Button>
                          )}
                        />
                        <Field
                          render={() => (
                            <Button
                              className={classes.button}
                              size="small"
                              color="secondary"
                              variant="outlined"
                              onClick={handleReset}
                              disabled={isSubmitting || !buttonClickable}
                            >
                              Reset
                              <Icon
                                fontSize="small"
                                className={classes.rightIcon}
                              >
                                delete_sweep
                              </Icon>
                            </Button>
                          )}
                        />
                      </Grid>
                    </React.Fragment>
                    {/* End - Top buttons  */}
                    <React.Fragment>
                      <Typography
                        className={classes.formTitle}
                        component="h1"
                        variant="h5"
                        align="center"
                      >
                        Create Booking Meeting
                      </Typography>
                    </React.Fragment>
                    {/* Form's content*/}
                    <React.Fragment>
                      {/* Form */}
                      <Grid container spacing={16}>
                        {/* Left side */}
                        <Grid item xs={12} sm={6} container spacing={8}>
                          <Grid item xs={12}>
                            {/* Select Leave type */}
                            <Field
                              name="name"
                              render={({ field, form }) => (
                                <TextField
                                  required
                                  multiline
                                  fullWidth
                                  id="name"
                                  name="name"
                                  label="Booking name"
                                  value={values.name}
                                  onBlur={handleBlur}
                                  onChange={({ target: { name, value } }) =>
                                    setFieldValue(name, value)
                                  }
                                />
                              )}
                            />
                            <ErrorMessage name="name">
                              {msg => (
                                <div className={classes.errorMessage}>
                                  {msg}
                                </div>
                              )}
                            </ErrorMessage>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} container spacing={8}>
                          {/* Date picker */}
                          <Grid item container spacing={16}>
                            <Grid item xs={12}>
                              <Field
                                fullWidth
                                label="Date"
                                name="bookingDate"
                                component={DatePickerField}
                                onBlurCapture={handleBlur}
                              />
                              <ErrorMessage name="bookingDate">
                                {msg => (
                                  <div className={classes.errorMessage}>
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                            </Grid>
                          </Grid>
                          {/* Date picker : end */}
                          <Grid item container spacing={16}>
                            {/* Start Time : start */}
                            <Grid item xs={6}>
                              <Field
                                fullWidth
                                label="Start Time"
                                name="startTime"
                                minDate={values.startDate}
                                component={TimePickerField}
                              />
                              <ErrorMessage name="startTime">
                                {msg => (
                                  <div className={classes.errorMessage}>
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                            </Grid>
                            {/* Start Time : end */}
                            {/* End Time : start */}
                            <Grid item xs={6}>
                              <Field
                                fullWidth
                                label="End Time"
                                name="endTime"
                                minDate={values.startDate}
                                component={TimePickerField}
                              />
                              <ErrorMessage name="endTime">
                                {msg => (
                                  <div className={classes.errorMessage}>
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                            </Grid>
                            {/* End Time : end */}
                          </Grid>
                        </Grid>
                      </Grid>
                      {/* End - Form */}
                    </React.Fragment>
                    <React.Fragment>
                      {isSubmitting ? (
                        <div className={classes.preloadWrapper}>
                          <CircularUnderLoad
                            className={classes.preload}
                            size={20}
                          />
                        </div>
                      ) : null}
                    </React.Fragment>
                    
                      <Grid container item xs={12} className={classes.linkRequestBottom}>
                        <Slide direction='right' in={isRequestCreated} mountOnEnter unmountOnExit>
                          <Paper elevation={4} className={classes.linkRequestPaper}>
                            Review request {' '}
                            <Link to={`/leave-request/${lastLetterId}`}>
                              #{lastLetterId}
                            </Link>
                          </Paper>
                        </Slide>
                      </Grid>
                  </Form>
                );
              }}
            />
          </Paper>
        </main>
      </DashContainer>
    );
  }
}

BookingMeetingWithFormik.defaultProps = {
  initialValues: {
    name: '',
    bookingDate: moment().add(0, 'days'),
    startTime: moment().add(0, 'days'),
    endTime: moment().add(0, 'days'),
  }
};

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      minWidth: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  buttonGroupTop: {
    justifyContent: 'flex-start',
    marginBottom: theme.spacing.unit * 3,
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
    [theme.breakpoints.up('sm')]: {
      display: 'flex'
    }
  },
  linkRequestBottom: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: '20px',
    marginRight: '5px',
  },
  linkRequestPaper: {
    backgroundColor: '#e2e2e2',
    padding: '5px',
    color: '#000',
  },
  buttonGroupBottom: {
    justifyContent: 'flex-end',
    marginTop: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
    [theme.breakpoints.down('xs')]: {
      display: 'flex'
    }
  },
  button: {
    marginLeft: theme.spacing.unit,
    width: 100
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  smallIcon: {
    fontSize: 20
  },
  formTitle: {
    marginBottom: theme.spacing.unit * 3
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    fontWeight: 500
  },
  preload: {
    marginTop: theme.spacing.unit * 3
  },
  preloadWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

export default withStyles(styles)(
  connect(
    null,
  )(BookingMeetingWithFormik)
);
