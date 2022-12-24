import React from 'react';
import {useController, UseControllerProps} from 'react-hook-form';
import {
  SwitchFieldControlEditable,
  SwitchFieldControlEditableProps,
} from '../../FieldControlsEditable';

export type SwitchFieldControlUseFormProps = SwitchFieldControlEditableProps &
  UseControllerProps;

export const SwitchFieldControlUseForm = (
  props: SwitchFieldControlUseFormProps
) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController(props);

  const {onChange: changeHandler, error: err, rules, ...other} = props;

  return (
    <SwitchFieldControlEditable
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
