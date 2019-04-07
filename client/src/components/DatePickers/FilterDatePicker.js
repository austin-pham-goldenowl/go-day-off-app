import React from 'react';
import MomentUtils from '@date-io/moment';
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';

import moment from 'moment';
import 'moment/locale/vi';

import { DATETIME_LOCALE_EN } from '../../constants/form';

moment.locale(DATETIME_LOCALE_EN);


const FilterDatePicker = ({
  label,
  value,
  keyboard,
  minDate,
  classes,
  onChange,
  ...props
}) => {
  console.log(`TCL: props`, props)
  return (
    <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
        <DatePicker 
          label={label}
          name='When'
          value={value}
          format='MMM YYYY'
          onChange={onChange}
          {...props}
        />
    </MuiPickersUtilsProvider>
  );
}

export default FilterDatePicker;