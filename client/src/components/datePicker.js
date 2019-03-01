import React, { PureComponent } from 'react';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
//Localization
import moment from 'moment';
import 'moment/locale/vi';
// import 'moment/locale/es-us';

//Contants
import { 
  DATETIME_FORMAT_1,
  DATETIME_LOCALE_VI
} from '../constants/form';

moment.locale(DATETIME_LOCALE_VI);

export default class App extends PureComponent {
  state = {
    selectedDate: new Date()
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
    alert('time: ', this.state.selectedDate.toString())
  };

  render() {
    const { selectedDate } = this.state;
    const {locale, ...otherProps} = this.props;
    return (
      <MuiPickersUtilsProvider 
        utils={MomentUtils} 
        moment={moment} 
      >
        <DatePicker
          value={selectedDate} 
          onChange={this.handleDateChange} 
          format={DATETIME_FORMAT_1}
          {...otherProps}
          />
      </MuiPickersUtilsProvider>
    );
  }
}