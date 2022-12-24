import React, {useState} from 'react';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import {
  CheckboxProps,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  FormControl,
} from '@material-ui/core';

export type CheckboxFieldControlProps = CheckboxProps & {
  label?: string;
  error?: boolean;
  helperText?: string | null;
  value?: boolean;
};

export const CheckboxFieldControl = (props: CheckboxFieldControlProps) => {
  const {
    className,
    value = false,
    onChange,
    label,
    error,
    helperText,
    ...other
  } = props;

  const cls = [
    'checkbox-field-control',
    'field-control',
    'field-control_is-edit',
  ];
  if (className) cls.push(className);
  if (error) cls.push('field-control-error');

  const [state, setState] = useState<boolean>(value as boolean);
  if (typeof state === 'undefined') cls.push('field-control_no-data');

  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  return (
    <FormControl className={cls.join(' ')}>
      <FormControlLabel
        control={
          <Checkbox
            checked={state}
            onChange={(e, checked) => {
              setState(e.target.checked as boolean);
              if (onChange) {
                onChange(e, checked);
              }
            }}
            {...other}
          />
        }
        label={label}
      />
      {helperText && (
        <FormHelperText error={!!error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
