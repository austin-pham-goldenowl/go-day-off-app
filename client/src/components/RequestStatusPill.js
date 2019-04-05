import React from 'react';
import classNames from 'classnames';
import { Chip, Avatar } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
  DoneAll as ApprovedIcon,
  AccessTime as PendingIcon,
  ErrorOutline as ErrorIcon,
  HighlightOffOutlined as RejectIcon,
} from '@material-ui/icons';

//constants
import * as ReqStatusType from '../constants/requestStatusType';
import { REJECT_TYPE } from '../constants/rejectType';
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
  const { classes, statusType, rejectType } = props;
  switch (statusType) {
    case ReqStatusType.LEAVE_REQUEST_PENDING:
      return (
        <Chip
          label={getLeaveReqStatus(statusType)}
          className={classNames(classes.pending, classes.pendingColor)}
          icon={<PendingIcon className={classes.pendingColor} />}
        />
      );
    case ReqStatusType.LEAVE_REQUEST_APPROVED:
      return (
        <Chip
          label="Approved"
          className={classNames(classes.approved, classes.approvedColor)}
          icon={<ApprovedIcon className={classes.approvedColor} />}
        />
      );
    case ReqStatusType.LEAVE_REQUEST_REJECTED:
      return (
        <Chip
          label={rejectType && rejectType === REJECT_TYPE.BY_APPROVER ? 'Rejected' : 'Canceled'}
          className={classNames(classes.rejected, classes.rejectedColor)}
          icon={<RejectIcon className={classes.rejectedColor} />}
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

export default withStyles(styles)(RequestStatus);
