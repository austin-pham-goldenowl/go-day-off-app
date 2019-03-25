import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Paper, Grid, Typography, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Icon from '@material-ui/core/Icon';

// Using components
import SelectCustom from '../../components/CustomSelect';
import TextFieldReadOnly from '../../components/ReadOnlyTextField';
import DatePickerField from '../../components/DatePicker';
import SelectWithChips from '../../components/SelectWithChips';
import DashContainer from '../DashContainer';

// Validation
import { YupValidationSchema, CustomValidationSchema } from './validationSchema';
// const emailRegexPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

//constants
import { LeaveDurationOptions } from '../../constants/leaveDurationOptions';
import { mockupLeaveLetterReasons } from '../../constants/mockups';

//helpers
import { getAllLeaveTypes } from '../../helpers/leaveLetterHelper';

//utilities
import { calculateDayOffWithOption, compareDatesWithoutTime } from '../../utilities';

// API calls
import Axios from 'axios';
import { 
  getAllApprover,
  getAllInformTo, 
  getAllSubsitutes,  
} from '../../apiCalls/userAPIs';
import { createLeaveLetter } from '../../apiCalls/leaveLetterAPI';

// Notification redux
import {
  showNotification,
  hideNotification
} from '../../redux/actions/notificationActions';
import { NOTIF_ERROR, NOTIF_SUCCESS } from '../../constants/notification';
import CircularUnderLoad from '../../components/Animation/CircularUnderLoad';
import DaySessionsRadio from '../../components/DaySessionsRadio';

