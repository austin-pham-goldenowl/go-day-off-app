import React from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import shortid from 'shortid';
import { CancelToken } from 'axios';

import './Calendar.css';

// Notification redux
import {
  showNotification,
} from '../../redux/actions/notificationActions';
import { compareDatesWithoutTime } from '../../utilities';

const mapDispatchToProps = (dispatch) => {
  return {
    handleShowNotif: (type, message) => dispatch(showNotification(type, message))
  }
}

class CalendarMeeting extends React.Component {
  state = {
    currentDate: new moment(),
    currentMonth: new moment(),
    selectedDate: '',
  };

  componentDidMount = () => {
    this.__isMounted__ = true;
    this.cancelSource = CancelToken.source()
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
        
        // styleClassName += !isDisabledDay ? ' bookingday' : '';
        days.push(
          <div className={`col cell ${styleClassName}`}
            key={shortid.generate()}
            onClick={() => this.onDateClick(cloneDate)}
          >
            <span className='number'>{formattedDate}</span>
            <span className='bg'>{formattedDate}</span>
            { 
              !isDisabledDay && <button className='btn btn-create' onClick={() => this.onButtonCreateClick()}>Booking now</button>  
            }
            {
              !isDisabledDay && <button className='btn btn-detail' onClick={() => this.onButtonCreateClick()}>Detail</button>
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

  onButtonCreateClick = () => {
    const { history } = this.props;
    history.push(`booking-meeting-request/create`);
  }

  nextMonth = () => {
    this.__isMounted__ && this.setState( {
      currentMonth: this.state.currentMonth.add(1, 'months'),
      selectedDate: '',
    });

  };
  prevMonth = () => {
    this.__isMounted__ && this.setState({
      currentMonth: this.state.currentMonth.subtract(1, 'months'),
      selectedDate: '',
    });
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

export default withRouter(connect(null, mapDispatchToProps)(CalendarMeeting));
