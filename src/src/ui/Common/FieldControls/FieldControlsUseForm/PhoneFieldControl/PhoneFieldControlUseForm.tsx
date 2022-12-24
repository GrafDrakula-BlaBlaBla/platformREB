import React from 'react';
import merge from '../../../../../Utils/Object/merge';
import {useController, UseControllerProps} from 'react-hook-form';
import {
  PhoneFieldControlEditable,
  PhoneFieldControlEditableProps,
} from '../../FieldControlsEditable';

export type PhoneFieldControlUseFormProps = PhoneFieldControlEditableProps &
  UseControllerProps & {
    shouldValidate?: boolean;
  };

export const PhoneFieldControlUseForm = (
  props: PhoneFieldControlUseFormProps
) => {
  const {rules, shouldValidate, ...other} = props;

  const phoneRules = {
    validate: {
      isValid: (value: any) => {
        const phoneRegExp = new RegExp(/[\d]+/, 'g');
        const result = value?.match(phoneRegExp)?.join('');
        return result?.length === 10 || 'Не верный формат телефона';
      },
    },
  };

  const newRules = shouldValidate ? merge(rules || {}, phoneRules) : rules;

  return <PhoneFieldControlUseFormBase rules={newRules} {...other} />;
};

const PhoneFieldControlUseFormBase = (props: PhoneFieldControlUseFormProps) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController(props);

  const {onChange: changeHandler, error: err, rules, ...other} = props;

  return (
    <PhoneFieldControlEditable
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
