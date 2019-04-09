import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { CancelToken } from 'axios';
import {Paper, Grid, Typography, TextField, Button, withStyles, Divider} from '@material-ui/core';
import Icon from "@material-ui/core/Icon";

/**
 * Components
 */
import DashContainer from '../DashContainer';

// Validation
// import ValidationSchema from "./validationSchema";

/**
 * Constants
 */
import SettingKeys from '../../constants/settings.js';

/**
 * APIs
 */
import * as settingAPIs from '../../apiCalls/settingAPIs';

// Notification redux
import {
  showNotification,
} from "../../redux/actions/notificationActions";
import { NOTIF_ERROR, NOTIF_SUCCESS } from "../../constants/notification";

const mapDispatchToProps = dispatch => {
  return {
    handleShowNotif: (type, message) =>
      dispatch(showNotification(type, message))
  };
};

class Setting extends React.Component {
  state = {
    settings: [],
    buttonClickable: true
  };

  loadSettingConfig = async () => {
    //call api get setting configs
    const response = await settingAPIs.getAllSettings(this.cancelSource.token);
    
    try {
      const { status, data: { settings } } = response;
      if (status === undefined || status !== 200) throw new Error(`No data`);
      const mappedSettings = settings.map(item => ({
        [item.fName]:item.fValue
      }))
      this.__isMounted && this.setState({settings: mappedSettings}, () => {
        this.props.handleShowNotif && this.props.handleShowNotif(NOTIF_SUCCESS, `Load setting completed!`);
      })
    }
    catch (err) {
      this.props.handleShowNotif && this.props.handleShowNotif(NOTIF_ERROR, `Load setting failed! (${err.message})`);
    }
  }

  componentDidMount = () => {
    this.__isMounted = true;
    this.cancelSource = CancelToken.source();
    // --
    this.loadSettingConfig();
  }

  componentWillUnmount = () => {
    this.__isMounted = false;
    this.cancelSource.cancel();
  }

  render() {
    const { classes, handleShowNotif, validationSchema } = this.props;
    
    return (
      <DashContainer>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography 
              component="h1" 
              variant="h4"
              className={classes.formTitle}
            >
              Settings
            </Typography>
            <Divider/>
            <Formik
              initialValues={{    
                [SettingKeys.EMAIL]: '',
                [SettingKeys.PWD]: '',
                [SettingKeys.MAX_ALLOWED_DAY_OFF]: 0
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                try {
                  const pairs = Object.keys(values).map(key => ([ key, values[key] ]));
                  const { status } = await settingAPIs.saveSettings(this.cancelSource.token, pairs);
                  
                  if(status !== 200) throw new Error();

                  handleShowNotif(
                    NOTIF_SUCCESS,
                    `Settings saved successfully!`
                  );
                  actions.setSubmitting(false);
                }
                catch(err) {
                  handleShowNotif(NOTIF_ERROR, `Failed saving settings! (${err.message})`);
                  actions.setSubmitting(false);
                }
              }}
              render={({
                errors,
                values,
                handleReset,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                handleChange,
              }) => {
                const { buttonClickable } = this.state;
                return (
                  <Fragment>
                    <Form className={classes.form}>
                      <Grid container spacing={8}>
                        {/* Email field */}
                        <Grid item xs={12}>
                          <Field render={({ field, form }) => (
                            <TextField
                              fullWidth
                              type="email" 
                              label="Email"
                              name={SettingKeys.EMAIL} 
                              autoCapitalize='off'
                              onChange={({ target: { name, value }}) => setFieldValue(name, value)
                            }/>
                          )}/>
                        </Grid>
                        {/* end- Email field */}
                        {/* Password field */}
                        <Grid item xs={12}>
                          <Field render={({ field, form }) => (
                            <TextField 
                              fullWidth
                              type="password" 
                              label="Password" 
                              name={SettingKeys.PWD}
                              autoComplete='off'
                              onChange={({ target: { name, value }}) => setFieldValue(name, value)
                            }/>
                          )}/>
                        </Grid>
                        {/* end - Password field */}
                        {/* Max Day-off field */}
                        <Grid item xs={12}>
                          <Field render={({ field, form }) => (
                            <TextField
                              fullWidth 
                              type="number"
                              label="Annual Day-off"
                              name={SettingKeys.MAX_ALLOWED_DAY_OFF}
                              InputProps={{ inputProps: { min: 0 } }}
                              onChange={({ target: { name, value }}) => setFieldValue(name, value)
                            }/>
                          )}/>
                        </Grid>
                        {/* end - Max Day-off field */}
                      </Grid>
                    </Form>
                    {/** Bottom Button Group*/}
                    <Grid
                      item
                      container
                      xs={12}
                      className={classes.buttonGroupBottom}
                    >

                      <Button
                        className={classes.button}
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={isSubmitting || !buttonClickable}
                      >
                        Save
                        <Icon
                          fontSize="small"
                          className={classes.rightIcon}
                        >
                          save_outlined
                        </Icon>
                      </Button>
                      <Button
                        className={classes.button}
                        size="small"
                        variant="outlined"
                        color="secondary"
                        onClick={handleReset}
                        disabled={isSubmitting || !buttonClickable}
                      >
                        Discard
                        <Icon
                          fontSize="small"
                          className={classes.rightIcon}
                        >
                          delete_sweep
                        </Icon>
                      </Button>
                    </Grid>
                  </Fragment>
                );
              }}
            />
          </Paper>
        </main>
      </DashContainer>
    )
  }
}

const styles = theme => ({
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
  form: {
    maxWidth: '480px',
    display: 'block',
    margin: '20px auto 0 auto'
  },
  buttonGroupBottom: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: '20px',
  },
  button: {
    marginRight: theme.spacing.unit,
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

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(Setting)
);