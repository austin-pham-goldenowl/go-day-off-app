import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import {
  Paper,
  Button,
  Grid,
  CssBaseline,
  TextField,
  Typography,
  Divider
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

//components
import SelectCustom from '../../components/CustomSelect';
import DashContainer from '../DashContainer';
import LettersManagement from '../../components/LettersManagement';

import CircularUnderLoad from '../../components/Animation/CircularUnderLoad'

//Icons
import EditIcon from '@material-ui/icons/Edit';

//data mockups
import { mockupGender } from '../../constants/mockups';

//constants
import { responseUserPermission, userTypes } from '../../constants/permission';

//Helpers
import { getUserEntity } from '../../helpers/authHelpers';
import { getGenderName } from '../../helpers/userHelpers';

//Utilities
import { compareJsonObjectValue } from '../../utilities';

//API
import Axios from 'axios';
import { getAllTeams, getAllPositions } from '../../apiCalls/supportingAPIs';
import { getProfile, updateProfile } from '../../apiCalls/userAPIs';
import { getMyLeaveLetters } from "../../apiCalls/leaveLetterAPI";

//Notif redux
import { NOTIF_ERROR, NOTIF_SUCCESS } from '../../constants/notification';
import { showNotification } from '../../redux/actions/notificationActions';
const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      minWidth: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
      paddingBottom: theme.spacing.unit * 6
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
  buttonGroupBottom: {
    justifyContent: 'flex-end',
    marginTop: theme.spacing.unit * 6,
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
    marginBottom: theme.spacing.unit * 2
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
  groupInfo: {
    marginTop: theme.spacing.unit
  },
  topInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alighItems: 'center',
    marginBottom: theme.spacing.unit
  },
  preloadWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: theme.spacing.unit,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    handleShowNotif: (type, message) =>
      dispatch(showNotification(type, message))
  };
};

const initialValues = {
  fFirstName: '',
  fLastName: '',
  fGender: '',
  fPositionName: '',
  fPhone: '',
  fTeamName: '',
  fEmail: '',
  fTypeId: '',
  fTeamId: '',
  fPosition: ''
}

class EditAccountInfo extends React.Component {
  state = {
    user: Object.assign({}, initialValues),
    editMode: false,
    allTeams: [],
    allPositions: [],
    demandUserId: undefined,
  };

  handleEnableEditMode = enable => {
    this.setState(prevState => ({
      ...prevState,
      editMode: enable
    }));
  };

  //history: event onChange

  loadDemandId = (history) => {
    const { userId, userType } = getUserEntity();
    const queryUserId = queryString.parse(history.location.search).id;
    console.log(`queryUserId: `, queryUserId);
    console.log(`userID: `, userId);
    let demandUserId = userId;

    if (userType === userTypes.MODE_HR && typeof(queryUserId) !== 'undefined') {
      demandUserId = queryUserId;
    }
    this.setState(prevState => ({
      ...prevState,
      demandUserId
    }));
  }

  loadData = async () => {
    const { history } = this.props;
    await this.loadDemandId(history);
    

    let response = await getProfile(this.state.demandUserId);
    let { status: reqStatusProfile, data: reqDataProfile } = response;

    if (reqStatusProfile === 200) {
      this.setState(prevState => ({
        ...prevState,
        user: reqDataProfile.user,
      }));

      Axios.all([getAllTeams(), getAllPositions()])
      .then(
        Axios.spread((allTeamResponse, allPositionResponse) => {
          let allTeams = allTeamResponse.data.teams.map(item => ({
            value: item.fId,
            label: item.fTeamName
          }));

          let allPositions = allPositionResponse.data.positions.map(item => ({
            value: item.fId,
            label: item.fPosName
          }));

          this.setState(prevState => ({
            ...prevState,
            allTeams,
            allPositions
          }));
        })
      )
      .catch(err => {
        console.log('error -> ', err);
      });
    } else {
      console.log(`err: `, response);
    }

  };

  componentDidMount = () => {
    this.loadData();
  };

