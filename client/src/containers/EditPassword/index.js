import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';

//material-ui
import {
  Paper,
  Button,
  Grid,
  CssBaseline,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel
} from '@material-ui/core';

import DashContainer from '../DashContainer';

import { withStyles } from '@material-ui/core/styles';


//ValidationSchema


//API
import CancelToken from 'axios';

//Notif redux
import { NOTIF_ERROR, NOTIF_SUCCESS } from '../../constants/notification';
import { showNotification } from '../../redux/actions/notificationActions';

import { getUserId } from '../../helpers/authHelpers';

import { checkPassword, updatePassword } from '../../apiCalls/userAPIs';

import ValidationSchema from './validationSchema';

const mapDispatchToProps = dispatch => {
  return {
    handleShowNotif: (type, message) =>
      dispatch(showNotification(type, message))
  };
};

const initialValues = {
  fPassword: '',
  fNewPassword: '',
  fConfirmPassword: ''
}

class EditPassword extends React.Component {

  state = {
    checkStatus: false,
  }

  handleEnableEditMode = enable => {
    this.setState(prevState => ({
      ...prevState,
      editMode: enable
    }));
  };


  componentDidMount = () => {
    this.__isMounted = true;
  };

  componentWillUnmount = () => {
    this.__isMounted = false;
  }

  render() {
    const { classes, handleShowNotif } = this.props;
    const { checkStatus } = this.state;
    return (
      <DashContainer className={classes.layout}>
          <CssBaseline />
          <Paper className={classes.paper}>
              <Formik
                initialValues={initialValues}
                validationSchema={ValidationSchema}
                onSubmit={(values, actions) => {
                      const userId = getUserId();
                      // compare Password with API
                      checkPassword(userId, values.fPassword)
                        .then(res => {
                          // compare Password with NewPassword
                          if(values.fPassword === values.fNewPassword){
                            handleShowNotif(NOTIF_ERROR, "Password and NewPassword must not match")
                            actions.setSubmitting(false);
                          } else {
                            // Compare Password with Confirm Password
                            if(values.fNewPassword !== values.fConfirmPassword){
                              handleShowNotif(NOTIF_ERROR, "NewPassword and ConfirmPasswod is not match")
                              actions.setSubmitting(false);
                            } else {
                              // Update Password
                              updatePassword(userId, values.fNewPassword)
                              .then(res => {
                                handleShowNotif(NOTIF_SUCCESS, "Update Password success !")
                                actions.resetForm();
                              })
                              .catch(err => {
                                handleShowNotif(NOTIF_ERROR, "Update Password failed !")
                                actions.setSubmitting(false);
                              })
                            }
                          }
                        })
                        .catch(err => {
                          handleShowNotif(NOTIF_ERROR, "Password is not match")
                          actions.setSubmitting(false);
                        })
                    }
                  }
              >
                {({
                  values,
                  isSubmitting,
                  handleReset,
                  handleSubmit,
                  handleBlur,
                  handleChange
                }) => {
                  return (
                    <Form className={classes.changePassword}>
                      <React.Fragment>
                        {/** First name */}
                        <Grid container spacing={16}>
                        <React.Fragment>
                          <Typography
                            variant="h5"
                            align="center"
                            component="h1"
                            className={classes.formTitle}
                          >
                            Change password
                          </Typography>
                        </React.Fragment>
                        <Grid item xs={12} sm={12}>
                            <Field
                              name="fPassword"
                              render={({ field }) => {
                                return (
                                  <TextField
                                    fullWidth
                                    label="Current assword"
                                    name={field.name}
                                    type={checkStatus ? 'text' : 'password'}
                                    value={field.value}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                );
                              }}
                            />
                            <ErrorMessage name='fPassword'>
                              {msg => (
                                <div className={classes.errorMessage}>
                                  {msg}
                                </div>
                              )}
                            </ErrorMessage>
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <Field
                              name="fNewPassword"
                              render={({ field }) => {
                                return (
                                  <TextField
                                    fullWidth
                                    label="New password"
                                    name={field.name}
                                    type={checkStatus ? 'text' : 'password'}
                                    value={field.value}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    secureTextEntry
                                  />
                                );
                              }}
                            />
                            <ErrorMessage name='fNewPassword'>
                              {msg => (
                                <div className={classes.errorMessage}>
                                  {msg}
                                </div>
                              )}
                            </ErrorMessage>
                          </Grid>
                          {/** fEmail  */}
                          <Grid item xs={12} sm={12}>
                            <Field
                              name="fConfirmPassword"
                              render={({ field, form }) => {
                                return (
                                  <TextField
                                    fullWidth
                                    label="Confirm new password"
                                    type={checkStatus ? 'text' : 'password'}
                                    name={field.name}
                                    value={field.value}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    secureTextEntry
                                  />
                                );
                              }}
                            />
                            <ErrorMessage name="fConfirmPassword">
                              {msg => (
                                <div className={classes.errorMessage}>
                                  {msg}
                                </div>
                              )}
                            </ErrorMessage>
                          </Grid>
                          <Grid item sx={12} sm={12}>
                              <Field
                                name="showPassword"
                                render = {({ field, form }) => {
                                  return (
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                        className={{marginRight: 0}}
                                        name={field.name}
                                        checked={checkStatus}
                                        onChange={() => this.setState({checkStatus: !this.state.checkStatus})}
                                        color="primary"
                                      />
                                      }
                                      label="Show password"
                                    />
                                  )
                                }}
                              />
                          </Grid>
                          <Grid item xs={12} sm={12}>
                            <Button 
                              type='submit'
                              size="small"
                              color="primary"
                              variant="contained"
                              fullWidth={true}
                            >
                              Change Password
                            </Button>
                          </Grid>
                        </Grid>
                      </React.Fragment>
                    </Form>
                  );
                }}
              </Formik>
          </Paper>
      </DashContainer>
    );
  }
}


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
  formTitle: {
    marginBottom: theme.spacing.unit * 2,
    textAlign: 'center',
    width: '100%'
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
  errorMessage: {
    color: 'red',
    fontSize: 12,
    fontWeight: 500
  },
  changePassword: {
    maxWidth: 400,
    minWidth: 200,
    margin: "auto",
  },
  checkBox: {
    padding: 0
  }
});

export default withStyles(styles)(
  connect(null, mapDispatchToProps)(EditPassword)
);
