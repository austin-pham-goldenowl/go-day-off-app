import React from 'react';
import classNames from 'classnames';
import { Chip, Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  AccessTime as PendingIcon,
  DoneAll as ApprovedIcon,
  HighlightOffOutlined as RejectIcon,
  ErrorOutline as ErrorIcon
} from '@material-ui/icons';

//constants
import * as ReqStatusType from '../constants/requestStatusType';
import { requestStatusPillColors as PillColors } from '../constants/appThemeColors';
//helpers
import { getLeaveReqStatus } from '../helpers/leaveLetterHelper';

const styles = theme => ({
  pendingColor: {
    color: '#9F6000'
  },
  approvedColor: {
    color: '#4F8A10'
  },
  rejectedColor: {
    color: '#D8000C'
  },
  pending: {
    fontWeight: 'bold',
    backgroundColor: PillColors.pending
  },
  approved: {
    fontWeight: 'bold',
    backgroundColor: PillColors.approved
  },
  rejected: {
    fontWeight: 'bold',
    backgroundColor: PillColors.rejected
  },
  error: {
    backgroundColor: '#C1C1C1'
  }
});

/**
 * Request Status:
 * 0: Pending
 * 1: Approved
 * 2: Reject
 */

const RequestStatus = props => {
  const { classes, statusType } = props;
  switch (statusType) {
    case ReqStatusType.LEAVE_REQUEST_PENDING:
      return (
        <Chip
          label={getLeaveReqStatus(statusType)}
          className={classNames(classes.pending, classes.pendingColor)}
          avatar={<PendingIcon className={classes.pendingColor} />}
        />
      );
    case ReqStatusType.LEAVE_REQUEST_APPROVED:
      return (
        <Chip
          label="Approved"
          className={classNames(classes.approved, classes.approvedColor)}
          avatar={<ApprovedIcon className={classes.approvedColor} />}
        />
      );
    case ReqStatusType.LEAVE_REQUEST_REJECTED:
      return (
        <Chip
          label="Rejected"
          className={classNames(classes.rejected, classes.rejectedColor)}
          avatar={<RejectIcon className={classes.rejectedColor} />}
        />
      );
    default:
      return (
        <Avatar>
          <ErrorIcon />
        </Avatar>
      );
  }
};

RequestStatus.propTypes = {
  statusType: PropTypes.number.isRequired
};

export default withStyles(styles)(RequestStatus);
