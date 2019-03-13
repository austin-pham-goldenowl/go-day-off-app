import React from "react";
import { connect } from 'react-redux';
import { Formik, Field, Form } from "formik";
import { Paper, Grid, Typography, TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Icon from '@material-ui/core/Icon';

// Using components
import SelectCustom from "../../components/customSelect";
import TextFieldReadOnly from "../../components/readOnlyTextField";
import DatePickerField from "../../components/datePicker";
import SelectWithChips from "../../components/selectWithChips";
import DashContainer from "../DashContainer";

// Validation 
import ValidationSchema from "./validationSchema";
// const emailRegexPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

//helpers
import { getAllLeaveTypes } from '../../helpers/leaveLetterHelper';
// API calls
import { 
  getAllApprover, 
  getAllInformTo 
} from '../../apiCalls/supportingAPIs'
import { createLeaveLetter } from '../../apiCalls/leaveLetterAPI';
import Axios from "axios";

// Notification redux 
import { showNotification, hideNotification } from '../../redux/actions/notificationActions';
import {
  NOTIF_ERROR,
  NOTIF_SUCCESS,
} from '../../constants/notification';
import CircularUnderLoad from '../../components/animation/CircularUnderLoad';
const mapDispatchToProps = (dispatch) => {
  return {
    handleShowNotif: (type, message) => dispatch(showNotification(type, message)),
    handleHideNotif: () => dispatch(hideNotification())
  }
}

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      minWidth: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
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
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttonGroupTop: {
    justifyContent: "flex-start",
    marginBottom: theme.spacing.unit * 3,
    [theme.breakpoints.down("xs")]: {
      display: "none"
    },
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  buttonGroupBottom: {
    justifyContent: "flex-end",
    marginTop: theme.spacing.unit * 3,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex"
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
  }
});

class AbsenceLetterWithFormik extends React.Component {
  state = {
    templateList: {
      leaveTypesList: [],
      informToList: [],
      approverList: [],
    },
    otherReasonSelected: false,
  }
  handleChangeReason = value => {
    if (value === "Lý do khác") {
      this.setState(prevState => ({
        ...prevState,
        otherReasonSelected: true,
      }));
    }
    else {
      this.setState(prevState => ({
        ...prevState,
        otherReasonSelected: false,
      }));
    }
  }

  componentDidMount() {
    const allLeaveTypes = getAllLeaveTypes();
    let allApprover = [];
    let allInformTo = [];
    
    // Call api request:
    Axios.all([getAllInformTo(), getAllApprover()])
      .then(Axios.spread((acct, perms) => {
        console.log('axios.spread -> acct: ', acct);
        console.log('axios.spread -> perms: ', perms);
      //   this.setState(prevState => ({
      //     ...prevState,
      //     leaveTypesList: allLeaveTypes,
      //     informToList: allInformTo,
      //     approverList: allApprover
      //   })
      // );
      }))
      .catch(err => {
        console.log(`axios.all -> err:`, err);
      });
  }

