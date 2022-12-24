import React from 'react';
import {useController, UseControllerProps} from 'react-hook-form';
import {
  DateIntervalFieldControlEditable,
  DateIntervalFieldControlEditableProps,
} from '../../FieldControlsEditable';

export type DateIntervalFieldControlUseFormProps = DateIntervalFieldControlEditableProps &
  UseControllerProps & {
    changeHandler?: (e: any) => void;
  };

export const DateIntervalFieldControlUseForm = (
  props: DateIntervalFieldControlUseFormProps
) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController(props);

  const {onChange: changeHandler, error: err, rules, ...other} = props;

  return (
    <DateIntervalFieldControlEditable
      onChange={(value, name) => {
        onChange(value);
        if (changeHandler) changeHandler(value, name);
      }}
      value={value}
      error={!!error}
      helperText={error?.message}
      {...other}
    />
  );
};
