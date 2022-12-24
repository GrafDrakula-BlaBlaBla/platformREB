import React from 'react';
import {useController, UseControllerProps} from 'react-hook-form';
import {
  ReportDateFieldControlEditable,
  ReportDateFieldControlEditableProps,
} from '../../FieldControlsEditable';

export type ReportDateFieldControlUseFormProps = ReportDateFieldControlEditableProps &
  UseControllerProps;

export const ReportDateFieldControlUseForm = (
  props: ReportDateFieldControlUseFormProps
) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController(props);

  const {onChange: changeHandler, error: err, rules, ...other} = props;

  return (
    <ReportDateFieldControlEditable
      onChange={(value) => {
        onChange(value);
        if (changeHandler) changeHandler(value);
      }}
      value={value}
      error={!!error}
      helperText={error?.message}
      {...other}
    />
  );
};
