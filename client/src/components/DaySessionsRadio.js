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
  },
  radioOpt: {
    padding: '4px',
    paddingLeft: '12px'
  }
});

class DaySessionsRadio extends React.Component {
  render() {
    const { 
      field, 
      form, 
      label, 
      classes,
      disabled,
      disableMorning,
      disableAfternoon 
    } = this.props;
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
            control={<Radio className={classes.radioOpt}/>}
            value={LeaveDurationOptions.all}
          />
          {disableMorning ? null 
            :
            <FormControlLabel
              label="Morning"
              control={<Radio className={classes.radioOpt}/>}
              value={LeaveDurationOptions.am}
            />
          }
          {disableAfternoon ? null 
            :
            <FormControlLabel
              label="Afternoon"
              control={<Radio className={classes.radioOpt}/>}
              value={LeaveDurationOptions.pm}
            />
          }
        </RadioGroup>
      </FormControl>
    );
  }
}

DaySessionsRadio.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DaySessionsRadio);
