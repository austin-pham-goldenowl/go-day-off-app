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
    padding: theme.spacing.unit * 5
  },
  title: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    textAlign: 'left'
  },
  btnLink: {
    textDecoration: 'none'
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
    letters: [],
  };

  componentDidMount = async () => {
    try {
      const {
        status,
        data: { success, leaveLetters: letters }
      } = await this.props.api();
      if (status !== 200 || !success) return;
      this.setState({ letters });
    } catch (err) {
      console.log(err);
    }
  };

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
        ? letters.map(letter => {
            const { fUserFullName, fFromDT, fToDT, fStatus, fId, fRdt } = letter;
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
        type === "hr"
          ? ['When', 'Name', 'From', 'To', 'Status', 'Actions']
          : ['When', 'From', 'To', 'Status', 'Actions'],
      options: {
        selectableRows: false,
        responsive: 'scroll',
        print: true,
        download: true,
        viewColumns: false,
        filter: true,
        rowsPerPage: 10,
        rowsPerPageOptions: [5, 10, 15, 20]
      }
    };

    return (
      <MUIDataTable
        className={classes.paper}
        title={tableInfo.title}
        data={tableInfo.data}
        columns={tableInfo.columns}
        options={tableInfo.options}
      />
    );
  }
}

export default withStyles(styles)(LetterManagement);