  render() {
    const { classes, history, handleShowNotif } = this.props;
    const { user, editMode, allTeams, allPositions, demandUserId } = this.state;
    const { userId, userType } = getUserEntity();

    const isCurrentLoggedInUser = (userId === demandUserId);
    const isHrSession = userTypes.MODE_HR === userType;
    const isShowLetterList = (isHrSession && !isCurrentLoggedInUser && typeof(demandUserId) !== 'undefined');

    return (
      <DashContainer className={classes.layout}>
          <CssBaseline />
          {compareJsonObjectValue(user, initialValues)
            ? 
            <Paper className={classes.paper}>
                <div className={classes.preloadWrapper}>
                  <Typography 
                    component="h3" 
                    variant="h5"
                  >
                  User not found! (ID: {queryString.parse(history.location.search).id})
                  </Typography>
                  <CircularUnderLoad size={20} /> 
                </div>
                <Divider/>
            </Paper>
            : 
            <Paper className={classes.paper}>
              {editMode && isHrSession ? (
                <Formik
                  initialValues={user}
                  onSubmit={(values, actions) => {
                    //Call api update here
                    console.log(`Submitted values: `, values);
                    updateProfile(values)
                      .then(res => {
                        console.log(`response value: `, res);
                        handleShowNotif(
                          NOTIF_SUCCESS,
                          `Updated profile successfully!`
                        );
                        this.loadData();
                        this.handleEnableEditMode(false);
                        actions.setSubmitting(false);
                      })
                      .catch(err => {
                        console.log(`err: `, err);
                        handleShowNotif(
                          NOTIF_ERROR,
                          `Update fail! (${err.message})`
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
                    setFieldValue,
                    handleChange,
                    ...formikProps
                  }) => {
                    const isUserInfoChanged = !compareJsonObjectValue(values, user);
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
                                  disabled={isSubmitting || !isUserInfoChanged}
                                >
                                  <Icon
                                    fontSize="small"
                                    className={classes.leftIcon}
                                  >
                                    save
                                  </Icon>
                                  SAVE
                                </Button>
                              )}
                            />
                            <Field
                              render={({ field, form }) => (
                                <Button
                                  className={classes.button}
                                  size="small"
                                  color="secondary"
                                  variant="outlined"
                                  disabled={isSubmitting}
                                  onClick={() => {
                                    handleReset();
                                    this.handleEnableEditMode(false);
                                  }}
                                >
                                  {!isUserInfoChanged ? (
                                    <React.Fragment>
                                      <Icon
                                        fontSize="small"
                                        className={classes.leftIcon}
                                      >
                                        cancel
                                      </Icon>
                                      Cancel
                                    </React.Fragment>
                                  ) : (
                                    <React.Fragment>
                                      <Icon
                                        fontSize="small"
                                        className={classes.leftIcon}
                                      >
                                        delete_sweep
                                      </Icon>
                                      Discard
                                    </React.Fragment>
                                  )}
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
                            Edit {isCurrentLoggedInUser ? ' My ' : ` ${user.fFirstName} `} Profile
                          </Typography>
                        </React.Fragment>
                        <React.Fragment>
                          {/** First name */}
                          <Grid container spacing={16}>
                            <Grid item xs={12} sm={6}>
                              <Field
                                name="fFirstName"
                                render={({ field, form, ...otherProps }) => {
                                  return (
                                    <TextField
                                      fullWidth
                                      label="First name"
                                      name={field.name}
                                      value={field.value}
                                      onChange={handleChange}
                                    />
                                  );
                                }}
                              />
                            </Grid>
                            {/** Last name */}
                            <Grid item xs={12} sm={6}>
                              <Field
                                name="fLastName"
                                render={({ field, form, ...otherProps }) => {
                                  return (
                                    <TextField
                                      fullWidth
                                      label="Last name"
                                      name={field.name}
                                      value={field.value}
                                      onChange={handleChange}
                                    />
                                  );
                                }}
                              />
                            </Grid>
                            {/** Gender name */}
                            <Grid item xs={12} sm={6}>
                              <Field
                                name="fGender"
                                render={({ field, form, ...otherProps }) => {
                                  return (
                                    <SelectCustom
                                      name={field.name}
                                      label="Gender"
                                      value={field.value}
                                      options={mockupGender}
                                      onChange={handleChange}
                                    />
                                  );
                                }}
                              />
                            </Grid>
                            {/** fEmail  */}
                            <Grid item xs={12} sm={6}>
                              <Field
                                name="fEmail"
                                render={({ field, form, ...otherProps }) => {
                                  return (
                                    <TextField
                                      fullWidth
                                      label="Email"
                                      value={field.value}
                                      name={field.name}
                                      onChange={handleChange}
                                    />
                                  );
                                }}
                              />
                            </Grid>
                            {/** fPhone number  */}
                            <Grid item xs={12} sm={6}>
                              <Field
                                name="fPhone"
                                render={({ field, form, ...otherProps }) => {
                                  return (
                                    <TextField
                                      fullWidth
                                      label="Phone"
                                      value={field.value}
                                      name={field.name}
                                      onChange={handleChange}
                                    />
                                  );
                                }}
                              />
                            </Grid>
                            {!isHrSession ? null : (
                              <React.Fragment>
                                {/** fTeamName name */}
                                <Grid item xs={12} sm={6}>
                                  <Field
                                    name="fTeamId"
                                    render={({ field, form, ...otherProps }) => {
                                      return (
                                        <SelectCustom
                                          name={field.name}
                                          label="Team"
                                          value={field.value}
                                          options={allTeams}
                                          onChange={handleChange}
                                        />
                                      );
                                    }}
                                  />
                                </Grid>
                                {/** fPositionName name */}
                                <Grid item xs={12} sm={6}>
                                  <Field
                                    name="fPosition"
                                    render={({ field, form, ...otherProps }) => {
                                      return (
                                        <SelectCustom
                                          name={field.name}
                                          label="Position"
                                          value={field.value}
                                          options={allPositions}
                                          onChange={handleChange}
                                        />
                                      );
                                    }}
                                  />
                                </Grid>
                              </React.Fragment>
                            )}
                          </Grid>
                        </React.Fragment>
                        <React.Fragment>
                          {/* Bottom buttons */}
                          <Grid item xs={12} className={classes.buttonGroupBottom}>
                            <Button
                              size="small"
                              color="primary"
                              variant="contained"
                              onClick={handleSubmit}
                              disabled={isSubmitting || !isUserInfoChanged}
                              className={classes.button}
                            >
                              <Icon fontSize="small" className={classes.leftIcon}>
                                save
                              </Icon>
                              SAVE
                            </Button>
                            <Button
                              size="small"
                              color="secondary"
                              variant="outlined"
                              className={classes.button}
                              disabled={isSubmitting}
                              onClick={() => {
                                handleReset();
                                this.handleEnableEditMode(false);
                              }}
                            >
                              {!isUserInfoChanged ? (
                                <React.Fragment>
                                  <Icon
                                    fontSize="small"
                                    className={classes.leftIcon}
                                  >
                                    cancel
                                  </Icon>
                                  Cancel
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  <Icon
                                    fontSize="small"
                                    className={classes.leftIcon}
                                  >
                                    delete_sweep
                                  </Icon>
                                  Discard
                                </React.Fragment>
                              )}
                            </Button>
                          </Grid>
                        </React.Fragment>
                      </Form>
                    );
                  }}
                </Formik>
              ) : (
                <React.Fragment>
                  {isHrSession ? (
                    <div className={classes.topInfo}>
                      <Button
                        className={classes.button}
                        size="small"
                        color="default"
                        variant="contained"
                        onClick={() => this.handleEnableEditMode(true)}
                      >
                        <EditIcon className={classes.leftIcon} />
                        Edit
                      </Button>
                    </div>
                  ) : null}
    
                  {/* Title */}
                  <Typography component="h1" variant="h4">
                    {isCurrentLoggedInUser ? 'My Profile' : `${user.fFirstName}'s Profile`}
                  </Typography>
                  {/** End - Title */}
                  {/* User ID */}
                  {demandUserId && <div>{`ID: #${demandUserId}`.toLocaleUpperCase()}</div>}
                  {/** End - User ID */}
                  <Divider />
                  {/* User info fields */}
                  <Grid container spacing={16} className={classes.groupInfo}>
                    {/* First name  */}
                    <Grid item xs={12} sm={6} className={classes.fieldWrapper}>
                      <div className={classes.fieldTitle}>
                        First name:
                        <span className={classes.fieldValue}>{` ${
                          user.fFirstName
                        }`}</span>
                      </div>
                    </Grid>
                    {/* last name  */}
                    <Grid item xs={12} sm={6} className={classes.fieldWrapper}>
                      <div className={classes.fieldTitle}>
                        Last name:
                        <span className={classes.fieldValue}>{` ${
                          user.fLastName
                        }`}</span>
                      </div>
                    </Grid>
                    {/* Gender */}
                    <Grid item xs={12} sm={6} className={classes.fieldWrapper}>
                      <div className={classes.fieldTitle}>
                        Gender:
                        <span className={classes.fieldValue}>{` ${getGenderName(
                          user.fGender
                        )}`}</span>
                      </div>
                    </Grid>
                    {/* Phone */}
                    <Grid item xs={12} sm={6}>
                      <div className={classes.fieldTitle}>
                        Phone:
                        <span className={classes.fieldValue}>{` ${
                          user.fPhone
                        }`}</span>
                      </div>
                    </Grid>
                    {/* Email */}
                    <Grid item xs={12}>
                      <div className={classes.fieldTitle}>
                        Email:
                        <span className={classes.fieldValue}>{` ${
                          user.fEmail
                        }`}</span>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={16} className={classes.groupInfo}>
                    {/* Position name */}
                    <Grid item xs={12} sm={6}>
                      <div className={classes.fieldTitle}>
                        Position:
                        <span className={classes.fieldValue}>{` ${
                          user.fPositionName
                        }`}</span>
                      </div>
                    </Grid>
                    {/* Team name */}
                    <Grid item xs={12} sm={6}>
                      <div className={classes.fieldTitle}>
                        Team:
                        <span className={classes.fieldValue}>{` ${
                          user.fTeamName
                        }`}</span>
                      </div>
                    </Grid>
                  </Grid>
                </React.Fragment>
              )}
            </Paper>
          }
        { isShowLetterList ? 
          (
            <React.Fragment>
              <Typography component="h1" variant="h4">
                Request letters
              </Typography>
              <LettersManagement 
                api={getMyLeaveLetters}
                demandUserId={demandUserId}
              />
            </React.Fragment>
          ) : null
        }
      </DashContainer>
    );
  }
}

export default withStyles(styles)(
  withRouter(connect(null, mapDispatchToProps)(EditAccountInfo))
);
