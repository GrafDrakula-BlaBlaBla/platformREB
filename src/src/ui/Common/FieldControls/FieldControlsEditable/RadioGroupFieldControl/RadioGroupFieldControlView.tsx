import React from 'react';
import {IRadioItem} from '../../FieldControlsBase';
import {RadioGroupFieldControlEditableProps} from './RadioGroupFieldControlEditable';

export const RadioGroupFieldControlView = (
  props: RadioGroupFieldControlEditableProps
) => {
  const {className, value} = props;

  const cls = [
    'radio-group-field-control',
    'field-control',
    'field-control_is-view',
  ];
  if (className) cls.push(className);
  if (typeof value === 'undefined') cls.push('field-control_no-data');

  const displayValue =
    props.items.find((item: IRadioItem) => {
      return item.value === value;
    })?.label || 'не известно';

  return typeof value !== 'undefined' ? (
    <div className={cls.join(' ')}>{displayValue}</div>
  ) : (
    <div className={cls.join(' ')}>не указано</div>
  );
};
