import React from 'react';
import {SMSCodeFieldControlEditableProps} from './SMSCodeFieldControlEditable';
import {isSMSCodeControlHasData} from '../../FieldControlsBase';

export const SMSCodeFieldControlView = (
  props: SMSCodeFieldControlEditableProps
) => {
  const {className, value} = props;

  const cls = [
    'sms-code-field-control',
    'field-control',
    'field-control_is-view',
  ];
  if (className) cls.push(className);
  if (!isSMSCodeControlHasData(value?.split('') || []))
    cls.push('field-control_no-data');

  return isSMSCodeControlHasData(value?.split('') || []) ? (
    <div className={cls.join(' ')}>{value?.toString().split('').join(' ')}</div>
  ) : (
    <div className={cls.join(' ')}>не указано</div>
  );
};
