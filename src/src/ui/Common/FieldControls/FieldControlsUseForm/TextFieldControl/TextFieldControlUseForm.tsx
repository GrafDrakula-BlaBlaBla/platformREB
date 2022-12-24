import React from 'react';
import {useController, UseControllerProps} from 'react-hook-form';
import merge from '../../../../../Utils/Object/merge';
import {
  TextFieldControlEditable,
  TextFieldControlEditableProps,
} from '../../FieldControlsEditable';

export type TextFieldControlUseFormProps = TextFieldControlEditableProps &
  UseControllerProps & {
    emailValidate?: boolean;
  };

export const TextFieldControlUseForm = (
  props: TextFieldControlUseFormProps
) => {
  const {rules, emailValidate, ...other} = props;

  const emailRules = {
    validate: {
      isValid: (value: any) => {
        const emailRegExp = new RegExp(/.+@.+\..+/, 'i');
        return emailRegExp.test(value) || 'Не верный формат почты';
      },
    },
  };

  const newRules = emailValidate ? merge(rules || {}, emailRules) : rules;

  return <TextFieldControlUseFormBase rules={newRules} {...other} />;
};

const TextFieldControlUseFormBase = (props: TextFieldControlUseFormProps) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController(props);

  const {onChange: changeHandler, error: err, rules, ...other} = props;

  return (
    <TextFieldControlEditable
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
