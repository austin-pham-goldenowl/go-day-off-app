import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


// components
import FilterSelect from './FilterSelect';
import FilterDatePicker from '../DatePickers/FilterDatePicker';


/**
 * child component(s): 2 select-boxs for `byWhen` and `byStatus`
 * `select-box` onChange: re-call api with query params
 * 
 */

class LetterManagementToolbar extends React.Component {

  state = {
    fromDate: null,
    toDate: null,
  }

  handleChangeDate = (which, value) => {
    if (which === 'from') 
      this.setState({ fromDate: value });
    else if (which === 'to') 
      this.setState({ toDate: value });
  }

  handleFilterChange = (filterKey, ...others) => {
    console.log(`handleFilterChange triggered!`);
  }

  handleExport = () => {
    console.log(`handleExport triggered`);
  }

  render() {
    const { classes } = this.props;
		console.log(`TCL: LetterManagementToolbar -> render -> this.props`, this.props)
    return (
      <Grid container spacing={8} className={classes.toolbar}>
        {/* Select filter From-date */}
          <FilterDatePicker
            label='From'
            variant='standard'
            views={['year', 'month']}
            value={this.state.fromDate}
            onChange={(value) => this.handleChangeDate('from', value)}
          />
        {/* Select filter To-date */}
          <FilterDatePicker
            label='To'
            variant='standard'
            views={['year', 'month']}
            value={this.state.toDate}
            onChange={(value) => this.handleChangeDate('to', value)}
          />
        {/* Select filter by Status */ }
          <FilterSelect 
            value=''
            label='Status'
            variant='standard'
            name='filterStatus'
            options={[]}
            onChange={(e) => {
              this.handleFilterChange()
              console.log(`TCL: LetterManagementToolbar -> render -> filterStatus -> e`, e);
            }}
          />
        {/* Button export */}
        <Grid item sm={12}>
          <Button 
            size='small'
            title='Export data'
            variant='contained'
            onClick={this.handleExport}
          >
            <Icon>save</Icon>
          </Button> 
        </Grid>
      </Grid>
    )
  }
}

LetterManagementToolbar.propTypes = {
  classes: PropTypes.object.isRequired
}

//styles
const styles = theme => ({
  toolbar: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

});

export default withStyles(styles)(LetterManagementToolbar);