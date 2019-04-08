import moment from 'moment-timezone';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import MUIDataTable from 'mui-datatables';
import ExcelExporter from './ExcelExporter';
import { Typography, Button, withStyles } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";


import { CancelToken } from 'axios';
/**
 * Constants
 */
import { letterColors, letterStatusText, dayOfWeek, defaultColumns, HRColumns, defaultExportColumns, HRExportColumns } from "../constants/letter";
import { REJECT_TYPE } from '../constants/rejectType'; 

// Components
import LetterManagementToolbar from './LetterManagementToolbar';

/**
 * Helpers 
 */
import { formatRow } from "../helpers/excelFormatter";
import { getLetterByFilterAll } from '../apiCalls/leaveLetterAPI';
import { getUserId } from '../helpers/authHelpers';


// Notification redux
import {
  showNotification,
} from '../redux/actions/notificationActions';
import { NOTIF_ERROR, NOTIF_SUCCESS } from '../constants/notification';

const mapDispatchToProps = dispatch => {
  return {
    handleShowNotif: (type, message) => dispatch(showNotification(type, message)),
  };
};

//overrides `material-ui-pickers` theme
const materialTheme = createMuiTheme({
  overrides: {
    MUIDataTableToolbar: {
      left: {
        flex: '1',
      },
      actions: {
        flex: '2',
      }
    },
    MuiFormControl: {
      root: {
        width: '135px',
        margin: '0 5px 0 0 !important',
      }
    }
  }
})

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
  
  componentDidMount = () => {
    this.__isMounted = true;
    this.cancelSource = CancelToken.source();
    this.loadData();
  };

  componentWillUnmount = () => {
    this.__isMounted = false;
    this.cancelSource.cancel('Request cancelled by user!');
  }

  loadData = async () => {
    const { demandUserId } = this.props;
    try {
      const {
        data: { success, leaveLetters: letters, count }
      } = await this.props.api(this.cancelSource.token, 1, 10, demandUserId);

      if (success) 
        this.__isMounted 
        && this.setState({ letters, count }, () => {
          this.props.handleShowNotif(NOTIF_SUCCESS, `Load data complete!`)
        });
    } catch (err) {
      this.props.handleShowNotif(NOTIF_ERROR, `Load data failed! (${err.message})`)
    }
  }

  handleFilterValueChange = async (values) => {
    let userId = getUserId();
    const { demandUserId } = this.props;
    if (typeof(demandUserId) !== 'undefined') {
      userId = demandUserId
    }
    const fromDate = new Date(values.fromDate),
          toDate   = new Date(values.toDate);
    try {
      const fromMonth = fromDate.getMonth() + 1,
            toMonth   = toDate.getMonth() + 1,
            fromYear  = fromDate.getFullYear(),
            toYear    = toDate.getFullYear();
      const { data: { success, leaveLetters, count }} = await getLetterByFilterAll(
        this.cancelSource.token,
        userId, 
        fromMonth,
        fromYear, 
        toMonth, 
        toYear, 
        values.status
      );
      if (success) {
        //set state
        this.__isMounted && this.setState({
          letters: leaveLetters,
          count
        }, () => this.props.handleShowNotif(NOTIF_SUCCESS, `Load data completed!`));
      }
    }
    catch (err) {
      this.props.handleShowNotif(NOTIF_ERROR, `Load data failed! (${err.message})`)
    }
  }

  handleExport = async () => {
    try {
      const { data: { success, leaveLetters: exports }
      } = await this.props.api(this.cancelSource.token, 0); // get all
      if (success) 
        this.__isMounted && this.setState({ exports }, () => {
          this.downloadTriggerRef.current.click();
          this.__isMounted && this.setState({ exports: [] }); // release memory
        });
    }
    catch(err) {
      this.props.handleShowNotif(NOTIF_ERROR, `Data export failed! (${err.message})`)
    }
  };

  changePage = (size = 10, page = 1, demandUserId) => {
    this.props.api(this.cancelSource.token, page, size, demandUserId)
    .then(({ data: { success, leaveLetters: letters, count } }) => 
      this.__isMounted && success && this.setState({ letters, count, page, size }))
    .catch(error => console.log(error));
  };

  render() {
    const { letters, exports } = this.state;
    const { classes, title, type, demandUserId } = this.props;
		// console.log(`TCL: render -> letters`, letters)
  
    const tableInfo = {
      columns: type === 'hr' ? HRColumns : defaultColumns,
      title: <Typography component='p' variant='h5' className={classes.title}> {title} </Typography>,
      data: Array.isArray(letters)
        ? letters.map(({ fUserFullName, fFromDT, fToDT, fStatus, fId, fRdt, fRejectType }) => {
          const dataSet = [
            getDate(fRdt),
            getDate(fFromDT),
            getDate(fToDT),
            <span style={{ color: letterColors[fStatus] }} >
                  { fRejectType && fRejectType === REJECT_TYPE.BY_SELF? `CANCELED` : letterStatusText[fStatus]  }
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
        customToolbar: () => {
          return (
            <LetterManagementToolbar 
              onExport={this.handleExport}
              onFilterValueChange={this.handleFilterValueChange}
            />
          )
        },
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
            fSubstituteFullName, fFromDT, fToDT, fFromOpt, fToOpt, fStatus, fRdt, fRejectType }) => {
							console.log(`TCL: fRejectType`, fRejectType)
							console.log(`TCL: letterStatusText[fStatus]`, letterStatusText[fStatus])
            const row = [
              { value: getDate(fRdt) },
              { value: `${getDate(fFromDT)} (${fFromOpt})` },
              { value: `${getDate(fToDT)} (${fToOpt})` },
              { value: fApproverFullName },
              { value: fSubstituteFullName },
              { value: fRejectType && fRejectType === REJECT_TYPE.BY_SELF? `CANCELED` : letterStatusText[fStatus] },
            ];
            if(type === 'hr') row.unshift({ value: fUserFullName });
            return formatRow(row);
          })
        }],
      }
    ];

    return (
      <Fragment>
        <MuiThemeProvider theme={materialTheme}>
          <MUIDataTable
            data={tableInfo.data}
            title={tableInfo.title}
            className={classes.paper}
            columns={tableInfo.columns}
            options={tableInfo.options}
          />
        </MuiThemeProvider>
        <ExcelExporter sheets={sheets} downloadTriggerRef={this.downloadTriggerRef}/>
      </Fragment>
    );
  }
}

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

export default connect(null, mapDispatchToProps)(
  withStyles(styles)(LetterManagement)
);
