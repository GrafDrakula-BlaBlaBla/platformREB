import React from 'react';
import merge from '../../../../../Utils/Object/merge';
import {useController, UseControllerProps} from 'react-hook-form';
import {
  PasswordFieldControlEditable,
  PasswordFieldControlEditableProps,
} from '../../FieldControlsEditable';

export type PasswordFieldControlUseFormProps = PasswordFieldControlEditableProps &
  UseControllerProps & {
    shouldValidate?: boolean;
  };

export const PasswordFieldControlUseForm = (
  props: PasswordFieldControlUseFormProps
) => {
  const {rules, shouldValidate, ...other} = props;

  const passwordRules = {
    validate: {
      password: (value: any) => {
        const rules = [
          {
            message: 'не менее 8-ми символов',
            func: (value: any) => {
              return /^.{8,}$/.test(value);
            },
          },
          {
            message: 'хотя бы одну строчную латинскую букву',
            func: (value: any) => {
              return /[a-z]+/.test(value);
            },
          },
          {
            message: 'хотя бы одну заглавную латинскую букву',
            func: (value: any) => {
              return /[A-Z]+/.test(value);
            },
          },
          {
            message: 'хотя бы одну цифру',
            func: (value: any) => {
              return /[\d]+/.test(value);
            },
          },
          {
            message: 'хотя бы один спецсимвол: @$!%*?&',
            func: (value: any) => {
              return /[@$!%*?&]+/.test(value);
            },
          },
        ];
        const messages: string[] = [];
        rules.forEach(function (rule) {
          if (!rule.func(value)) messages.push(rule.message);
        });
        const message = messages
          .map((d) => {
            return `• ${d}`;
          })
          .join('\n');
        return messages.length > 0
          ? `Пароль должен содержать:\n${message}`
          : true;
      },
    },
  };

  const newRules = shouldValidate ? merge(rules || {}, passwordRules) : rules;

  return <PasswordFieldControlUseFormBase rules={newRules} {...other} />;
};

const PasswordFieldControlUseFormBase = (
  props: PasswordFieldControlUseFormProps
) => {
  const {
    field: {onChange, value},
    fieldState: {error},
  } = useController(props);

  const {onChange: changeHandler, error: err, rules, ...other} = props;

  return (
    <PasswordFieldControlEditable
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
