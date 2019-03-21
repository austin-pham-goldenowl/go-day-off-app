import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, withStyles } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import moment from 'moment';

/**
 * Constants
 */
import * as requestStatusType  from '../constants/requestStatusType';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 5,
  },
  title: {
    textAlign: 'left',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
  btnLink: {
    textDecoration: 'none',
  }
});

/**
 * Local helpers
 */
const letterColors = {
  [requestStatusType.LEAVE_REQUEST_PENDING]: '#ffe43a',
  [requestStatusType.LEAVE_REQUEST_APPROVED]: '#0eba25',
  [requestStatusType.LEAVE_REQUEST_REJECTED]: '#2A2A2E',
};

const letterStatusText = {
  [requestStatusType.LEAVE_REQUEST_PENDING]: 'PENDING',
  [requestStatusType.LEAVE_REQUEST_APPROVED]: 'APPROVED',
  [requestStatusType.LEAVE_REQUEST_REJECTED]: 'REJECTED',
};

const dayOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const getDate = (rawDate = "") => {
  const date = moment(rawDate);
  return !date.isValid() ?
    'Invalid date' :
    dayOfWeek[date.day()] + ', ' +
    date.locale('vi').format('DD/MM/YYYY');
};

class LetterManagement extends Component {
  state = {
    page: 1,
    count: 0,
    size: 10,
    letters: [],
  };

  componentDidMount = async () => {
    try {
      const { data: { success, leaveLetters: letters, count }
      } = await this.props.api();
      if (success) this.setState({ letters, count });
    } catch (err) {
      console.log(err);
    }
  };

  changePage = (page, size) => {
    this.props.api(page, size)
    .then(({ data: { success, leaveLetters: letters, count } }) => 
      success && this.setState({ letters, count, page, size }))
    .catch(error => console.log(error));
  }

  render() {
    const { letters } = this.state;
    const { classes, title, type } = this.props;

    const tableInfo = {
      title: (
        <Typography component='p' variant='h5' className={classes.title}>
          {title}
        </Typography>
      ),
      data: Array.isArray(letters)
        ? letters.map(({ fUserFullName, fFromDT, fToDT, fStatus, fId, fRdt }) => {
            if (type === 'hr')
              return [
                getDate(fRdt),
                fUserFullName || 'Unknown',
                getDate(fFromDT),
                getDate(fToDT),
                <span style={{ color: letterColors[fStatus] }} >
                  { letterStatusText[fStatus] }
                </span>,
                <Link
                  to={`/leave-request/details?id=${fId}`}
                  className={classes.btnLink}
                >
                  <Button variant='contained' color='primary'>
                    Details
                  </Button>
                </Link>
              ];
            else
              return [
                getDate(fRdt),
                getDate(fFromDT),
                getDate(fToDT),
                <span
                  style={{ color: letterColors[fStatus] }}
                >
                  { letterStatusText[fStatus] }
                </span>,
                <Link
                  to={`/leave-request/details?id=${fId}`}
                  className={classes.btnLink}
                >
                  <Button variant='contained' color='primary'>
                    Details
                  </Button>
                </Link>
              ];
          })
        : [],
      columns:
        type !== "hr"
        ? ['When', 'From', 'To', 'Status', 'Actions']
        : ['When', 'Name', 'From', 'To', 'Status', 'Actions'],
      options: {
        filter: true,
        download: true,
        serverSide: true,
        viewColumns: false,
        responsive: 'scroll',
        selectableRows: false,
        count: this.state.count,
        rowsPerPage: this.state.size,
        rowsPerPageOptions: [5, 10, 15, 20],
        onChangeRowsPerPage: size => this.changePage(1, size),
        onTableChange: (action, tableState) => action === 'changePage' && this.changePage(tableState.page + 1, tableState.rowsPerPage),
      }
    };

    return (
      <MUIDataTable
        data={tableInfo.data}
        title={tableInfo.title}
        className={classes.paper}
        columns={tableInfo.columns}
        options={tableInfo.options}
      />
    );
  }
}

export default withStyles(styles)(LetterManagement);
