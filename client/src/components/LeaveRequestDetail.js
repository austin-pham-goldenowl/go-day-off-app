import React from 'react';
import classNames from 'classnames';
import { Formik, Form, Field } from 'formik';
import { withRouter } from 'react-router-dom'
import {
  Paper,
  TextField,
  CssBaseline,
  Typography,
  Button,
  Grid,
  Divider,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import RequestStatusPill from './RequestStatusPill';

import {
  ArrowBackIosOutlined as ArrowBackIcon,
  DoneOutlined as DoneIcon,
  RemoveCircleOutline as RemoveCircleIcon,
} from '@material-ui/icons';
// Helper
import { 
  getLeaveType,
} from '../helpers/leaveLetterHelper';
import { LEAVE_REQUEST_PENDING } from '../constants/requestStatusType';


const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)] : {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 2,
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
  },
  leaveInfo: {
    marginTop: theme.spacing.unit * 3,
  },
  submit: {
    marginTop: theme.spacing.unit * 6,
  },
  preload: {
    marginTop: theme.spacing.unit * 3,
  },
  buttonGroupBottom: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.unit * 6,
  },
  button: {
    marginLeft: theme.spacing.unit,
  },
  btnApprove: {
    color: 'white',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
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
  fieldTitle: {
    color: 'black',
    fontWeight: 600,
    minWidth: 50,
  },
  fieldValue: {
    color: 'black',
    fontWeight: 500,
  },
  fieldWrapper: {
    paddingTop: 0,
    paddingBottom: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alighItems: 'center'
  },
  topInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.unit * 3,
  }
});

const LeaveRequestDetail = (props) => {
  const {
    history, 
    classes, 
    userInfo, 
    leaveLetter,
    initialValues,
    ...otherProps } = props;

  console.log(`props: `, props);
  return (
    <Paper className={classes.paper}>
      <CssBaseline/>
      <Formik 
        initialValues={initialValues}
        validateOnBlur={true}
        onSubmit={({ values, actions }) => {
          console.log(`Submitted values: `, values);
          //call api
        }}
      >
        {({
          errors,
          values,
          handleReset,
          handleSubmit,
          handleChange,
          ...formikProps
        }) => {
          return (
            <Form className={classes.form}>
              <Grid item container xs={12} className={classes.topInfo}>
                <Button
                  className={classes.button}
                  size="small"
                  variant="contained"
                  color="default"
                  onClick={() => history.goBack()}
                >
                  <ArrowBackIcon className={classes.leftIcon}/>
                  Back
                </Button>
                <RequestStatusPill statusType={leaveLetter.status}/>
              </Grid>
              {/* Form title */}
              <Typography component="h1" variant="h4">
                Leave Request Detail
              </Typography>
              {/* End - Form title */}
              {/* Request Id */}
              {leaveLetter.id && (
                  <div>
                    {`ID: #${leaveLetter.id}`}
                  </div>
                )
              }
              {/* End - Request Id */}
              <Divider />
              {/* End - Form title */}
              
              <React.Fragment>
                <Grid container spacing={24} className={classes.leaveInfo}>
                  {/** User info  */}
                  <Grid item container xs={12} spacing={8}>
                    {/** FIRST NAME, LAST NAME */}                    
                    <Grid item xs={12} className={classes.fieldWrapper}>
                      <div className={classes.fieldTitle}>Creator: 
                        <span className={classes.fieldValue}>{` ${userInfo.firstName} ${userInfo.lastName}`}</span>
                      </div>
                    </Grid>
                    {/** CURRENT POSITION */}                    
                    <Grid item xs={12} sm={6} className={classes.fieldWrapper}>
                      <div className={classes.fieldTitle}>Position: 
                        <span className={classes.fieldValue}>{` ${userInfo.position}`}</span>
                      </div>
                    </Grid>
                    {/** TEAM */}                    
                    <Grid item xs={12} sm={6} className={classes.fieldWrapper}>
                      <div className={classes.fieldTitle}>Team: 
                        <span className={classes.fieldValue}>{` ${userInfo.team}`}</span>
                      </div>
                    </Grid>
                    {/** EMAIL */}                    
                    <Grid item xs={12} sm={6} className={classes.fieldWrapper}>
                      <div className={classes.fieldTitle}>Email: 
                        <span className={classes.fieldValue}>{` ${userInfo.email}`}</span>
                      </div>
                    </Grid>
                    {/** PHONE NUM */}                    
                    <Grid item xs={12} sm={6} className={classes.fieldWrapper}>
                      <div className={classes.fieldTitle}>Phone: 
                        <span className={classes.fieldValue}>{` ${userInfo.phoneNum}`}</span>
                      </div>
                    </Grid>
                  </Grid>
                  {/** End - User info */}
                  {/** Leave-letter info */}
                  <Grid item container spacing={8}>
                    {/** Leave Type */}
                    <Grid item xs={12} className={classes.fieldWrapper}>
                      <div className={classes.fieldTitle}>Leave Type:
                        <span className={classes.fieldValue}>{` ${leaveLetter.leaveType}`}</span>
                      </div>
                    </Grid>
                    {/** FromDT */}
                    <Grid item xs={6} className={classes.fieldWrapper}>
                      <div className={classes.fieldTitle}>From: 
                        <span className={classes.fieldValue}>{` ${leaveLetter.fromDT}`}</span>
                      </div>
                    </Grid>
                    {/** ToDT */}
                    <Grid item xs={6} className={classes.fieldWrapper}>
                      <div className={classes.fieldTitle}>To: 
                        <span className={classes.fieldValue}>{` ${leaveLetter.toDT}`}</span>
                      </div>
                    </Grid>
                    {/** Reason */}
                    <Grid item xs={12} className={classes.fieldWrapper}>
                      <div className={classes.fieldTitle}>Reason:
                        <span className={classes.fieldValue}>{` ${leaveLetter.reason}`}</span>
                      </div>
                    </Grid>
                    {/** End - Leave-letter info */}
                  </Grid>
                </Grid>
              </React.Fragment>
              {/* Bottom buttons */}
              {leaveLetter.status === LEAVE_REQUEST_PENDING ? (
                <React.Fragment>
                <Grid item container xs={12} className={classes.buttonGroupBottom} spacing={8}>
                  <Field render={({ field, form }) => (
                    <Button
                      className={classNames(classes.button, classes.btnApprove)}
                      size="small"
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      <DoneIcon/>
                      Approve
                    </Button>
                  )} />
                  <Field render={({ field, form }) => (
                    <Button
                      className={classes.button}
                      size="small"
                      variant="contained"
                      color="secondary"
                      onClick={handleReset}
                    >
                      <RemoveCircleIcon className={classes.leftIcon}/>
                      Reject
                    </Button>
                  )}/>
                </Grid>
              </React.Fragment>) : null
            }
            {/* End - Top buttons */}
            </Form>
          )
        }}
      </Formik>
    </Paper>
  );
}

LeaveRequestDetail.defaultProps = {
  initialValues: {
    reason: ''
  },
  leaveLetter: {
    id: 'L2K3423B4F',
    leaveType: 'Việc cá nhân',
    fromDT: '11/03/2019',
    toDT: '11/03/2019',
    reason: 'Đi hỏi vợ',
    createDate: '11/02/2019',
    status: 2,
  },
  userInfo: {
    id: 'A23RNLK3F',
    email: 'abc@gmail.com',
    phoneNum: '0123456789',
    firstName: 'Quoc Cuong',
    lastName: 'Nguyen',
    position: 'Intern/Fresher',
    team: 'Javascript'
  }
}

export default withStyles(styles)(
  withRouter(LeaveRequestDetail)
);