import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import {
  Select,
  FilledInput,
  OutlinedInput,
  MenuItem,
  FormControl,
  InputLabel,
  Input,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '135px',
  },
});

const InputComponentOptions = { 
  standard: Input, 
  filled: FilledInput,
  outlined: OutlinedInput,
};

class FilterSelect extends React.Component {
  state = {

  }
  render() {
    const { name, label, value, options, variant, classes, onChange, ...props} = this.props;
    const selectBoxId = `select-box-${shortid.generate()}`;
    const InputComponent = !variant ? Input : InputComponentOptions[variant];
		console.log(`TCL: FilterSelect -> render -> props`, props)
    
    return (
      <FormControl 
        variant={!variant ? 'standard' : variant}
        className={classes.formControl}
      >
        <InputLabel htmlFor={selectBoxId}>{label}</InputLabel>
          <Select 
            value={value}
            onChange={onChange}
            input={<InputComponent name={name} id={selectBoxId} />}
            {...props}
          >
            <MenuItem key='none' value=''>
              <em>None</em>
            </MenuItem>
            {options && options.map(item => (
              <MenuItem 
                value={item.value}
                key={shortid.generate()}
              >
              {item.label}
              </MenuItem>
            ))}
          </Select>
      </FormControl>
    );
  }
}

FilterSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(FilterSelect);