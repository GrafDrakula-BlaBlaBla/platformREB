import React from 'react';
import {useController, UseControllerProps} from 'react-hook-form';
import {
  SelectFieldControlEditable,
  SelectFieldControlEditableProps,
} from '../../FieldControlsEditable';

export type SelectFieldControlUseFormProps = SelectFieldControlEditableProps &
  UseControllerProps;

export const SelectFieldControlUseForm = (
  props: SelectFieldControlUseFormProps
) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController(props);

  const {onChange: changeHandler, error: err, rules, ...other} = props;

  return (
    <SelectFieldControlEditable
      value={value}
      onChange={(e, child) => {
        onChange(e);
        if (changeHandler) changeHandler(e, child);
      }}
      error={!!error}
      helperText={error ? error.message : null}
      {...other}
    />
  );
};
