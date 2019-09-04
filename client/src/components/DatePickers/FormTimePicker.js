import React from 'react';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { TimePicker } from 'material-ui-pickers';

//Localization
import moment from 'moment';
import 'moment/locale/vi';

//Contants
import { DATETIME_LOCALE_EN } from '../../constants/form';

moment.locale(DATETIME_LOCALE_EN);

class TimePickerField extends React.Component {
  render() {
    const {
      field,
      form,
      label,
      keyboard,
      enablePast,
      ...otherProps
    } = this.props;
    return (
      <MuiPickersUtilsProvider utils={MomentUtils} moment={moment}>
        <TimePicker
          keyboard={keyboard && keyboard}
          disablePast={!enablePast}
          label={label}
          name={field.name}
          value={field.value}
          onChange={date => form.setFieldValue(field.name, date, true)}
          onError={(_, error) => form.setFieldError(field.name, error)}
        />
      </MuiPickersUtilsProvider>
    );
  }
}
export default TimePickerField;
