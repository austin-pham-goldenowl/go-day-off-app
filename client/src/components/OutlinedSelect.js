import React from 'react';
import ReactDOM from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  OutlinedInput, 
  MenuItem 
} from '@material-ui/core';

import shortid from 'shortid';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
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
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      selected: `${(values.length > 0) ? values[0].value : ''}`,
    });
  }

  handleChange = (event) => {
    this.setState({
      selected: event.target.value
    });
  }

  render() {
    const { classes } = this.props;
    const { values } = this.props;
    const { name } = this.props;
    return (
      <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel
        ref={ref => {
          this.InputLabelRef = ref;
        }}
        htmlFor="outlined-select-box"
      >
        Leave Type
      </InputLabel>
      <Select
        value={this.state.selected}
        onChange={this.handleChange}
        input={
          <OutlinedInput
            labelWidth={this.state.labelWidth}
            name={name}
            id="outlined-select-box"
          />
        }
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