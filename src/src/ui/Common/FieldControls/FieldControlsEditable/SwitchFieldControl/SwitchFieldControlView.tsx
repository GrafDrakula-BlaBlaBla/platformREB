import React from 'react';
import {SwitchFieldControlEditableProps} from './SwitchFieldControlEditable';

const getDisplayValue = (value: boolean) => {
  return value ? 'Да' : 'Нет';
};

export const SwitchFieldControlView = (
  props: SwitchFieldControlEditableProps
) => {
  const {className, value} = props;

  const cls = [
    'switch-field-control',
    'field-control',
    'field-control_is-view',
  ];
  if (className) cls.push(className);
  if (typeof value === 'undefined') cls.push('field-control_no-data');

  return typeof value === 'boolean' ? (
    <div className={cls.join(' ')}>{getDisplayValue(value)}</div>
  ) : (
    <div className={cls.join(' ')}>не указано</div>
  );
};
