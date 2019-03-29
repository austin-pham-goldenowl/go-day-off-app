import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import {Paper, Grid, Typography, TextField, Button, withStyles} from '@material-ui/core';
import Icon from "@material-ui/core/Icon";

/**
 * Components
 */
import DashContainer from '../DashContainer';

// Validation
// import ValidationSchema from "./validationSchema";

/**
 * APIs
 */
import * as settingAPIs from '../../apiCalls/settingAPIs';

// Notification redux
import {
  showNotification,
  hideNotification
} from "../../redux/actions/notificationActions";
import { NOTIF_ERROR, NOTIF_SUCCESS } from "../../constants/notification";

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

class Setting extends React.Component {
  state = {
    info: [],
    buttonClickable: true
  };

  render() {
    const { classes, initialValues, handleShowNotif, validationSchema } = this.props;

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
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                try {
                  const pairs = Object.keys(values).map(key => {
                    return ({ [key]: values.key });
                  })
                  const { status } = await settingAPIs.saveSettings(pairs);
                  if(status !== 201) throw new Error();
                  handleShowNotif(
                    NOTIF_SUCCESS,
                    `Settings saved successfully!`
                  );
                  actions.resetForm();
                  actions.setSubmitting(false);
                }
                catch(err) {
                  handleShowNotif(NOTIF_ERROR, `Failed saving settings`);
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
                         ...formikProps
                       }) => {
                const { buttonClickable } = this.state;
                return (
                  <Form>
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
                          )}
                        />
                    </Grid>
                    <Grid container spacing={16}>
                      {/* Email field */}
                      <Grid item xs={12} sm={6}>
                        <Field render={({ field, form }) => (
                          <TextField 
                            fullWidth 
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            value={values.email}
                            onChange={({ target: { name, value }}) => setFieldValue(name, value)
                          }/>
                        )}/>
                      </Grid>
                      {/* end- Email field */}
                      {/* Password field */}
                      <Grid item xs={12} sm={6}>
                      <Field render={({ field, form }) => (
                          <TextField 
                            fullWidth 
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            value={values.password}
                            onChange={({ target: { name, value }}) => setFieldValue(name, value)
                          }/>
                      )}/>
                      </Grid>
                      {/* end - Password field */}
                    </Grid>
                  </Form>
                );
              }}
            />
          </Paper>
        </main>
      </DashContainer>
    )
  }
}

Setting.defaultProps = {
  initialValues: {
    email: "",
    password: ""
  }
}

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(Setting)
);