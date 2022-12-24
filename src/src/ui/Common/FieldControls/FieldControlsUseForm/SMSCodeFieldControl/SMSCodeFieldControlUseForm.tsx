import React from 'react';
import {useController, UseControllerProps} from 'react-hook-form';
import {
  SMSCodeFieldControlEditable,
  SMSCodeFieldControlEditableProps,
} from '../../FieldControlsEditable';

export type SMSCodeFieldControlUseFormProps = SMSCodeFieldControlEditableProps &
  UseControllerProps;

export const SMSCodeFieldControlUseForm = (
  props: SMSCodeFieldControlUseFormProps
) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController(props);

  const {onChange: changeHandler, error: err, rules, ...other} = props;

  return (
    <SMSCodeFieldControlEditable
      value={value}
      onChange={(arr, value, name) => {
        onChange({target: {value: value}});
        if (changeHandler) changeHandler(arr, value, name);
      }}
      error={!!error}
      helperText={error ? error.message : null}
      {...other}
    />
  );
};
