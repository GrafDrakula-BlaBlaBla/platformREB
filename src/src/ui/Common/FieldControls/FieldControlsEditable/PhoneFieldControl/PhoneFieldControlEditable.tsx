import React from 'react';
import {
  PhoneFieldControl,
  PhoneFieldControlProps,
} from '../../FieldControlsBase';
import {PhoneFieldControlView} from './PhoneFieldControlView';

export type PhoneFieldControlEditableProps = PhoneFieldControlProps & {
  isEdit?: boolean;
};

export const PhoneFieldControlEditable = (
  props: PhoneFieldControlEditableProps
) => {
  const {className, variant, isEdit = true, value, ...other} = props;
  return isEdit ? (
    <PhoneFieldControl value={value} className={className} {...other} />
  ) : (
    <PhoneFieldControlView value={value} className={className} {...other} />
  );
};
