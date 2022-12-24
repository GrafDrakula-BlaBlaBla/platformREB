import React, {useState} from 'react';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import {SelectProps} from '@material-ui/core/Select/Select';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export interface ISelectItem {
  value?: number | string;
  label: string;
}

export type SelectFieldControlProps = SelectProps & {
  items?: ISelectItem[];
  error?: boolean;
  helperText?: string | null;
};

export const SelectFieldControl = (props: SelectFieldControlProps) => {
  const {
    className,
    variant,
    value,
    onChange,
    items,
    error,
    helperText,
    label,
    multiple,
    placeholder,
    displayEmpty,
    ...other
  } = props;

  const cls = [
    'select-field-control',
    'field-control',
    'field-control_is-edit',
  ];
  if (className) cls.push(className);

  const [state, setState] = useState(value || '');
  if (!state) cls.push('field-control_no-data');

  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  return (
    <FormControl variant="outlined" className={cls.join(' ')}>
      {label ? <InputLabel id="label">{label}</InputLabel> : null}
      <Select
        value={state}
        label={label}
        labelId="label"
        onChange={(e, child) => {
          setState(e.target.value);
          if (onChange) {
            onChange(e, child);
          }
        }}
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin: {vertical: 'bottom', horizontal: 0},
          transformOrigin: {vertical: -8, horizontal: 0},
          className: 'select-field-control__menu',
        }}
        IconComponent={ExpandMoreIcon}
        displayEmpty={Boolean(placeholder)}
        placeholder={placeholder}
        error={!!error}
        {...other}
      >
        {placeholder && (
          <MenuItem
            value=""
            className="select-field-control__menu-item_disabled"
          >
            {placeholder}
          </MenuItem>
        )}
        {items?.map((item, index) => {
          return (
            <MenuItem key={index} value={item.value ? item.value : ''}>
              {item.label}
            </MenuItem>
          );
        })}
      </Select>
      {helperText && (
        <FormHelperText error={!!error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
