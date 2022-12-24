import React, {useState} from 'react';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import {TextField} from '@material-ui/core';
import {TextFieldProps} from '@material-ui/core/TextField/TextField';

export type TextFieldControlProps = TextFieldProps & {
  value?: string | number;
  regex?: RegExp;
};

export const isTextFieldControlHasData = (value?: string | number) => {
  return value || value === 0;
};

export const TextFieldControl = (props: TextFieldControlProps) => {
  const {
    className,
    variant,
    value,
    onChange,
    regex,
    multiline,
    ...other
  } = props;

  const cls = ['text-field-control', 'field-control', 'field-control_is-edit'];
  if (className) cls.push(className);
  if (multiline) cls.push('text-field-control_multiline');

  const [state, setState] = useState<string | number | undefined>(value || '');
  if (!isTextFieldControlHasData(state)) cls.push('field-control_no-data');

  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  return (
    <TextField
      className={cls.join(' ')}
      variant="outlined"
      value={state}
      multiline={multiline}
      onChange={(e) => {
        if (regex) {
          if (regex.test(e.target.value)) {
            setState(e.target.value);
            if (onChange) onChange(e);
          }
        } else {
          setState(e.target.value);
          if (onChange) onChange(e);
        }
      }}
      {...other}
    />
  );
};
