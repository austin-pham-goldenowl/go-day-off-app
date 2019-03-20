import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import {Paper, Grid, Typography, TextField, Button, withStyles} from '@material-ui/core';

/**
 * Components
 */
import DashContainer from '../DashContainer';

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
import ValidationSchema from "../CreateLeaveLetter/validationSchema";
import {createLeaveLetter} from "../../apiCalls/leaveLetterAPI";
import Icon from "../CreateLeaveLetter";
import DatePickerField from "../../components/DatePicker";
import SelectWithChips from "../../components/SelectWithChips";

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

class Setting extends React.Component {
  state = {
    info: [],
    buttonClickable: true
  };

  render() {
    return (
      <DashContainer>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Formik
              initialValues={initialValues}
              validationSchema={ValidationSchema}
              onSubmit={(values, actions) => {
                createLeaveLetter(values)
                  .then(res => {
                    handleShowNotif(
                      NOTIF_SUCCESS,
                      `Leave request created successfully!`
                    );
                    actions.resetForm();
                    actions.setSubmitting(false);
                  })
                  .catch(err => {
                    handleShowNotif(NOTIF_ERROR, `Can't create Leave request!`);
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
                const { buttonClickable } = this.state;
                return (
                  <Form>

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

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(Setting)
);