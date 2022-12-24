import React, {useState} from 'react';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  RadioGroupProps,
} from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

export interface IRadioItem {
  value: string;
  label: string;
}

export type RadioGroupFieldControlProps = RadioGroupProps & {
  items: IRadioItem[];
  error?: boolean;
  helperText?: string | null;
  value?: string;
  disabled?: boolean;
  layout?: 'vertical' | 'horizontal';
};

export const RadioGroupFieldControl = (props: RadioGroupFieldControlProps) => {
  const {
    className,
    value,
    onChange,
    error,
    helperText,
    items,
    disabled,
    layout = 'vertical',
    ...other
  } = props;

  const cls = [
    'radio-group-field-control',
    'field-control',
    'field-control_is-edit',
  ];
  if (className) cls.push(className);
  if (error) cls.push('field-control-error');
  cls.push(`radio-group-field-control_${layout}`);

  const [state, setState] = useState<string>(value || '');
  if (!state) cls.push('field-control_no-data');

  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  return (
    <FormControl className={cls.join(' ')} component="fieldset">
      <RadioGroup
        value={state}
        onChange={(e: React.ChangeEvent<HTMLInputElement>, value) => {
          setState(e.target.value);
          if (onChange) {
            onChange(e, value);
          }
        }}
        {...other}
      >
        {items.map((item, index) => {
          return (
            <FormControlLabel
              key={index}
              value={item.value}
              control={<Radio color="primary" />}
              label={item.label}
              disabled={disabled}
            />
          );
        })}
      </RadioGroup>
      {helperText && (
        <FormHelperText error={!!error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
