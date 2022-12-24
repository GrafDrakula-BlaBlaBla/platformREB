import React from 'react';
import {SelectFieldControlEditableProps} from './SelectFieldControlEditable';

export const SelectFieldControlView = (
  props: SelectFieldControlEditableProps
) => {
  const {className, value, items} = props;

  const findItem = (value: any) => {
    return items?.find((item) => {
      return String(item.value) === String(value);
    });
  };

  const cls = [
    'select-field-control',
    'field-control',
    'field-control_is-view',
  ];
  if (className) cls.push(className);
  if (!value || !findItem(value)) cls.push('field-control_no-data');

  const label = findItem(value)?.label || 'не известно';

  return value ? (
    <div className={cls.join(' ')}>{label}</div>
  ) : (
    <div className={cls.join(' ')}>не указано</div>
  );
};
