import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem 
} from '@material-ui/core';

import shortid from 'shortid';

const styles = theme => ({
  formControl: {
    // margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
    display: 'flex',
  },
});

class OutlinedSelectComponent extends React.Component {
  state = {
    selected: '',
    labelWidth: 0
  }
  componentDidMount() {
    let { values } = this.props;
    this.setState({
      selected: `${(values.length > 0) ? values[0].value : ''}`,
    });
  }

  handleChange = (event) => {
    this.setState({
      selected: event.target.value
    });
  }

  render() {
    const { classes, values, name, label } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel
          htmlFor="select-box"
        >
          {label}
        </InputLabel>
        <Select
          value={this.state.selected}
          onChange={this.handleChange}
          inputProps={{id: 'select-box'}}
        >
          { values.map(item => (
            <MenuItem 
              key={shortid.generate()}
              value={item.value}
            >{item.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

export default withStyles(styles)(OutlinedSelectComponent);