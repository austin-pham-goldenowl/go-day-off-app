import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CalendarMeeting from '../../components/CalendarMeeting';
import DashContainer from '../DashContainer';


const styles = theme => ({
  calendarContainer: { marginBottom: '2em' },
  tableContainer: {
    height: 320
  }
});

const MeetingRoom = props => {
  const { classes } = props;

  return (
    <DashContainer>
      <Typography variant='h4' gutterBottom component='h1'>
        Calendar
      </Typography>
      <Typography component='div' className={classes.calendarContainer}>
        <CalendarMeeting />
      </Typography>
    </DashContainer>
  );
};

export default withStyles(styles)(MeetingRoom);
