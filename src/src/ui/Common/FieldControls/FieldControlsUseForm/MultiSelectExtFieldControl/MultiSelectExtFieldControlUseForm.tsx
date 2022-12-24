import React from 'react';
import {useController, UseControllerProps} from 'react-hook-form';
import {
  MultiSelectExtFieldControlEditable,
  MultiSelectExtFieldControlEditableProps,
} from '../../FieldControlsEditable';

export type MultiSelectExtFieldControlUseFormProps<
  ItemType
> = MultiSelectExtFieldControlEditableProps<ItemType> & UseControllerProps;

export const MultiSelectExtFieldControlUseForm = <ItemType,>(
  props: MultiSelectExtFieldControlUseFormProps<ItemType>
) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController(props);

  const {onChange: changeHandler, error: err, rules, ...other} = props;

  return (
    <MultiSelectExtFieldControlEditable
      value={value}
      onChange={(value, name) => {
        onChange(value);
        if (changeHandler) changeHandler(value, name);
      }}
      error={!!error}
      helperText={error ? error.message : null}
      {...other}
    />
  );
};
