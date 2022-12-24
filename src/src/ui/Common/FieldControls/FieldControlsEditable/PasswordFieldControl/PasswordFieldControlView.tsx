import React from 'react';
import {PasswordFieldControlEditableProps} from './PasswordFieldControlEditable';

export const PasswordFieldControlView = (
  props: PasswordFieldControlEditableProps
) => {
  const {className, value} = props;

  const cls = [
    'password-field-control',
    'field-control',
    'field-control_is-view',
  ];
  if (className) cls.push(className);
  if (!value) cls.push('field-control_no-data');

  return value ? (
    <div className={cls.join(' ')}>{value.replace(/./g, '*')}</div>
  ) : (
    <div className={cls.join(' ')}>не указано</div>
  );
};
