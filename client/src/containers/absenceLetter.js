import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
import { 
  Paper, 
  Grid, 
  Typography, 
  TextField, 
} from '@material-ui/core';
// import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

import OutlinedSelect from '../components/outlinedSelect';
import TextFieldReadOnly from '../components/readOnlyTextField';
import DatePicker from '../components/datePicker';
import SelectWithChips from '../components/selectWithChips';

// const emailRegexPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)] : {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)] : {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

class AbsenceLetter extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Create absence letter
            </Typography>
            <React.Fragment>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                  <Grid item xs={12}> 
                    {/* Select Leave type*/}
                    <OutlinedSelect 
                      name="leaveTypes" 
                      label="Leave Type"
                      values={mockup_LeaveType}/>
                  </Grid>
                  <Grid item xs={12} >
                    {/* Show Duration */}
                    <TextFieldReadOnly 
                      label="Duration"
                      defaultValue={3}
                      />
                  </Grid>
                  <Grid item container spacing={24}>
                    {/* Date picker */}
                    <Grid item xs={6}>
                      {/* From startDate - to endDate*/}
                      <DatePicker label="From" fullWidth/>
                    </Grid>
                    <Grid item xs={6}>
                      {/* From startDate - to endDate*/}
                      <DatePicker label="To" fullWidth/>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    {/* Reason */}
                    <TextField
                      required
                      multiline
                      id="leaveReason"
                      name="leaveReason"
                      label="Reason"
                      fullWidth
                      autoComplete="fLeaveReason"
                    />
                  </Grid>
                </Grid>
                {/* Right side */}
                <Grid item xs={12} sm={6}>
                  <Grid item xs={12}>
                    {/* Mode  */}
                    <OutlinedSelect 
                      name="mode" 
                      label="Mode" 
                      values={mockup_LeaveMode}/>
                  </Grid>
                  <Grid item xs={12}>
                    {/* Supervisor */}
                    <OutlinedSelect 
                      name="supervisor"
                      label="Supervisor"
                      values={mockup_Supervisor}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* Inform to  */}
                    <SelectWithChips 
                      multiple
                      label="Inform to"
                      data={mockup_InformTo}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          </Paper>
        </main>
      </div>
    )
  }
}


export default withStyles(styles)(AbsenceLetter);

// Mockup data
let mockup_LeaveType = [
  {
    value: 10,
    label: 'Viec ca nhan',
  },
  {
    value: 20,
    label: 'Nghi om',
  },
  {
    value: 30,
    label: 'Phep nam',
  },
  {
    value: 99999,
    label: 'Nghi che do'
  }
];
let mockup_LeaveMode = [
  {
    value: 1,
    label: 'By Employee'
  },
  {
    value: 2,
    label: 'By Company'
  },
  {
    value: 3,
    label: 'By Department'
  },
]
let mockup_Supervisor = [
  {
    value: 10,
    label: 'Đặng Hà Tâm',
  },
  {
    value: 20,
    label: 'Ôn Thanh Phước',
  }
];

let mockup_InformTo = [
  { label: 'Timon', value: 'timon@email.com' },
  { label: 'Jayce', value: 'jayce@email.com' },
];