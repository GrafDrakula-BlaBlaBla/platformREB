import React, {useEffect, useState} from 'react';
import {TModify} from '../../../../../Utils/TS/TModify';
import {parse, format} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import DateFnsUtils from '@date-io/date-fns';
import {ParsableDate} from '@material-ui/pickers/constants/prop-types';
import {ReactComponent as CalendarIcon} from '../../../../../assets/svg/commonArea/CalendarIcon.svg';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardDatePickerProps,
} from '@material-ui/pickers';

class RuLocalizedUtils extends DateFnsUtils {
  getCalendarHeaderText(date: Date) {
    return format(date, 'LLLL yyyy', {locale: this.locale});
  }
  getDatePickerHeaderText(date: Date) {
    return format(date, 'EEEEEE, dd MMMM', {locale: this.locale});
  }
}

export interface DateFieldControlProps
  extends TModify<
    KeyboardDatePickerProps,
    {
      name?: string;
      value?: ParsableDate;
      onChange?: (date: Date | null, name?: string | null) => void;
    }
  > {
  shouldValidate?: boolean;
}

export const DateFieldControl = (props: DateFieldControlProps) => {
  const {
    autoOk,
    variant,
    inputVariant,
    format,
    InputAdornmentProps,
    value,
    onChange,
    orientation,
    PopoverProps,
    className,
    minDateMessage,
    maxDateMessage,
    invalidDateMessage,
    keyboardIcon,
    shouldValidate = false,
    ...other
  } = props;

  const cls = ['date-field-control', 'field-control', 'field-control_is-edit'];
  if (className) cls.push(className);

  const [state, setState] = useState<ParsableDate>();
  if (!state) cls.push('field-control_no-data');

  useEffect(() => {
    const dateValue = value
      ? typeof value === 'string'
        ? parse(value, 'dd.MM.yyyy', new Date())
        : value
      : null;
    setState(dateValue);
  }, [value]);

  return (
    <MuiPickersUtilsProvider utils={RuLocalizedUtils} locale={ruLocale}>
      <KeyboardDatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        format={format || 'dd.MM.yyyy'}
        InputAdornmentProps={{position: 'end'}}
        value={state}
        onChange={(value) => {
          setState(value);
          if (onChange) {
            onChange(value, props.name);
          }
        }}
        orientation="landscape"
        PopoverProps={{
          anchorOrigin: {vertical: 'bottom', horizontal: 0},
          transformOrigin: {vertical: -8, horizontal: 0},
          className: 'date-field-control__popover',
        }}
        className={cls.join(' ')}
        minDateMessage={
          shouldValidate
            ? minDateMessage || 'Дата не может быть меньше 01.01.1900'
            : null
        }
        maxDateMessage={
          shouldValidate
            ? maxDateMessage || 'Дата не может быть больше 01.01.2100'
            : null
        }
        invalidDateMessage={
          shouldValidate ? invalidDateMessage || 'Не верный формат даты' : null
        }
        keyboardIcon={<CalendarIcon />}
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};
