import React from 'react';
import {format, isValid} from 'date-fns';
import {IDateIntervalValue} from '../../FieldControlsBase';
import {DateIntervalFieldControlEditableProps} from './DateIntervalFieldControlEditable';

export const getDateIntervalDisplayValue = (value: IDateIntervalValue) => {
  const formatStart = value.start
    ? isValid(value.start)
      ? format(value.start, 'dd.MM.yyyy')
      : 'не верный формат даты'
    : 'с';
  const formatEnd = value.end
    ? isValid(value.end)
      ? format(value.end, 'dd.MM.yyyy')
      : 'не верный формат даты'
    : 'по';
  return `${formatStart} - ${formatEnd}`;
};

export const DateIntervalFieldControlView = (
  props: DateIntervalFieldControlEditableProps
) => {
  const {className, value} = props;

  const cls = [
    'date-interval-field-control',
    'field-control',
    'field-control_is-view',
  ];
  if (className) cls.push(className);
  if (!value || (!value.start && !value.end)) cls.push('field-control_no-data');

  return value ? (
    <div className={cls.join(' ')}>{getDateIntervalDisplayValue(value)}</div>
  ) : (
    <div className={cls.join(' ')}>не указано</div>
  );
};
