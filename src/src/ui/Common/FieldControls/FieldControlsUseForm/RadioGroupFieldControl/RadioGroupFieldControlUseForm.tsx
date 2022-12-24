import React from 'react';
import {useController, UseControllerProps} from 'react-hook-form';
import {
  RadioGroupFieldControlEditable,
  RadioGroupFieldControlEditableProps,
} from '../../FieldControlsEditable';

export type RadioGroupFieldControlUseFormProps = RadioGroupFieldControlEditableProps &
  UseControllerProps;

export const RadioGroupFieldControlUseForm = (
  props: RadioGroupFieldControlUseFormProps
) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController(props);

  const {onChange: changeHandler, error: err, rules, ...other} = props;

  return (
    <RadioGroupFieldControlEditable
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