const mapDispatchToProps = dispatch => {
  return {
    handleShowNotif: (type, message) =>
      dispatch(showNotification(type, message)),
    handleHideNotif: () => dispatch(hideNotification()),
    handleShowNotifNoHide: (type, message, autoHide = false) =>
      dispatch(showNotification(type, message, autoHide))
  };
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
  rightSide: {

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

class AbsenceLetterWithFormik extends React.Component {
  state = {
    templateList: {
      leaveTypesList: [],
      informToList: [],
      approverList: [],
      substitutesList: [],
    },
    otherReasonSelected: false,
    buttonClickable: false
  };

  switchButtonCtrl = enable => {
    this.setState(prevState => ({
      ...prevState,
      buttonClickable: enable
    }));
  };

  handleChangeReason = async (value = '') => {
    if (value === mockupLeaveLetterReasons[mockupLeaveLetterReasons.length - 1].value) {
      await this.setState(prevState => ({
        ...prevState,
        otherReasonSelected: true
      }));
    } else {
      await this.setState(prevState => ({
        ...prevState,
        otherReasonSelected: false
      }));
    }
  };

  componentDidMount() {
    const allLeaveTypes = getAllLeaveTypes();
    const { handleShowNotifNoHide } = this.props;
    // Call api request:
    Axios.all([getAllInformTo(), getAllApprover(), getAllSubsitutes()])
      .then(
        Axios.spread((first, second, third) => {
          let allApprover = second.data.approvers.map(item => ({
            value: item.fId,
            label: `${item.fFirstName} ${item.fLastName}`
          }));
          let allInformTo = [
            {
              additionInfo: first.data.teamLeader.fEmail,
              value: first.data.teamLeader.fId,
              label: `${first.data.teamLeader.fFirstName} ${
                first.data.teamLeader.fLastName
              }`
            }
          ];
          let allSubstitutes = third.data.substitutes.map(item => ({
            additionInfo: item.fEmail,
            value: item.fId,
            label: `${item.fFirstName} ${item.fLastName}`
          }));

          this.setState(prevState => ({
            ...prevState,
            templateList: {
              leaveTypesList: allLeaveTypes,
              informToList: allInformTo,
              approverList: allApprover,
              substitutesList: allSubstitutes
            },
            buttonClickable: true
          }));
        })
      )
      .catch(err => {
        handleShowNotifNoHide(NOTIF_ERROR, `${err.message}`);
        this.switchButtonCtrl(false);
      });
  }

  render() {
    const { classes, initialValues, handleShowNotif } = this.props;
    const {
      templateList: { leaveTypesList, informToList, approverList, substitutesList },
      otherReasonSelected
    } = this.state;
    return (
      <DashContainer>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Formik
              initialValues={initialValues}
              validateOnBlur
              validationSchema={YupValidationSchema}
              validate={CustomValidationSchema}
              onReset={(values, actions) => {
                //Manually reset Reason detail content and set it hidden
                this.handleChangeReason();
              }}
              onSubmit={(values, actions) => {
                let submitValues = values;
                if (compareDatesWithoutTime(values.startDate, values.endDate) === 0) {
                  submitValues.toOpt = submitValues.fromOpt;
                }
                createLeaveLetter(values)
                  .then(res => {
                    handleShowNotif(
                      NOTIF_SUCCESS,
                      `Leave request created successfully!`
                    );
                    this.handleChangeReason();
                    actions.resetForm();
                    actions.setSubmitting(false);
                  })
                  .catch(err => {
                    handleShowNotif(NOTIF_ERROR, `Can't create Leave request! (${err.errorMessage})`);
                    actions.setSubmitting(false);
                  });
              }}
              render={({
                errors,
                values,
                touched,
                handleReset,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                handleChange
              }) => {
                const { buttonClickable } = this.state;
                const isSameDaySelected = compareDatesWithoutTime(values.startDate, values.endDate) === 0;
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
                              variant="outlined"
                              color="secondary"
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
                    {/* End - Top buttons */}
                    <React.Fragment>
                      <Typography
                        className={classes.formTitle}
                        component="h1"
                        variant="h5"
                        align="center"
                      >
                        Create new request
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
                              render={({ field, form }) => {
                                return (
                                  <SelectCustom
                                    name="leaveType"
                                    label="Leave Types"
                                    value={values.leaveType}
                                    options={leaveTypesList}
                                    onChange={({ target: { name, value } }) => {
                                      setFieldValue(name, value);
                                    }}
                                  />
                                );
                              }}
                            />
                            <ErrorMessage name="leaveType">
                              {msg => (
                                <div className={classes.errorMessage}>
                                  {msg}
                                </div>
                              )}
                            </ErrorMessage>
                          </Grid>
                          <Grid item xs={12}>
                            {/* Show Duration */}
                            <Field
                              name="duration"
                              render={({ form }) => {
                                const dayOff = calculateDayOffWithOption(
                                  moment(form.values.startDate),
                                  moment(form.values.endDate),
                                  values.fromOpt,
                                  values.toOpt
                                );
                                //do something
                                return (
                                  <TextFieldReadOnly
                                    fullWidth
                                    label="Duration"
                                    defaultValue={`${dayOff} working day(s)`}
                                  />
                                );
                              }}
                            />
                          </Grid>

                          {/* Date picker */}
                          <Grid item container spacing={16}>
                            <Grid item xs={6}>
                              {/* From startDate - to endDate*/}
                              <Field
                                fullWidth
                                label="From"
                                name="startDate"
                                component={DatePickerField}
                              />
                              <ErrorMessage name="startDate">
                                {msg => (
                                  <div className={classes.errorMessage}>
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                              <Field
                                label="Option"
                                name="fromOpt"
                                component={DaySessionsRadio}
                                disableMorning={!isSameDaySelected}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <Field
                                fullWidth
                                label="To"
                                name="endDate"
                                minDate={values.startDate}
                                component={DatePickerField}
                              />
                              <ErrorMessage name="endDate">
                                {msg => (
                                  <div className={classes.errorMessage}>
                                    {msg}
                                  </div>
                                )}
                              </ErrorMessage>
                              <Field
                                label="Option"
                                name="toOpt"
                                component={DaySessionsRadio}
                                disabled={isSameDaySelected}
                                disableAfternoon={!isSameDaySelected}
                              />
                            </Grid>
                          </Grid>
                          {/* End - Date picker */}
                        </Grid>
                        {/* End - Left side */}
                        {/* Right side */}
                        <Grid item xs={12} sm={6} container spacing={8}>
                          <Grid item xs={12}>
                            {/* Supervisor */}
                            <Field
                              render={({ field, form }) => (
                                <SelectCustom
                                  name="approver"
                                  label="Approver"
                                  value={values.approver}
                                  options={approverList}
                                  onChange={({ target: { name, value } }) =>
                                    setFieldValue(name, value)
                                  }
                                />
                              )}
                            />
                            <ErrorMessage name="approver">
                              {msg => (
                                <div className={classes.errorMessage}>
                                  {msg}
                                </div>
                              )}
                            </ErrorMessage>
                          </Grid>
                          <Grid item xs={12}>
                            {/* Inform to  */}
                            <Field
                              multiple
                              name="informTo"
                              label="Inform to"
                              options={informToList}
                              component={SelectWithChips}
                            />
                            <ErrorMessage name="informTo">
                              {msg => (
                                <div className={classes.errorMessage}>
                                  {msg}
                                </div>
                              )}
                            </ErrorMessage>
                          </Grid>
                          <Grid item xs={12}>
                            {/* Substitute Selection  */}
                            <Field
                              render={({ field, form }) => (
                                <SelectCustom
                                  name="substituteId"
                                  label="Substitute"
                                  value={values.substituteId}
                                  options={substitutesList}
                                  onChange={({ target: { name, value } }) => {
                                    setFieldValue(name, value);
                                  }}
                                />
                              )}
                            />
                            <ErrorMessage name="substituteId">
                              {msg => (
                                <div className={classes.errorMessage}>
                                  {msg}
                                </div>
                              )}
                            </ErrorMessage>
                          </Grid>
                          <Grid item xs={12}>
                            {/* Reason Selection  */}
                            <Field
                              render={({ field, form }) => (
                                <SelectCustom
                                  name="reason"
                                  label="Reason"
                                  value={values.reason}
                                  options={mockupLeaveLetterReasons}
                                  onChange={({ target: { name, value } }) => {
                                    setFieldValue(name, value);
                                    this.handleChangeReason(value);
                                  }}
                                />
                              )}
                            />
                            <ErrorMessage name="reason">
                              {msg => (
                                <div className={classes.errorMessage}>
                                  {msg}
                                </div>
                              )}
                            </ErrorMessage>
                          </Grid>
                          {/* Reason in detail */}
                          <Grid item xs={12}>
                            {otherReasonSelected ? (
                              <React.Fragment>
                                <Field
                                  name="otherReason"
                                  render={({ field, form }) => (
                                    <TextField
                                      required
                                      multiline
                                      fullWidth
                                      id="otherReason"
                                      name="otherReason"
                                      label="Reason detail"
                                      onChange={({ target: { name, value } }) =>
                                        setFieldValue(name, value)
                                      }
                                    />
                                  )}
                                />
                                <ErrorMessage name="otherReason">
                                  {msg => (
                                    <div className={classes.errorMessage}>
                                      {msg}
                                    </div>
                                  )}
                                </ErrorMessage>
                              </React.Fragment>
                            ) : null}
                          </Grid>
                          {/* End - Reason in detail */}
                        </Grid>
                        {/* End - Right side */}
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
                    <React.Fragment>
                      {/* Bottom buttons */}
                      <Grid item xs={12} className={classes.buttonGroupBottom}>
                        <Button
                          size="small"
                          color="primary"
                          variant="contained"
                          onClick={handleSubmit}
                          className={classes.button}
                          disabled={isSubmitting || !buttonClickable}
                        >
                          Send
                          <Icon fontSize="small" className={classes.rightIcon}>
                            send_outlined
                          </Icon>
                        </Button>
                        <Button
                          size="small"
                          color="secondary"
                          variant="outlined"
                          onClick={handleReset}
                          className={classes.button}
                          disabled={isSubmitting || !buttonClickable}
                        >
                          Reset
                          <Icon fontSize="small" className={classes.rightIcon}>
                            delete_sweep
                          </Icon>
                        </Button>
                      </Grid>
                    </React.Fragment>
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

AbsenceLetterWithFormik.defaultProps = {
  initialValues: {
    leaveType: 1,
    startDate: moment().add(1, 'days'),
    endDate: moment().add(1, 'days'),
    approver: '',
    informTo: [], //must be an array
    substituteId: '', //Temporarily mockup
    reason: '',
    otherReason: '',
    fromOpt: LeaveDurationOptions.all,
    toOpt: LeaveDurationOptions.all
  }
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(AbsenceLetterWithFormik)
);
