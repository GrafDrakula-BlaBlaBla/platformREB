import React from 'react';
import {useController, UseControllerProps} from 'react-hook-form';
import {
  CurrencyFieldControlEditable,
  CurrencyFieldControlEditableProps,
} from '../../FieldControlsEditable';

export type CurrencyFieldControlUseFormProps = CurrencyFieldControlEditableProps &
  UseControllerProps;

export const CurrencyFieldControlUseForm = (
  props: CurrencyFieldControlUseFormProps
) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController(props);

  const {onChange: changeHandler, error: err, rules, ...other} = props;

  return (
    <CurrencyFieldControlEditable
      value={value}
      onChange={(e) => {
        onChange(e);
        if (changeHandler) changeHandler(e);
      }}
      error={!!error}
      helperText={error ? error.message : null}
      {...other}
    />
  );
};
