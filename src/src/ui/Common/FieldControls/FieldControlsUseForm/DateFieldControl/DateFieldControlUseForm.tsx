import React, {useEffect} from 'react';
import merge from '../../../../../Utils/Object/merge';
import {isAfter, isBefore, isValid, parse} from 'date-fns';
import {
  useController,
  UseControllerProps,
  useFormContext,
} from 'react-hook-form';
import {
  DateFieldControlEditable,
  DateFieldControlEditableProps,
} from '../../FieldControlsEditable';

export interface DateFieldControlUseFormProps
  extends Omit<DateFieldControlEditableProps, 'name'>,
    UseControllerProps {}

export const DateFieldControlUseForm = (
  props: DateFieldControlUseFormProps
) => {
  const {rules, shouldValidate, ...other} = props;

  const dateRules = {
    validate: {
      isDate: (value: any) => {
        const date =
          typeof value === 'string'
            ? parse(value, 'dd.MM.yyyy', new Date())
            : value;
        const valid = isValid(date);
        return value ? valid || 'Не верный формат даты' : true;
      },
      minDate: (value: any) => {
        const date =
          typeof value === 'string'
            ? parse(value, 'dd.MM.yyyy', new Date())
            : value;
        return (
          !isBefore(date, new Date(1900, 0, 1)) ||
          'Дата не может быть меньше 01.01.1900'
        );
      },
      maxDate: (value: any) => {
        const date =
          typeof value === 'string'
            ? parse(value, 'dd.MM.yyyy', new Date())
            : value;
        return (
          !isAfter(date, new Date(2100, 0, 1)) ||
          'Дата не может быть больше 01.01.2100'
        );
      },
    },
  };

  const newRules = shouldValidate ? merge(dateRules, rules || {}) : rules;

  return (
    <DateFieldControlUseFormBase
      rules={newRules}
      shouldValidate={false}
      {...other}
    />
  );
};

const DateFieldControlUseFormBase = (props: DateFieldControlUseFormProps) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController(props);

  const {onChange: changeHandler, error: err, rules, ...other} = props;

  const {setValue} = useFormContext();

  const dateValue =
    typeof value === 'string' ? parse(value, 'dd.MM.yyyy', new Date()) : value;

  useEffect(() => {
    if (typeof value === 'string') {
      const dateValue = parse(value, 'dd.MM.yyyy', new Date());
      setValue(props.name, dateValue, {shouldValidate: false});
    }
    // eslint-disable-next-line
  }, []);

  return (
    <DateFieldControlEditable
      value={dateValue}
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
