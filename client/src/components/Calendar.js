import React from 'react';
import moment from 'moment';
import shortid from 'shortid';

class Calendar extends React.Component {
  state = {
    currentDate: new moment(),
    currentMonth: new moment(),
    selectedDate: new moment()
  };
  renderHeader() {
    const dateFormat = "MMMM YYYY";
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>
            {this.state.currentMonth.format(dateFormat)}
          </span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
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
        <div className="col col-center" key={shortid.generate()}>
          {startDate.add(1, 'days').format(dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>
  };
  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    console.log('Current month: ', currentMonth.toString());

    const monthStart = currentMonth.clone().startOf('month');
    console.log('Month start: ', monthStart.toString());

    const monthEnd = monthStart.clone().endOf('month');
    console.log('Month end: ', monthEnd.toString());

    // console.log('--> ', monthStart);

    const startDate = monthStart.clone().startOf('month').startOf('week');
    console.log('Date start: ', startDate.toString());

    const endDate = monthEnd.clone().endOf('week');
    console.log('Date end: ', endDate.toString());
    //
    const dateFormat = 'D';
    const rows = [];
    let days = [];
    let day = startDate.clone();
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = day.format(dateFormat);
        const cloneDate = day.clone(); //Must have this line of code
        let styleClassName = day.month() !== currentMonth.month() ? "disabled" : (selectedDate.date() === day.date() ? "selected" : "");
        days.push(
          <div className={`col cell ${styleClassName}`}
            key={shortid.generate()}
            onClick={() => this.onDateClick(cloneDate)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = day.add(1, 'days');
      }
      rows.push (
        <div className="row" key={shortid.generate()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  onDateClick = date => {
    console.log('selected day, ', date);
    this.setState({
      selectedDate: date
    })
  };
  nextMonth = () => {
    this.setState( {
      currentMonth: this.state.currentMonth.add(1, 'months')
    });
  };
  prevMonth = () => {
    this.setState({
      currentMonth: this.state.currentMonth.subtract(1, 'months')
    });
  };

  render() {
    return (
    <div className="calendar">
      {this.renderHeader()}
      {this.renderDays()}
      {this.renderCells()}
    </div>
  );
  }
}

export default Calendar;
