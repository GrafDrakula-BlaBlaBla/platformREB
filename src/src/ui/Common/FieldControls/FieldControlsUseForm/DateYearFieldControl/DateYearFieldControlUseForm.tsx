import React from 'react';
import merge from '../../../../../Utils/Object/merge';
import {useController, UseControllerProps} from 'react-hook-form';
import {
  DateYearFieldControlEditable,
  DateYearFieldControlEditableProps,
} from '../../FieldControlsEditable';

export interface DateYearFieldControlUseFormProps
  extends Omit<DateYearFieldControlEditableProps, 'name'>,
    UseControllerProps {}

export const DateYearFieldControlUseForm = (
  props: DateYearFieldControlUseFormProps
) => {
  const {rules, shouldValidate, ...other} = props;

  const yearRules = {
    validate: {
      isValid: (value: any) => {
        return !isNaN(value) || 'Не верный формат';
      },
      minValue: (value: any) => {
        return value >= 1900 || 'Год не может быть меньше 1900';
      },
      maxValue: (value: any) => {
        return value <= 2100 || 'Год не может быть больше 2100';
      },
    },
  };

  const newRules = shouldValidate ? merge(yearRules, rules || {}) : rules;

  return (
    <DateYearFieldControlUseFormBase
      rules={newRules}
      shouldValidate={false}
      {...other}
    />
  );
};

export const DateYearFieldControlUseFormBase = (
  props: DateYearFieldControlUseFormProps
) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController(props);

  const {onChange: changeHandler, error: err, rules, ...other} = props;

  return (
    <DateYearFieldControlEditable
      value={Number(value) || undefined}
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
