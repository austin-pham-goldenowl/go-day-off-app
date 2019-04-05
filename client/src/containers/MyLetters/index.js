import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LettersManagement from '../../components/LettersManagement';
import DashContainer from '../DashContainer';

import { getMyLeaveLetters } from '../../apiCalls/leaveLetterAPI';

/**
 * Helpers
 */
// import { getUserId } from '../../helpers/authHelpers';

const styles = theme => ({
  calendarContainer: { marginBottom: '2em' },
  tableContainer: {
    height: 320
  }
});

const Dashboard = props => {
  const { classes } = props;

  return (
    <DashContainer>
      <div className={classes.tableContainer}>
        <LettersManagement title='My letters' api={getMyLeaveLetters} />
      </div>
    </DashContainer>
  );
};

export default withStyles(styles)(Dashboard);
