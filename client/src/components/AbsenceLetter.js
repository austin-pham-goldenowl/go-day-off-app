import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
import { 
  Paper, 
  Grid, 
  Typography, 
  TextField, 
  // FormControlLabel,
  // FormControl,
  // OutlinedInput,
  // InputLabel,
  // Select,
  // MenuItem,
  // FormLabel,
  // CssBaseline,
  // AppBar,
  // Toolbar
} from '@material-ui/core';
// import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

import OutlinedSelect from './OutlinedSelect';

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

// Mockup data
let mockupData = [
  {
    value: 10,
    label: 'Ten',
  },
  {
    value: 20,
    label: 'Twenty',
  },
  {
    value: 30,
    label: 'Thirty',
  },
  {
    value: 99999,
    label: 'Ninety-nine thousands and nine hundreds ninety-nine'
  }
];


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
                    <OutlinedSelect name="selectNumber" values={mockupData}/>
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      required
                      id="startDate"
                      name="startDate"
                      label="Start Date"
                      fullWidth
                      autoComplete="fstartDate"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="endDate"
                      name="endDate"
                      label="End Date"
                      fullWidth
                      autoComplete="fEndDate"
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="leaveType"
                      name="leaveType"
                      label="Leave Type"
                      fullWidth
                      autoComplete="fLeaveType"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="startDate"
                      name="startDate"
                      label="Start Date"
                      fullWidth
                      autoComplete="fstartDate"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="endDate"
                      name="endDate"
                      label="End Date"
                      fullWidth
                      autoComplete="fEndDate"
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