import moment from 'moment-timezone';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import ExcelExporter from './ExcelExporter';
import { Typography, Button, withStyles, Icon } from '@material-ui/core';

import { CancelToken } from 'axios';
/**
 * Constants
 */
import { letterColors, letterStatusText, dayOfWeek, defaultColumns, HRColumns, defaultExportColumns, HRExportColumns } from "../constants/letter";

/**
 * Helpers 
 */
import { formatRow } from "../helpers/excelFormatter";

const styles = theme => ({
  btnLink: {
    textDecoration: 'none',
  },
  paper: {
    padding: theme.spacing.unit * 5
  },
  title: {
    textAlign: 'left',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
});

const getDate = (rawDate = '') => {
  const date = moment(rawDate).isValid() && moment.tz(rawDate, 'Asia/Bangkok');
  return !date ?
    'Invalid date' :
    dayOfWeek[date.day()] + ', ' + date.format('DD/MM/YYYY');
};

class LetterManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      size: 10,
      count: 0,
      letters: [],
      exports: [],
    };
    this.downloadTriggerRef = React.createRef();
  }

  loadData = async () => {
    const { demandUserId } = this.props;
    try {
      const {
        data: { success, leaveLetters: letters, count }
      } = await this.props.api(this.cancelSource.token, 1, 10, demandUserId);

      if (success) this.setState({ letters, count });
    } catch (err) {
	  	console.log(`TCL: LetterManagement -> loadData -> err`, err)
    }
  }

  componentDidMount = () => {
    this.cancelSource = CancelToken.source();
    this.loadData();
  };

  componentWillUnmount = () => {
    this.cancelSource.cancel('Request cancelled by user!');
  }

  handleExport = async () => {
    try {
      const { data: { success, leaveLetters: exports }
      } = await this.props.api(this.cancelSource.token, 0); // get all
      if (success) this.setState({ exports }, () => {
          this.downloadTriggerRef.current.click();
          this.setState({ exports: [] }); // release memory
        });
    }
    catch(err) {
			console.log(`TCL: LetterManagement -> handleExport -> err`, err)
    }
  };

  changePage = (size = 10, page = 1, demandUserId) => {
    this.props.api(this.cancelSource.token, page, size, demandUserId)
    .then(({ data: { success, leaveLetters: letters, count } }) => 
      success && this.setState({ letters, count, page, size }))
    .catch(error => console.log(error));
  };

  render() {
    const { letters, exports } = this.state;
    const { classes, title, type, demandUserId } = this.props;
  
    const tableInfo = {
      columns: type === 'hr' ? HRColumns : defaultColumns,
      title: <Typography component='p' variant='h5' className={classes.title}> {title} </Typography>,
      data: Array.isArray(letters)
        ? letters.map(({ fUserFullName, fFromDT, fToDT, fStatus, fId, fRdt }) => {
          const dataSet = [
            getDate(fRdt),
            getDate(fFromDT),
            getDate(fToDT),
            <span style={{ color: letterColors[fStatus] }} >
                  { letterStatusText[fStatus] }
                </span>,
            <Link
              to={`/leave-request/${fId}`}
              className={classes.btnLink}
            >
              <Button variant='contained' color='primary'>
                Details
              </Button>
            </Link>
          ];
          if (type === 'hr') dataSet.unshift(fUserFullName || 'Unknown');
          return dataSet;
        }) : [],
      options: {
        print: false,
        filter: false,
        search: false,
        download: false,
        serverSide: true,
        viewColumns: false,
        responsive: 'scroll',
        selectableRows: false,
        count: this.state.count,
        rowsPerPage: this.state.size,
        rowsPerPageOptions: [5, 10, 15, 20],
        onChangeRowsPerPage: size => this.changePage(size, 1, demandUserId),
        onTableChange: (action, tableState) => action === 'changePage' && this.changePage(tableState.rowsPerPage, tableState.page + 1, demandUserId),
        customToolbar: () => <Button variant='contained' size='small' title='Export data' onClick={this.handleExport}><Icon>save</Icon></Button>,
      }
    };

    const sheets =  [
      {
        dataSet: [{
          columns:
            type === 'hr'
              ? HRExportColumns
              : defaultExportColumns,
          data: exports.map(({ fUserFullName, fApproverFullName,
            fSubstituteFullName, fFromDT, fToDT, fFromOpt, fToOpt, fStatus, fRdt }) => {
            const row = [
              { value: getDate(fRdt) },
              { value: `${getDate(fFromDT)} (${fFromOpt})` },
              { value: `${getDate(fToDT)} (${fToOpt})` },
              { value: fApproverFullName },
              { value: fSubstituteFullName },
              { value: letterStatusText[fStatus] },
            ];
            if(type === 'hr') row.unshift({ value: fUserFullName });
            return formatRow(row);
          })
        }],
      }
    ];

    return (
      <>
        <MUIDataTable
          data={tableInfo.data}
          title={tableInfo.title}
          className={classes.paper}
          columns={tableInfo.columns}
          options={tableInfo.options}
        />
        <ExcelExporter sheets={sheets} downloadTriggerRef={this.downloadTriggerRef}/>
      </>
    );
  }
}

export default withStyles(styles)(LetterManagement);
