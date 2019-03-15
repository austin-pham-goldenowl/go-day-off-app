import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import classNames from 'classnames';

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

import SelectCustom from '../../components/CustomSelect';
// import DatePickerField from '../../components/DatePicker';
import DashContainer from '../DashContainer';

//Icons
import EditIcon from '@material-ui/icons/Edit';

//constants
import { responseUserPermission } from '../../constants/permission';

//Helpers
import { getUserId } from '../../helpers/authHelpers';
import { getGenderName } from '../../helpers/userHelpers';
//API
import { getProfile, updateProfile } from '../../apiCalls/userAPIs';

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
  }
});

const mapDispatchToProps = dispatch => {
  return {
    handleShowNotif: (type, message) =>
      dispatch(showNotification(type, message))
  };
};

class EditAccountInfo extends React.Component {
  state = {
    user: {
      fFirstName: '',
      fLastName: '',
      fGender: '',
      fPositionName: '',
      fPhone: '',
      fTeamName: '',
      fEmail: '',
      fTypeId: ''
    },
    editMode: false
  };

  handleEnableEditMode = enable => {
    this.setState(prevState => ({
      ...prevState,
      editMode: enable
    }));
  };

  loadData = async () => {
    let response = await getProfile(getUserId());
    let { status: reqStatusProfile, data: reqDataProfile } = response;

    if (reqStatusProfile === 200) {
      console.log(`reqDataProfile: `, reqDataProfile);
      this.setState({
        user: reqDataProfile.user
      });
    } else {
      console.log(`err: `, response);
    }
  };

  componentDidMount = () => {
    //call api get user profile
    this.loadData();
  };

  render() {
    const { classes, handleShowNotif } = this.props;
    const { user, editMode } = this.state;
    console.log(`state: `, this.state);
    return (
      <DashContainer className={classes.layout}>
        <Paper className={classes.paper}>
          <CssBaseline />
          {editMode && responseUserPermission['HR'] === user.fTypeId ? (
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
                    this.handleEnableEditMode(false);
                    this.loadData();
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
                              disabled={isSubmitting}
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
                              <Icon
                                fontSize="small"
                                className={classes.leftIcon}
                              >
                                delete_sweep
                              </Icon>
                              Discard
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
                        Edit profile
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
                                  options={mockup_gender}
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
                        {responseUserPermission['HR'] !==
                        user.fTypeId ? null : (
                          <React.Fragment>
                            {/** fTeamName name */}
                            <Grid item xs={12} sm={6}>
                              <Field
                                name="fTeamName"
                                render={({ field, form, ...otherProps }) => {
                                  return (
                                    <SelectCustom
                                      name={field.name}
                                      label="Team"
                                      value={field.value}
                                      options={mockup_team}
                                      onChange={handleChange}
                                    />
                                  );
                                }}
                              />
                            </Grid>
                            {/** fPositionName name */}
                            <Grid item xs={12} sm={6}>
                              <Field
                                name="fPositionName"
                                render={({ field, form, ...otherProps }) => {
                                  return (
                                    <SelectCustom
                                      name={field.name}
                                      label="Position"
                                      value={field.value}
                                      options={mockup_position}
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
                          disabled={isSubmitting}
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
                          <Icon fontSize="small" className={classes.leftIcon}>
                            delete_sweep
                          </Icon>
                          Discard
                        </Button>
                      </Grid>
                    </React.Fragment>
                  </Form>
                );
              }}
            </Formik>
          ) : (
            <React.Fragment>
              {responseUserPermission['HR'] === user.fTypeId ? (
                <div className={classes.topInfo}>
                  <Button
                    className={classes.button}
                    size="small"
                    variant="contained"
                    color="default"
                    onClick={() => this.handleEnableEditMode(true)}
                  >
                    <EditIcon className={classes.leftIcon} />
                    Edit
                  </Button>
                </div>
              ) : null}

              {/* Title */}
              <Typography component="h1" variant="h4">
                Profile
              </Typography>
              {/** End - Title */}
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
      </DashContainer>
    );
  }
}

EditAccountInfo.defaultProps = {
  initialValues: {
    fFirstName: '',
    fLastName: '',
    fGender: '',
    fPositionName: '',
    fPhone: '',
    fTeamName: '',
    fEmail: '',
    fTypeId: ''
  }
};

const mockup_gender = [
  {
    value: 0,
    label: 'Female'
  },
  {
    value: 1,
    label: 'Male'
  },
  {
    value: 2,
    label: 'Others'
  }
];

const mockup_team = [
  {
    value: '#123', //team id
    label: 'Ruby on Rails' //team name
  },
  {
    value: '#456',
    label: 'Project Assistant'
  },
  {
    value: '#789',
    label: 'JAVascript'
  }
];

const mockup_position = [
  {
    value: '111#', //team id
    label: 'Developer' //team name
  },
  {
    value: '222#',
    label: 'Intern/Fresher'
  },
  {
    value: '333#',
    label: 'Tech Lead'
  }
];

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(EditAccountInfo)
);
