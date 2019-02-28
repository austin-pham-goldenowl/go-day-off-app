import React, { PureComponent } from 'react';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { DatePicker } from 'material-ui-pickers';
import { IconButton } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
//Localization
import moment from 'moment';
import 'moment/locale/vi';
import 'moment/locale/es-us';

moment.locale('vi');

const localeMap = {
  en: 'en',
  fr: 'fr',
  ru: 'ru',
}

export default class App extends PureComponent {
  state = {
    selectedDate: new Date(),
    anchorEl: null,
    currentLocale: 'vi',
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
    alert('time: ', this.state.selectedDate.toString())
  };

  handleMenuOpen = event => {
    event.stopPropagation();
    console.log(`handleMenuOpen -> currentTarget: `, event.currentTarget);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  selectLocale = selectedLocale => {
    moment.locale(selectedLocale);
    this.setState({
      currentLocale: selectedLocale
    });
  };

  render() {
    const { selectedDate } = this.state;
    const locale = localeMap[this.state.currentLocale];

    return (
      <MuiPickersUtilsProvider 
        utils={MomentUtils} 
        moment={moment} 
        locale={locale}
      >
        <DatePicker
          value={selectedDate} 
          onChange={this.handleDateChange} 
          format="dddd DD/MM/YYYY"
          InputProps={{
            endAdornment: (
              <IconButton 
                aria-label="Select locale"
                onClick={this.handleMenuOpen}
                aria-owns={this.state.anchorEl ? 'locale-menu' : null}
              >
                <Icon>more_vert</Icon>
              </IconButton>
            )
          }}
          />
      </MuiPickersUtilsProvider>
    );
  }
}