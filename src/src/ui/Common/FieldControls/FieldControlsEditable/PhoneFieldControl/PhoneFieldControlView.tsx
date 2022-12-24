import React from 'react';
import NumberFormat from 'react-number-format';
import {PhoneFieldControlEditableProps} from './PhoneFieldControlEditable';

export const PhoneFieldControlView = (
  props: PhoneFieldControlEditableProps
) => {
  const {className, value} = props;

  const cls = ['phone-field-control', 'field-control', 'field-control_is-view'];
  if (className) cls.push(className);
  if (!value) cls.push('field-control_no-data');

  return value ? (
    <NumberFormat
      value={value}
      format="+7 (###) ###-##-##"
      displayType="text"
      className={cls.join(' ')}
    />
  ) : (
    <div className={cls.join(' ')}>не указано</div>
  );
};
