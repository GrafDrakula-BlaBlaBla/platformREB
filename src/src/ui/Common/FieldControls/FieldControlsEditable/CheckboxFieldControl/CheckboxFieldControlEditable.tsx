import React from 'react';
import {
  CheckboxFieldControlProps,
  CheckboxFieldControl,
} from '../../FieldControlsBase';
import {CheckboxFieldControlView} from './CheckboxFieldControlView';

export type CheckboxFieldControlEditableProps = CheckboxFieldControlProps & {
  isEdit?: boolean;
};

export const CheckboxFieldControlEditable = (
  props: CheckboxFieldControlEditableProps
) => {
  const {className, isEdit = true, value, ...other} = props;
  return isEdit ? (
    <CheckboxFieldControl value={value} className={className} {...other} />
  ) : (
    <CheckboxFieldControlView value={value} className={className} {...other} />
  );
};
