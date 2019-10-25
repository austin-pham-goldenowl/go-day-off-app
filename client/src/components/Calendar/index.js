import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import shortid from 'shortid';
import { CancelToken } from 'axios';

import './Calendar.css';

// constants
import { getCalendarApprovedDayOff } from '../../apiCalls/leaveLetterAPI';
import { LEAVE_REQUEST_APPROVED } from '../../constants/requestStatusType';

// Notification redux
import {
  showNotification,
} from '../../redux/actions/notificationActions';
import { NOTIF_ERROR, NOTIF_SUCCESS, NOTIF_WARNING } from '../../constants/notification';
import { compareDatesWithoutTime } from '../../utilities';

const mapDispatchToProps = (dispatch) => {
  return {
    handleShowNotif: (type, message) => dispatch(showNotification(type, message))
  }
}

const calculateEndDayOfLetterInMonth = (currentMonth, toDT) => {
  let toDateMoment = moment(toDT);
  if (toDateMoment.get('month') > currentMonth.get('month')) 
    return currentMonth.daysInMonth()
  return toDateMoment.get('date'); 
}

const calculateStartDayOfLetterInMonth = (currentMonth, fromDT) => {
  let fromDateMoment = moment(fromDT);
  if (fromDateMoment.get('month') < currentMonth.get('month')) 
    return 1;
  return fromDateMoment.get('date'); 
}

class Calendar extends React.Component {
  state = {
    currentDate: new moment(),
    currentMonth: new moment(),
    selectedDate: '',
    dayoffs: {}, //dictionary
  };

  loadLetters = () => {
    const { currentMonth } = this.state;
    
    const filterData = {
      month: this.state.currentMonth.month()+1,
      year: this.state.currentMonth.year(), 
      status: LEAVE_REQUEST_APPROVED
    }
    getCalendarApprovedDayOff(this.cancelSource.token, filterData)
      .then(response => {
        const { data: { success, leaveLetters } } = response;
        if (success) {
          let dayoffs = {};
          for (let x = 0; x < leaveLetters.length; x++) {
            const firstDay = calculateStartDayOfLetterInMonth(currentMonth, leaveLetters[x].fFromDT);
            const lastDay = calculateEndDayOfLetterInMonth(currentMonth, leaveLetters[x].fToDT);
            for (let i = firstDay; i <= lastDay; i++) {
              dayoffs[i] = leaveLetters[x].fId;
            }
          }
          this.__isMounted__ && this.setState (
            { dayoffs }, 
            () => this.props.handleShowNotif && this.props.handleShowNotif(NOTIF_SUCCESS, 'Load calendar success!')
          );
        } else {
          this.props.handleShowNotif && this.props.handleShowNotif(NOTIF_WARNING, 'Something went wrong! Refresh the page!')
        }
      })
      .catch(err => {
        this.props.handleShowNotif && this.props.handleShowNotif(NOTIF_ERROR, `${err.message}`);
      })
  }

  componentDidMount = () => {
    this.__isMounted__ = true;
    this.cancelSource = CancelToken.source()
    this.loadLetters();
  }
  
  componentWillUnmount = () => {
    this.__isMounted__ = false;
    this.cancelSource.cancel();
  }

