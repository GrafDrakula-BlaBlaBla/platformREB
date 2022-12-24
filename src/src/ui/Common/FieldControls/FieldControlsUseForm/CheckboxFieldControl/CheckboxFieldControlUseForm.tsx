import React from 'react';
import {useController, UseControllerProps} from 'react-hook-form';
import {
  CheckboxFieldControlEditable,
  CheckboxFieldControlEditableProps,
} from '../../FieldControlsEditable';

export type CheckboxFieldControlUseFormProps = CheckboxFieldControlEditableProps &
  UseControllerProps;

export const CheckboxFieldControlUseForm = (
  props: CheckboxFieldControlUseFormProps
) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController(props);

  const {onChange: changeHandler, error: err, rules, ...other} = props;

  return (
    <CheckboxFieldControlEditable
      value={value}
      onChange={(e, value) => {
        onChange(e);
        if (changeHandler) changeHandler(e, value);
      }}
      error={!!error}
      helperText={error ? error.message : null}
      {...other}
    />
  );
};
