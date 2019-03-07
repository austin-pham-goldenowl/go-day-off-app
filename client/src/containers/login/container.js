import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import {
  Paper,
  Button,
  Input,
  Snackbar,
  InputLabel,
  Typography,
  CssBaseline,
  FormControl,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { 
  NOTIF_SUCCESS,
  NOTIF_WARNING,
  NOTIF_ERROR,
  NOTIF_INFO,
} from '../../constants/form';

import SnackbarNotifContent from '../../components/SnackbarNotification';

import { userLogin } from '../../apiCalls/authAPIs';

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
    forgotPwdHint: {
      marginTop: theme.spacing.unit *3,
    }
  });

class LoginWithFormik extends React.Component {
  state = {
    announce: {
      show: false,
      type: NOTIF_INFO,
      message: 'This is an announcement!'
    }
  }
  handleShowAnnouncement = (message = '', type = 'warning') => {
    this.setState({
      announce: {
        show: true,
        type: type,
        message: message,
      }
    });
  }
  handleHideAnnouncement = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState(prevState => ({
      announce: {
        ...prevState.announce,
        show: false,
      }
    }));
  }
  render() {
    const { classes, initialValues } = this.props;
      return (
        <main className={classes.main}>
          {/** Announcement */}
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.announce.show}
            autoHideDuration={5000}
            onClose={this.handleHideAnnouncement}
          >
            <SnackbarNotifContent
              onClose={this.handleHideAnnouncement}
              variant={this.state.announce.type}
              message={this.state.announce.message}
            />
          </Snackbar>
          {/** End - Announcement */}
          <CssBaseline />
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4">
              Sign in
            </Typography>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                console.log(`values: `, values);
                userLogin(values)
                  .then(res => {
                    console.log('RESPONSE -> Login -> ', res);
                  })
                  .catch(err => {
                    console.log('ERROR -> Login -> Error.name: ', err.name);
                    console.log('ERROR -> Login -> Error.message: ', err.message);
                    this.handleShowAnnouncement(err.message, NOTIF_ERROR);
                  });
              }}
            >
            {({ 
              errors, 
              values, 
              handleReset, 
              handleSubmit,
              setFieldValue, 
              handleChange, 
              ...formikProps  
            }) => (
                <Form className={classes.form}>
                  <Field name="email" render={({field, form, ...otherProps}) => {
                    console.log('Email field: ',field);
                    console.log('Email form: ',form);
                    console.log('otherProps: ', otherProps);
                    return (
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input 
                          autoFocus
                          id="email" 
                          name="email" 
                          type="email" 
                          value={field.value} 
                          autoComplete="email" 
                          onChange={({target: { value}}) => 
                            setFieldValue(field.name, value)
                          }
                        />
                      </FormControl>
                    )
                  }}/>
                  <Field name="rawPwd" render={({field, form, ...otherProps}) => {
                    return (
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="rawPwd">Password</InputLabel>
                        <Input 
                          id="password" 
                          name="rawPwd" 
                          type="password" 
                          value ={field.value}
                          autoComplete="current-password"
                          onChange={({target: { value}}) => 
                            setFieldValue(field.name, value)
                          }
                        />
                      </FormControl>
                    )
                  }}/>
                  <Button 
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    className={classes.submit}
                    onClick={handleSubmit}
                  >
                    Let's GO
                  </Button>

                  <div className={classes.forgotPwdHint}>
                    Forgot password? Click <Link to="/forgot-password">here</Link>
                  </div>
                </Form>
              )}
              </Formik>
          </Paper>
        </main>
      )
  }
}

LoginWithFormik.defaultProps = {
  initialValues: {
    email: 'awfawf@haah.com', 
    rawPwd: ''
  }
}
export default withStyles(styles)(LoginWithFormik);
