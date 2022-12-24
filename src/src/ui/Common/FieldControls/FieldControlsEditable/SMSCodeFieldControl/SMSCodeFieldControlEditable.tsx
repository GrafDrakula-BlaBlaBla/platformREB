import React from 'react';
import {
  SMSCodeFieldControl,
  SMSCodeFieldControlProps,
} from '../../FieldControlsBase';
import {SMSCodeFieldControlView} from './SMSCodeFieldControlView';

export type SMSCodeFieldControlEditableProps = SMSCodeFieldControlProps & {
  isEdit?: boolean;
};

export const SMSCodeFieldControlEditable = (
  props: SMSCodeFieldControlEditableProps
) => {
  const {className, isEdit = true, value, ...other} = props;
  return isEdit ? (
    <SMSCodeFieldControl value={value} className={className} {...other} />
  ) : (
    <SMSCodeFieldControlView value={value} className={className} {...other} />
  );
};
