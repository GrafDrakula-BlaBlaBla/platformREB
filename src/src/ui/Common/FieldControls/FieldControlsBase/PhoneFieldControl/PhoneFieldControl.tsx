import React, {useState} from 'react';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import {TextField} from '@material-ui/core';
import {TextFieldProps} from '@material-ui/core/TextField/TextField';
import {PhoneFieldControlFormat} from './PhoneFieldControlFormat';

export type PhoneFieldControlProps = TextFieldProps & {
  value?: string;
};

export const PhoneFieldControl = (props: PhoneFieldControlProps) => {
  const {className, variant, value, onChange, InputProps, ...other} = props;

  const cls = ['phone-field-control', 'field-control', 'field-control_is-edit'];
  if (className) cls.push(className);

  const [state, setState] = useState<string | undefined>(value || '');
  if (!state) cls.push('field-control_no-data');

  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  return (
    <TextField
      className={cls.join(' ')}
      variant="outlined"
      value={state}
      onChange={(e) => {
        setState(e.target.value);
        if (onChange) {
          onChange(e);
        }
      }}
      InputProps={{
        inputComponent: PhoneFieldControlFormat as any,
      }}
      {...other}
    />
  );
};
