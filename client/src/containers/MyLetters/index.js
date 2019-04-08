import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LettersManagement from '../../components/LettersManagement';
import DashContainer from '../DashContainer';

import { getMyLeaveLetters, getDemandLetterByFilter } from '../../apiCalls/leaveLetterAPI';

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
        <LettersManagement title='My letters' api={getMyLeaveLetters} filterAPI={getDemandLetterByFilter} />
      </div>
    </DashContainer>
  );
};

export default withStyles(styles)(Dashboard);
