import React from 'react';
import {
  PasswordFieldControl,
  PasswordFieldControlProps,
} from '../../FieldControlsBase';
import {PasswordFieldControlView} from './PasswordFieldControlView';

export type PasswordFieldControlEditableProps = PasswordFieldControlProps & {
  isEdit?: boolean;
};

export const PasswordFieldControlEditable = (
  props: PasswordFieldControlEditableProps
) => {
  const {className, variant, isEdit = true, value, ...other} = props;
  return isEdit ? (
    <PasswordFieldControl value={value} className={className} {...other} />
  ) : (
    <PasswordFieldControlView value={value} className={className} {...other} />
  );
};