  render() {
    const { classes, initialValues, handleShowNotif } = this.props;
    const {templateList: { leaveTypesList, informToList, approverList }, otherReasonSelected } = this.state;
    console.log("initialValues", initialValues);
    return (
      <DashContainer>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Formik
              initialValues={initialValues}
              validationSchema={ValidationSchema}
              onSubmit={(values, actions) => {
                console.log(`[Create Leave Letter]`);
                console.log(`-> create API has called`);
                createLeaveLetter(values)
                  .then(res => {
                    handleShowNotif(NOTIF_SUCCESS, `Leave request created successfully!`);
                    console.log(`-> [SUCCESS] -> response values: `, res);
                    actions.resetForm();
                    actions.setSubmitting(false);
                  })
                  .catch(err => {
                    handleShowNotif(NOTIF_ERROR, `Can't create Leave request!`);
                    console.log(`-> [ERROR] -> response values: `, err);
                    actions.setSubmitting(false);
                  });
              }}
              render={({
                errors,
                values,
                handleReset,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                handleChange,
                ...formikProps
              }) => {
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
                              variant="contained"
                              color="primary"
                              onClick={handleSubmit}
                            >
                              Send
                              <Icon fontSize="small" className={classes.rightIcon}>
                                send_outlined
                              </Icon>
                            </Button>
                          )}
                        />
                        <Field
                          render={({ field, form }) => (
                            <Button
                              className={classes.button}
                              size="small"
                              variant="outlined"
                              color="secondary"
                              onClick={handleReset}
                            >
                              Discard
                              <Icon fontSize="small" className={classes.rightIcon}>
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
                      <Grid container spacing={24}>
                        {/* Left side */}
                        <Grid item xs={12} sm={6}>
                          <Grid item xs={12}>
                            {/* Select Leave type */}
                            <Field
                              render={({ field, form, ...otherProps }) => {
                                return (
                                  <SelectCustom
                                    name="leaveType"
                                    label="Leave Types"
                                    value={values.leaveType}
                                    options={leaveTypesList} //this will load after api request
                                    onChange={({ target: { name, value } }) => {
                                      setFieldValue(name, value);
                                    }}
                                  />
                                );
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            {/* Show Duration */}
                            <Field
                              name="duration"
                              render={({ field, form }) => {
                                //do something
                                return (
                                  <TextFieldReadOnly
                                    label="Duration"
                                    defaultValue={`${initialValues.endDate -
                                      initialValues.startDate +
                                      1}`}
                                  />
                                );
                              }}
                            />
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
                          </Grid>
                          <Grid item xs={12}>
                            {/* Reason Selection  */}
                            <Field
                              render={({ field, form }) => (
                                <SelectCustom
                                  name="reason"
                                  label="Reason"
                                  value={values.reason}
                                  options={mockup_Reason}
                                  onChange={({ target: { name, value } }) =>{
                                      setFieldValue(name, value)
                                      this.handleChangeReason(value)
                                    }
                                  }
                                />
                              )}
                            />
                          </Grid>
                          {/* Reason in detail */}
                          <Grid item xs={12}>
                            {otherReasonSelected ? (
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
                            ): null}
                          </Grid>
                          {/* End - Reason in detail */}
                        </Grid>
                        {/* End - Right side */}
                      </Grid>
                      {/* End - Form */}
                    </React.Fragment>
                    <React.Fragment>
                      {isSubmitting ? <CircularUnderLoad /> : null}
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
                        >

                        Discard
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
    startDate: new Date(),
    endDate: new Date(),
    approver: {},
    informTo: [],
    reason: "",
    otherReason: ""
  }
};

export default withStyles(styles)(
  connect(null, mapDispatchToProps)(AbsenceLetterWithFormik)
);

// Mockup data
let mockup_LeaveType = [
  {
    value: 10,
    label: "Viec ca nhan"
  },
  {
    value: 20,
    label: "Nghi om"
  },
  {
    value: 30,
    label: "Phep nam"
  },
  {
    value: 99999,
    label: "Nghi che do"
  }
];
let mockup_Approver = [
  {
    value: "tamdh@mail.com",
    label: "Đặng Hà Tâm"
  },
  {
    value: "phuocot@mail.com",
    label: "Ôn Thanh Phước"
  }
];
let mockup_InformTo = [
  { label: "Timon", value: "timon@email.com" },
  { label: "Jayce", value: "jayce@email.com" }
];

let mockup_Reason = [
  {
    value: "Bị ốm",
    label: "Bị ốm"
  },
  {
    value: "Giải quyết việc gia đình",
    label: "Giải quyết việc gia đình"
  },
  {
    value: "Có lịch hẹn khám bệnh",
    label: "Có lịch hẹn khám bệnh"
  },
  {
    value: "Áp lực công việc",
    label: "Áp lực công việc"
  },
  {
    value: "Lý do khác",
    label: "Lý do khác"
  }
];
