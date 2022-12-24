import React from 'react';
import {SelectInputProps} from '@material-ui/core/Select/SelectInput';
import {
  SelectFieldControl,
  SelectFieldControlProps,
} from '../../FieldControlsBase';
import {SelectFieldControlView} from './SelectFieldControlView';

export type SelectFieldControlEditableProps = SelectFieldControlProps & {
  isEdit?: boolean;
  onChange?: SelectInputProps['onChange'];
};

export const SelectFieldControlEditable = (
  props: SelectFieldControlEditableProps
) => {
  const {className, isEdit = true, value, items, ...other} = props;

  return isEdit ? (
    <SelectFieldControl
      className={className}
      value={value}
      items={items}
      {...other}
    />
  ) : (
    <SelectFieldControlView
      className={className}
      value={value}
      items={items}
      {...other}
    />
  );
};
