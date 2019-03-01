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
  Button,
  
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


class SelectWithChips extends React.Component {
    state = {
      selected: [],
    }

  handleChange = (event)=>{
    console.log('Chosen value: ', event.target.value);
    this.setState({
      selected: event.target.value
    });
    this.props.onChange && this.props.onChange(event.target.value);
  };

  handleDeleteBound = value => event => {
    console.log(value);
    const {selected} = this.state;
    let deleteItem = selected.indexOf(value);
    selected.splice(deleteItem, 1);
    this.setState({
      selected: selected
    });
  }

  render () {
    const { classes, multiple, label, data } = this.props;
    const { selected } = this.state;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-chip">Chip</InputLabel>
        <Select
          multiple
          value={selected}
          onChange={this.handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(item => (
                <Chip 
                  key={item.value} 
                  label={item.label} 
                  className={classes.chip} 
                  onDelete={this.handleDeleteBound(item)}
                />
              ))}
            </div>
          )}
        >
          {data.map(item => (
              <MenuItem 
                key={shortid.generate()} 
                value={item}
              >
              { `${item.label} (${item.value})`}
              {selected.indexOf(item) !== -1 ? (<Icon>check</Icon>) : null}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    );
  }
}

SelectWithChips.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(SelectWithChips);