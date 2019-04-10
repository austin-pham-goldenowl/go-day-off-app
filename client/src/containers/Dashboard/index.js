import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Calendar from '../../components/Calendar';
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
      <Typography variant='h4' gutterBottom component='h1'>
        Calendar
      </Typography>
      <Typography component='div' className={classes.calendarContainer}>
        <Calendar />
      </Typography>
      <Typography variant='h4' gutterBottom component='h2'>
        My letters
      </Typography>
      <div className={classes.tableContainer}>
        <LettersManagement api={getMyLeaveLetters} filterAPI={getDemandLetterByFilter} />
      </div>
    </DashContainer>
  );
};

export default withStyles(styles)(Dashboard);