  renderHeader() {
    const dateFormat = 'MMMM YYYY';
    return (
      <div className='header row flex-middle'>
        <div className='col col-start'>
          <div className='icon' onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className='col col-center'>
          <span>
            {this.state.currentMonth.format(dateFormat)}
          </span>
        </div>
        <div className='col col-end' onClick={this.nextMonth}>
          <div className='icon'>chevron_right</div>
        </div>
      </div>
    );
  };
  renderDays() {
    const dateFormat = 'dddd';
    const days = [];
    let startDate = this.state.currentMonth.startOf('week').clone();

    startDate.subtract(1, 'days');
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className='col col-center' key={shortid.generate()}>
          {startDate.add(1, 'days').format(dateFormat)}
        </div>
      );
    }

    return <div className='days row'>{days}</div>
  };

  renderCells() {
    const { currentDate, currentMonth, selectedDate } = this.state;

    const monthStart = currentMonth.clone().startOf('month');

    const monthEnd = monthStart.clone().endOf('month');

    const startDate = monthStart.clone().startOf('month').startOf('week');

    const endDate = monthEnd.clone().endOf('week');
    //
    const dateFormat = 'D';
    const rows = [];
    let days = [];
    let day = startDate.clone();
    let formattedDate = '';

    //Parse Leave letter info to display on the calendar
    /**
     * + show difference color for accepted off-days in current selected month 
     * + on Hover: Show actions: 
     * + + show button detail for day-off
     * + + show button create-leave-letter
     */

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = day.format(dateFormat);
        const cloneDate = day.clone(); //Must have this line of code
        const isDisabledDay = day.month() !== currentMonth.month();
        const dayoffId = this.state.dayoffs[cloneDate.get('date')];
        let styleClassName = isDisabledDay
          ? 'disabled' 
          : (
            selectedDate !== '' && selectedDate.date() === day.date() 
            ? 'selected' 
            : ( 
              compareDatesWithoutTime(day, currentDate) === 0
              ? 'currentDate' 
              : 'normal'
            )
          );
        
        styleClassName += !isDisabledDay && dayoffId !== undefined ? ' offday' : '';
        days.push(
          <div className={`col cell ${styleClassName}`}
            key={shortid.generate()}
            onClick={() => this.onDateClick(cloneDate)}
          >
            <span className='number'>{formattedDate}</span>
            <span className='bg'>{formattedDate}</span>
            { !isDisabledDay
              ? (dayoffId !== undefined ? 
                 <button 
                    className='btn btn-detail' 
                    onClick={() => this.onButtonDetailClick(dayoffId)}
                  >
                    Show details
                  </button> 
                :
                  <button 
                    className='btn btn-create' 
                    onClick={() => this.onButtonCreateClick()}
                  >
                    Create new request
                  </button> 
              )
              : null
            }
          </div>
        );
        day = day.add(1, 'days');
      }
      rows.push (
        <div className='row' key={shortid.generate()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className='body'>{rows}</div>;
  };

  onDateClick = date => {
    this.__isMounted__ && this.setState({
      selectedDate: date
    })
    //if day is an approved-dayoff -> show button
  };

  onButtonDetailClick = dayoffId => {
    const { history } = this.props;
    history.push(`/leave-request/${dayoffId}`);
  }

  onButtonCreateClick = () => {
    const { history } = this.props;
    history.push(`leave-request/create`);
  }

  nextMonth = () => {
    this.__isMounted__ && this.setState( {
      currentMonth: this.state.currentMonth.add(1, 'months'),
      selectedDate: '',
      dayoffs: {},
    }, () => this.loadLetters());

  };
  prevMonth = () => {
    this.__isMounted__ && this.setState({
      currentMonth: this.state.currentMonth.subtract(1, 'months'),
      selectedDate: '',
      dayoffs: {},
    }, () => this.loadLetters());
  };

  render() {
    return (
    <div className='calendar'>
      {this.renderHeader()}
      {this.renderDays()}
      {this.renderCells()}
    </div>
  );
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Calendar));


    /**
     * @todo `query database`
     * 1. Query all letter of parsed `userId` has fFromDT || fToDT in current month with specified status value
     * 2. 
     * 2.1 Remember to compare the year
     * 2.2 For case `fFromDT`:
     * if `fToDT`.month is not same to the queried month
     *  + set `fToDT`.month to queried month
     *  + set `fToDT`.date to the last Date of queried month
     * 2.3 For case `fToDT` :
     *  if (`fFromDT`.month is not same to the queried month)
     *  + set `fFromDT`.date to the first Date of queried month
     *  + set `fToDT`.month to queried month
     */
