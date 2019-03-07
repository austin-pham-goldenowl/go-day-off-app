import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import SnackbarNotifContent from './SnackbarNotification';


import {
  hideNotification,
} from '../redux/actions/notificationActions';

const mapStateToProps = (state) => {
  return {
    isOpen: state.notificationReducers.show,
    type: state.notificationReducers.type,
    message: state.notificationReducers.message,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleNotifClose: () => dispatch(hideNotification())
  }
}

const ConnectedSnackbarWrapper =  (props) => {
  return (
    <Snackbar 
      anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={props.isOpen}
        autoHideDuration={5000}
        onClose={props.handleNotifClose && props.handleNotifClose}
      >
      <SnackbarNotifContent
        onClose={props.handleNotifClose && props.handleNotifClose}
        variant={props.type}
        message={props.message}
      />
    </Snackbar>
  )
}

ConnectedSnackbarWrapper.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps) (ConnectedSnackbarWrapper);