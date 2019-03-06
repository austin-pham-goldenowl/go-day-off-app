import React from 'react';
import classNames from 'classnames';
import {
  Snackbar,
  SnackbarContent,
  IconButton,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import {
  green,
  amber,
} from '@material-ui/core/colors'

import { 
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Close as CloseIcon,
} from '@material-ui/icons';

import { 
  NOTIF_SUCCESS,
  NOTIF_WARNING,
  NOTIF_ERROR,
  NOTIF_INFO,
} from '../constants/form';

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const variantIcon = {
  [NOTIF_WARNING]: WarningIcon,
  [NOTIF_SUCCESS]: CheckCircleIcon,
  [NOTIF_ERROR]: ErrorIcon,
  [NOTIF_INFO]: InfoIcon,
}

const SnackbarNotif = (props) => {
  const { classes, className, message, onClose, variant, ...otherProps } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent 
      className={classNames(classes[variant], className)}
      message={
        <span className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)}/>
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          color="inherit"
          aria-label="Close"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon}/>
        </IconButton>
      ]}
    >
    </SnackbarContent>
  )
}

export default withStyles(styles1)(SnackbarNotif);