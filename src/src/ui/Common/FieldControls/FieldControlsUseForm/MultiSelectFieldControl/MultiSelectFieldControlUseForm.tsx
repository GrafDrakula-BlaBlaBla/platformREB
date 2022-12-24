import React from 'react';
import {useController, UseControllerProps} from 'react-hook-form';
import {
  MultiSelectFieldControlEditable,
  MultiSelectFieldControlEditableProps,
} from '../../FieldControlsEditable';

export type MultiSelectFieldControlUseFormProps = MultiSelectFieldControlEditableProps &
  UseControllerProps;

export const MultiSelectFieldControlUseForm = (
  props: MultiSelectFieldControlUseFormProps
) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController(props);

  const {onChange: changeHandler, error: err, rules, ...other} = props;

  return (
    <MultiSelectFieldControlEditable
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
