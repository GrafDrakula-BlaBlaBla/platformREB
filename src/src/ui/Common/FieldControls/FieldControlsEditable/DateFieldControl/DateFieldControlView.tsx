import React from 'react';
import moment from 'moment';
import {isValid} from 'date-fns';
import {DateFieldControlEditableProps} from './DateFieldControlEditable';

export const DateFieldControlView = (props: DateFieldControlEditableProps) => {
  const {className, value} = props;

  const cls = ['date-field-control', 'field-control', 'field-control_is-view'];
  if (className) cls.push(className);

  const formatValue = value
    ? typeof value === 'string' || isValid(value)
      ? moment(value, ['DD.MM.YYYY', moment.ISO_8601]).format('DD.MM.YYYY')
      : 'Invalid Date'
    : '';
  const displayValue =
    formatValue !== 'Invalid Date' ? formatValue : 'Не верный формат даты';

  if (!value || formatValue === 'Invalid Date')
    cls.push('field-control_no-data');

  return value ? (
    <div className={cls.join(' ')}>{displayValue}</div>
  ) : (
    <div className={cls.join(' ')}>не указано</div>
  );
};
