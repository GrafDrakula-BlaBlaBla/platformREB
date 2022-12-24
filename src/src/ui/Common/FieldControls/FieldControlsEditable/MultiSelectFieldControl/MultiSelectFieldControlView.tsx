import React from 'react';
import {MultiSelectFieldControlEditableProps} from './MultiSelectFieldControlEditable';

export const MultiSelectFieldControlView = (
  props: MultiSelectFieldControlEditableProps
) => {
  const {className, value, items} = props;

  const cls = [
    'multi-select-field-control',
    'field-control',
    'field-control_is-view',
  ];
  if (className) cls.push(className);
  if (!value || value.length === 0) cls.push('field-control_no-data');

  const label = items
    ?.filter((item) => {
      return value?.find((val) => {
        return String(item.value) === String(val);
      });
    })
    .map((item) => {
      return item.label;
    })
    .join(', ');

  return value && value.length > 0 ? (
    <div className={cls.join(' ')}>{label}</div>
  ) : (
    <div className={cls.join(' ')}>не указано</div>
  );
};
