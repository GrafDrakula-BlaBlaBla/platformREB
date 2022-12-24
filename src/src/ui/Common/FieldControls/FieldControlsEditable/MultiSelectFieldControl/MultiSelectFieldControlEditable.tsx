import React from 'react';
import {SelectInputProps} from '@material-ui/core/Select/SelectInput';
import {
  MultiSelectFieldControl,
  MultiSelectFieldControlProps,
} from '../../FieldControlsBase';
import {MultiSelectFieldControlView} from './MultiSelectFieldControlView';

export type MultiSelectFieldControlEditableProps = MultiSelectFieldControlProps & {
  isEdit?: boolean;
  onChange?: SelectInputProps['onChange'];
};

export const MultiSelectFieldControlEditable = (
  props: MultiSelectFieldControlEditableProps
) => {
  const {className, variant, isEdit = true, value, items, ...other} = props;
  return isEdit ? (
    <MultiSelectFieldControl
      className={className}
      value={value}
      items={items}
      {...other}
    />
  ) : (
    <MultiSelectFieldControlView
      className={className}
      value={value}
      items={items}
      {...other}
    />
  );
};
