import React, {useState} from 'react';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import {SelectProps} from '@material-ui/core/Select/Select';
import {ISelectItem} from '../SelectFieldControl';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export type MultiSelectFieldControlProps = SelectProps & {
  items?: ISelectItem[];
  error?: boolean;
  helperText?: string | null;
  value?: Array<unknown>;
};

export const MultiSelectFieldControl = (
  props: MultiSelectFieldControlProps
) => {
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
    'multi-select-field-control',
    'field-control',
    'field-control_is-edit',
  ];
  if (className) cls.push(className);

  const [state, setState] = useState<unknown[] | undefined>(value || []);
  if (!state || state.length === 0) cls.push('field-control_no-data');

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
          setState(e.target.value as unknown[]);
          if (onChange) {
            onChange(e, child);
          }
        }}
        renderValue={(selected) => {
          const sel = selected as unknown[];
          if (sel.length === 0) {
            return placeholder;
          }
          return items
            ?.filter((item) => sel.includes(item.value))
            .map((item) => item.label)
            .join(', ');
        }}
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin: {vertical: 'bottom', horizontal: 0},
          transformOrigin: {vertical: -8, horizontal: 0},
          className: 'multi-select-field-control__menu',
        }}
        IconComponent={ExpandMoreIcon}
        error={!!error}
        displayEmpty={Boolean(placeholder)}
        placeholder={placeholder}
        multiple
        {...other}
      >
        {placeholder && (
          <MenuItem value="" disabled={true}>
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
