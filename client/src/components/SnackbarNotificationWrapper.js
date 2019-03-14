import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Snackbar } from "@material-ui/core";
import SnackbarNotifContent from "./SnackbarNotification";

import { hideNotification } from "../redux/actions/notificationActions";

const mapStateToProps = state => {
  return {
    isOpen: state.notificationReducers.show,
    type: state.notificationReducers.type,
    message: state.notificationReducers.message,
    notifAutoHide: state.notificationReducers.autoHide
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleNotifClose: () => dispatch(hideNotification())
  };
};

const ConnectedSnackbarWrapper = props => {
  const { notifAutoHide } = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={props.isOpen}
      autoHideDuration={notifAutoHide ? 5000 : null}
      onClose={props.handleNotifClose && props.handleNotifClose}
    >
      <SnackbarNotifContent
        onClose={props.handleNotifClose && props.handleNotifClose}
        variant={props.type}
        message={props.message}
      />
    </Snackbar>
  );
};

ConnectedSnackbarWrapper.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedSnackbarWrapper);
