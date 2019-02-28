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


class SelectWithChips extends React.Component {
  state = {
    selected: [],
  }

  handleChange = (event)=>{
    console.log('Chosen value: ', event.target.value);
    this.setState({
      selected: event.target.value
    });
  };

  render () {
    const { classes, multiple, label, data } = this.props;
    const { selected } = this.state;
    return (
        <FormControl className={classes.formControl} >
          <InputLabel htmlFor="select-chip">{label}</InputLabel>
          <Select
            multiple={multiple}
            value={this.state.selected}
            onChange={this.handleChange}
            input={<Input id="select-chip"/>}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(item => (
                  <Chip 
                    key={shortid.generate()} 
                    label={item.label} 
                    className={classes.chip}/>
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
              {/* {selected.indexOf(item) !== -1 ? (<Icon>check</Icon>) : null} */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
    );
  }
}

SelectWithChips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectWithChips);