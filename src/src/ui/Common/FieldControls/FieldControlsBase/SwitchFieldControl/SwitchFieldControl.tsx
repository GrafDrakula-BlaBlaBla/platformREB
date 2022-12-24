import React, {useState} from 'react';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import {
  FormControlLabel,
  FormHelperText,
  FormControl,
  SwitchProps,
} from '@material-ui/core';
import {Switch} from './Switch';

export type SwitchFieldControlProps = SwitchProps & {
  label?: string;
  error?: boolean;
  helperText?: string | null;
  value?: boolean;
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
};

export const SwitchFieldControl = (props: SwitchFieldControlProps) => {
  const {
    className,
    value = false,
    onChange,
    label,
    error,
    helperText,
    labelPlacement,
    ...other
  } = props;

  const cls = [
    'switch-field-control',
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
          <Switch
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
        labelPlacement={labelPlacement}
      />
      {helperText && (
        <FormHelperText error={!!error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
