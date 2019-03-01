import React from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
import { 
  Paper, 
  Grid, 
  Typography, 
  TextField,
  Button, 
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { 
  changeLeaveType,
  changeApprover,
  changeInformTo,
  changeReason,
  changeDateStart,
  changeDateEnd,
} from './actions';

import SelectCustom from '../../components/customSelect';
import TextFieldReadOnly from '../../components/readOnlyTextField';
import DatePicker from '../../components/datePicker';
import SelectWithChips from '../../components/selectWithChips';

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeLeaveType: value => dispatch(changeLeaveType(value)),
    onChangeApprover: value => dispatch(changeApprover(value)),
    onChangeInformTo: value => dispatch(changeInformTo(value)),
    onChangeReason: value => dispatch(changeReason(value)),
    onChangeDateStart: value => dispatch(changeDateStart(value)),
    onChangeDateEnd: value => dispatch(changeDateEnd(value)),
  }
}
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
      minWidth: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)] : {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttonGroupTop: {
    justifyContent: 'flex-start',
    marginBottom: theme.spacing.unit * 3,
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
    [theme.breakpoints.up('sm')]:{
      display: 'flex'
    }
  },
  buttonGroupBottom: {
    justifyContent: 'flex-end',
    marginTop: theme.spacing.unit * 3,
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    },
    [theme.breakpoints.down('xs')]:{
      display: 'flex',
    }
  }
  ,
  button: {
    marginLeft: theme.spacing.unit,
    width: 100
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  smallIcon: {
    fontSize: 20,
  }
});

class ConnectedAbsenceLetter extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Grid item container xs={12} className={classes.buttonGroupTop}>
            {/* Top buttons */}
                <Button 
                  className={classes.button} 
                  size="small"
                  variant="contained" 
                  color="primary"
                >
                  Send
                </Button>
                <Button 
                  className={classes.button}
                  size="small"
                  variant="outlined"
                  color="secondary"
                >
                  Discard
                </Button>
            </Grid>
            <Typography component="h1" variant="h5" align="center">
              Create new request
            </Typography>
            <React.Fragment>
              <Grid container spacing={24}>
                <Grid item xs={12} sm={6}>
                  <Grid item xs={12}> 
                    {/* Select Leave type*/}
                    <SelectCustom 
                      name="leaveTypes"
                      label="Leave Type"
                      values={mockup_LeaveType}
                      onChange={this.props.onChangeLeaveType}
                    />
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

                  
                </Grid>
                {/* Right side */}
                <Grid item xs={12} sm={6}>
                <Grid item xs={12}>
                    {/* Supervisor */}
                    <SelectCustom 
                      name="approver"
                      label="Approver"
                      values={mockup_Approver}
                      onChange={this.props.onChangeApprover}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* Inform to  */}
                    <SelectWithChips 
                      multiple
                      label="Inform to"
                      data={mockup_InformTo}
                      onChange={this.props.onChangeInformTo}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* Reason Selection  */}
                    <SelectCustom 
                      name="reason"
                      label="Reason"
                      values={mockup_Reason}
                      onChange={this.props.onChangeReason}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {/* Reason in detail */}
                    <TextField
                      required
                      multiline
                      disabled={true}
                      id="otherReason"
                      name="otherReason"
                      label="Reason detail"
                      fullWidth
                      autoComplete="fOtherReason"
                    />
                  </Grid>
                </Grid>
                {/* Bottom buttons */}
                <Grid item xs={12} className={classes.buttonGroupBottom} >
                  <Button 
                    className={classes.button} 
                    size="small"
                    variant="contained" 
                    color="primary"
                  >
                    Send
                  </Button>
                  <Button 
                    className={classes.button}
                    size="small"
                    variant="outlined"
                    color="secondary"
                  >
                    Discard
                  </Button>
                </Grid>
                  {/* End - Right side */}
                </Grid>
              </React.Fragment>
          </Paper>
        </main>
      </div>
    )
  }
}

const AbsenceLetter = connect(null, mapDispatchToProps) (withStyles(styles)(ConnectedAbsenceLetter));
export default AbsenceLetter
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
let mockup_Approver= [
  {
    value: 'tamdh@mail.com',
    label: 'Đặng Hà Tâm',
  },
  {
    value: 'phuocot@mail.com',
    label: 'Ôn Thanh Phước',
  }
];


let mockup_InformTo = [
  { label: 'Timon', value: 'timon@email.com' },
  { label: 'Jayce', value: 'jayce@email.com' },
];

let mockup_Reason = [
  {
    value: 'Bị ốm',
    label: 'Bị ốm',
  },
  {
    value: 'Giải quyết việc gia đình',
    label: 'Giải quyết việc gia đình',
  },
  {
    value: 'Có lịch hẹn khám bệnh',
    label: 'Có lịch hẹn khám bệnh',
  },
  {
    value: 'Áp lực công việc',
    label: 'Áp lực công việc',
  },
  {
    value: 'Lý do khác',
    label: 'Lý do khác',
  },
];