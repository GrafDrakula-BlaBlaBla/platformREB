import React from 'react';
import {DateYearFieldControlEditableProps} from './DateYearFieldControlEditable';

export const DateYearFieldControlView = (
  props: DateYearFieldControlEditableProps
) => {
  const {className, value} = props;

  const cls = [
    'date-year-field-control',
    'date-field-control',
    'field-control',
    'field-control_is-view',
  ];
  if (className) cls.push(className);
  if (!value) cls.push('field-control_no-data');

  return value ? (
    <div className={cls.join(' ')}>{value}</div>
  ) : (
    <div className={cls.join(' ')}>не указано</div>
  );
};
