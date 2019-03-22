import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel
} from '@material-ui/core';
import { LeaveDurationOptions } from '../constants/leaveDurationOptions';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    marginTop: theme.spacing.unit
  },
  group: {
    display: 'flex',
    flexDirection: 'row',
    margin: 0
  }
});

class DaySessionsRadio extends React.Component {
  render() {
    const { classes, label, disabled, form, field } = this.props;
    return disabled ? null : (
      <FormControl component="div" className={classes.formControl}>
        <FormLabel component="legend">{label ? label : `Options: `}</FormLabel>
        <RadioGroup
          className={classes.group}
          aria-label={label ? label : `Options: `}
          value={field.value}
          name={field.name}
          onChange={form.handleChange}
        >
          <FormControlLabel
            label="All day"
            control={<Radio />}
            value={LeaveDurationOptions.all}
          />
          <FormControlLabel
            label="Morning"
            control={<Radio />}
            value={LeaveDurationOptions.am}
          />
          <FormControlLabel
            label="Afternoon"
            control={<Radio />}
            value={LeaveDurationOptions.pm}
          />
        </RadioGroup>
      </FormControl>
    );
  }
}
export default withStyles(styles)(DaySessionsRadio);

DaySessionsRadio.propTypes = {
  classes: PropTypes.object.isRequired
};
