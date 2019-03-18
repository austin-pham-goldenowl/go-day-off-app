import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { 
  Chip,
  Select,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

import shortid from 'shortid';


const styles = theme => ({
  formControl: {
    margin:0,
    width: '100%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

const SelectWithChips = ({ field, form, classes, label, multiple, options, ...otherProps}) => {

  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="select-multiple-chip">{label}</InputLabel>
      <Select
        multiple
        value={field.value}
        input={<Input id="select-multiple-chip" />}
        onChange={({ target: {value} }) => 
          form.setFieldValue(field.name, value)
        }
        renderValue={selectedOptions => (
          <div className={classes.chips}>
            {selectedOptions.map(item => (
              <Chip 
                key={item.value} 
                label={item.label} 
                className={classes.chip} 
                onDelete={() => {
                  const selected = form.values.informTo;
                  let deleteItem = selected.indexOf(item);
                  selected.splice(deleteItem, 1);
                  const payload = {...form.values, informTo: selected};
                  form.setValues(payload);
                }}
              />
            ))}
          </div>
        )}
      >
        {options.map(item => {
          return (
            <MenuItem 
              value={item}
              key={shortid.generate()} 
            >
            { `${item.label} (${item.value})`}
            {field.value.indexOf(item) !== -1 ? (<Icon>check</Icon>) : null}
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
SelectWithChips.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default withStyles(styles)(SelectWithChips);