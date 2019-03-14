import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const styles = theme => ({
  textField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
  },
})

const TextFieldReadOnly = (props) => {
  const { classes, label, defaultValue } = props;
  return (
      <TextField
      id="standard-read-only-input"
      
      label={label}
      value={`${defaultValue}`}
      className={classes.textField}
      fullWidth
      InputProps={{
        readOnly: true,
      }}
    />
  );
}
export default withStyles(styles)(TextFieldReadOnly);