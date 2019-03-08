import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { Link } from 'react-router-dom';
import {
  Paper,
  Button,
  Input,
  InputLabel,
  Typography,
  CssBaseline,
  FormControl,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

// Validation Schema
import LoginValidationSchema from './validationSchema';

// Using api calls
import { login } from '../../apiCalls/authAPIs';

// Notification redux 
import { showNotification } from '../../redux/actions/notificationActions';
import {
  NOTIF_ERROR,
  NOTIF_SUCCESS
} from '../../constants/notification';
const mapDispatchToProps = (dispatch) => {
  return {
    handleShowNotif: (type, message) => dispatch(showNotification(type, message))
  }
}
// End - Notification redux


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
  render() {
    const { classes, initialValues, handleShowNotif } = this.props;
      return (
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4">
              Sign in
            </Typography>
            <Formik
              initialValues={initialValues}
              validateOnBlur={true}
              validationSchema={LoginValidationSchema}
              onSubmit={(values, actions) => {
                console.log(`Submitted values: `, values);
                login(values)
                  .then(res => {
                    console.log('RESPONSE -> Login -> ', res);
                    handleShowNotif(NOTIF_SUCCESS, 'Login successfully!');
                  })
                  .catch(err => {
                    console.log('ERROR -> Login -> Error.name: ', err.name);
                    console.log('ERROR -> Login -> Error.message: ', err.message);
                    handleShowNotif(NOTIF_ERROR, `Login fail`);
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
                  <Field name="username" render={({field, form, ...otherProps}) => {
                    return (
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input 
                          autoFocus
                          id="username" 
                          name="username" 
                          type="text" 
                          value={field.value} 
                          autoComplete="username" 
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
    username: 'hr', 
    rawPwd: 'password'
  }
}
export default withStyles(styles)(connect(null, mapDispatchToProps)(LoginWithFormik));
