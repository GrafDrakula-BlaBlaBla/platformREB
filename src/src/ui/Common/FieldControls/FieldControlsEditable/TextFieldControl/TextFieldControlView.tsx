import React from 'react';
import {TextFieldControlEditableProps} from './TextFieldControlEditable';
import {isTextFieldControlHasData} from '../../FieldControlsBase';

export const TextFieldControlView = (props: TextFieldControlEditableProps) => {
  const {className, value, viewFormat} = props;

  const cls = ['text-field-control', 'field-control', 'field-control_is-view'];
  if (className) cls.push(className);
  if (!isTextFieldControlHasData(value)) cls.push('field-control_no-data');

  return isTextFieldControlHasData(value) ? (
    <div className={cls.join(' ')}>
      {viewFormat ? viewFormat(value) : value}
    </div>
  ) : (
    <div className={cls.join(' ')}>не указано</div>
  );
};
