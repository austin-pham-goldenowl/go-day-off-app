import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Formik, Form, Field } from 'formik';
import { withRouter } from 'react-router-dom';
import {
  Paper,
  TextField,
  CssBaseline,
  Typography,
  Button,
  Grid,
  Divider
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import queryString from 'query-string';
import moment from 'moment';
import RequestStatusPill from '../../components/RequestStatusPill';
import DashContainer from '../DashContainer';

import {
  ArrowBackIosOutlined as ArrowBackIcon,
  DoneOutlined as DoneIcon,
  RemoveCircleOutline as RemoveCircleIcon
} from '@material-ui/icons';
// Helper
import { getLeaveType } from '../../helpers/leaveLetterHelper';

// Notification redux
import {
  showNotification,
  hideNotification
} from '../../redux/actions/notificationActions';
import { NOTIF_ERROR, NOTIF_SUCCESS } from '../../constants/notification';

// API
import { getLeaveLetterDetails } from '../../apiCalls/leaveLetterAPI';
import { getProfile } from '../../apiCalls/userAPIs';
import { updateLetterStatus } from '../../apiCalls/leaveLetterAPI';

import {
  // LEAVE_REQUEST_REJECTED,
  LEAVE_REQUEST_APPROVED,
  LEAVE_REQUEST_PENDING,
  LEAVE_REQUEST_REJECTED
} from '../../constants/requestStatusType';

import { responseUserPermission } from '../../constants/permission';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      minWidth: 800,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 2
    }
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4
  },
  leaveInfo: {
    marginTop: theme.spacing.unit * 3
  },
  submit: {
    marginTop: theme.spacing.unit * 6
  },
  preload: {
    marginTop: theme.spacing.unit * 3
  },
  buttonGroupBottom: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    [theme.breakpoints.down(360)]: {
      justifyContent: 'space-between'
    },
    marginTop: theme.spacing.unit * 6
  },
  button: {
    [theme.breakpoints.up(360)]: {
      marginLeft: theme.spacing.unit
    }
  },
  btnApprove: {
    color: 'white',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
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
  fieldTitle: {
    color: 'black',
    fontWeight: 600,
    minWidth: 50,
    [theme.breakpoints.down('xs')]: {
      overflow: 'scroll'
    }
  },
  fieldValue: {
    color: 'black',
    fontWeight: 500
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
    marginBottom: theme.spacing.unit * 3
  }
});

class LeaveRequestDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      leaveLetter: {},
      userInfo: {}
    };
  }

  loadData = async () => {
    let response = await getLeaveLetterDetails(
      queryString.parse(this.props.location.search).id
    );
    let {
      status: statusLetter,
      data: { success: successLetter, leaveLetter }
    } = response;
    if (statusLetter !== 200 || successLetter !== true || !leaveLetter) return;

    response = await getProfile(leaveLetter.fUserId);
    let {
      status: statusUser,
      data: { success: successUser, user: userInfo }
    } = response;
    if (statusUser !== 200 || successUser !== true || !userInfo) return;

    this.setState({ leaveLetter, userInfo });
  };

  componentDidMount = async () => {
    //First request
    this.loadData();
  };

  render() {
    const { history, classes, initialValues, handleShowNotif } = this.props;
    const { userInfo, leaveLetter } = this.state;
    return (
      <DashContainer>
        <Paper className={classes.paper}>
          <CssBaseline />
          <Formik
            initialValues={initialValues}
            validateOnBlur={true}
            onReset={(values, actions) => {
              //call api
              updateLetterStatus(
                queryString.parse(history.location.search).id,
                leaveLetter.fUserId,
                LEAVE_REQUEST_REJECTED
              )
                .then(res => {
                  handleShowNotif(
                    NOTIF_SUCCESS,
                    `Leave request updated successfully!`
                  );
                  //Re call get
                  this.loadData();
                })
                .catch(err => {
                  handleShowNotif(
                    NOTIF_ERROR,
                    `Action failed (${err.message})`
                  );
                  actions.setSubmitting(false);
                });
            }}
            onSubmit={(values, actions) => {
              //call api
              updateLetterStatus(
                queryString.parse(history.location.search).id,
                leaveLetter.fUserId,
                LEAVE_REQUEST_APPROVED
              )
                .then(res => {
                  handleShowNotif(
                    NOTIF_SUCCESS,
                    `Leave request updated successfully!`
                  );
                  //Re call get
                  this.loadData();
                })
                .catch(err => {
                  handleShowNotif(
                    NOTIF_ERROR,
                    `Action failed (${err.message})`
                  );
                  actions.setSubmitting(false);
                });
            }}
          >
            {({
              errors,
              values,
              isSubmitting,
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
                      <ArrowBackIcon className={classes.leftIcon} />
                      Back
                    </Button>
                    <RequestStatusPill statusType={leaveLetter.fStatus} />
                  </Grid>
                  {/* Form title */}
                  <Typography component="h1" variant="h4">
                    Request detail
                  </Typography>
                  {/* End - Form title */}
                  {/* Request Id */}
                  {leaveLetter.fId && <div>{`ID: #${leaveLetter.fId}`}</div>}
                  {/* End - Request Id */}
                  <Divider />
                  {/* End - Form title */}

                  <React.Fragment>
                    <Grid container spacing={24} className={classes.leaveInfo}>
                      {/** User info  */}
                      <Grid item container xs={12} spacing={8}>
                        {/** FIRST NAME, LAST NAME */}
                        <Grid item xs={12} className={classes.fieldWrapper}>
                          <div className={classes.fieldTitle}>
                            Creator:
                            <span className={classes.fieldValue}>{` ${
                              userInfo.fFirstName
                            } ${userInfo.fLastName}`}</span>
                          </div>
                        </Grid>
                        {/** CURRENT POSITION */}
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          className={classes.fieldWrapper}
                        >
                          <div className={classes.fieldTitle}>
                            Position:
                            <span className={classes.fieldValue}>{` ${
                              userInfo.fPositionName
                            }`}</span>
                          </div>
                        </Grid>
                        {/** TEAM */}
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          className={classes.fieldWrapper}
                        >
                          <div className={classes.fieldTitle}>
                            Team:
                            <span className={classes.fieldValue}>{` ${
                              userInfo.fTeamName
                            }`}</span>
                          </div>
                        </Grid>
                        {/** EMAIL */}
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          className={classes.fieldWrapper}
                        >
                          <div className={classes.fieldTitle}>
                            Email:
                            <span className={classes.fieldValue}>{` ${
                              userInfo.fEmail
                            }`}</span>
                          </div>
                        </Grid>
                        {/** PHONE NUM */}
                        <Grid
                          item
                          xs={12}
                          sm={6}
                          className={classes.fieldWrapper}
                        >
                          <div className={classes.fieldTitle}>
                            Phone:
                            <span className={classes.fieldValue}>{` ${
                              userInfo.fPhone
                            }`}</span>
                          </div>
                        </Grid>
                      </Grid>
                      {/** End - User info */}
                      {/** Leave-letter info */}
                      <Grid item container spacing={8}>
                        {/** Leave Type */}
                        <Grid item xs={12} className={classes.fieldWrapper}>
                          <div className={classes.fieldTitle}>
                            Leave Type:
                            <span
                              className={classes.fieldValue}
                            >{` ${getLeaveType(
                              leaveLetter.fAbsenceType
                            )}`}</span>
                          </div>
                        </Grid>
                        {/** FromDT */}
                        <Grid item xs={6} className={classes.fieldWrapper}>
                          <div className={classes.fieldTitle}>
                            From:
                            <span className={classes.fieldValue}>{` ${moment(
                              leaveLetter.fFromDT
                            ).format('MM/DD/YYYY')}`}</span>
                          </div>
                        </Grid>
                        {/** ToDT */}
                        <Grid item xs={6} className={classes.fieldWrapper}>
                          <div className={classes.fieldTitle}>
                            To:
                            <span className={classes.fieldValue}>{` ${moment(
                              leaveLetter.fToDT
                            ).format('MM/DD/YYYY')}`}</span>
                          </div>
                        </Grid>
                        {/** Reason */}
                        <Grid item xs={12} className={classes.fieldWrapper}>
                          <div className={classes.fieldTitle}>
                            Reason:
                            <span className={classes.fieldValue}>{` ${
                              leaveLetter.fReason
                            }`}</span>
                          </div>
                        </Grid>
                        {/** End - Leave-letter info */}
                      </Grid>
                    </Grid>
                  </React.Fragment>
                  {/* Bottom buttons */}
                  {leaveLetter.fStatus === LEAVE_REQUEST_PENDING &&
                  userInfo.fTypeId === responseUserPermission['HR'] ? (
                    <React.Fragment>
                      <Grid
                        item
                        container
                        xs={12}
                        className={classes.buttonGroupBottom}
                        spacing={8}
                      >
                        <Field
                          render={({ field, form }) => (
                            <Button
                              className={classNames(
                                classes.button,
                                classes.btnApprove
                              )}
                              size="small"
                              variant="contained"
                              color="primary"
                              onClick={handleSubmit}
                              disabled={isSubmitting}
                            >
                              <DoneIcon />
                              Approve
                            </Button>
                          )}
                        />
                        <Field
                          render={({ field, form }) => (
                            <Button
                              className={classes.button}
                              size="small"
                              variant="contained"
                              color="secondary"
                              onClick={() => {
                                handleReset();
                              }}
                              disabled={isSubmitting}
                            >
                              <RemoveCircleIcon className={classes.leftIcon} />
                              Reject
                            </Button>
                          )}
                        />
                      </Grid>
                    </React.Fragment>
                  ) : null}
                  {/* End - Top buttons */}
                </Form>
              );
            }}
          </Formik>
        </Paper>
      </DashContainer>
    );
  }
}

LeaveRequestDetail.defaultProps = {
  initialValues: {
    reason: ''
  }
};

const mapDispatchToProps = dispatch => {
  return {
    handleShowNotif: (type, message) =>
      dispatch(showNotification(type, message)),
    handleHideNotif: () => dispatch(hideNotification())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(withRouter(LeaveRequestDetail)));
