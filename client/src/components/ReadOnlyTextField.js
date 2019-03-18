import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";

const TextFieldReadOnly = props => {
  const { label, defaultValue } = props;
  return (
    <TextField
      id="standard-read-only-input"
      label={label}
      value={`${defaultValue}`}
      fullWidth
      InputProps={{
        readOnly: true
      }}
    />
  );
};

TextFieldReadOnly.propTypes = {
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired
};
export default TextFieldReadOnly;
