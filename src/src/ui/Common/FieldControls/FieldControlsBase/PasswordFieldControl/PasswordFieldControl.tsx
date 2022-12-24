import React, {useState, MouseEvent} from 'react';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import {IconButton, InputAdornment, TextField} from '@material-ui/core';
import {TextFieldProps} from '@material-ui/core/TextField/TextField';

export type PasswordFieldControlProps = TextFieldProps & {
  value?: string;
};

export const PasswordFieldControl = (props: PasswordFieldControlProps) => {
  const {
    className,
    type,
    variant,
    value,
    onChange,
    InputProps,
    ...other
  } = props;

  const cls = [
    'password-field-control',
    'field-control',
    'field-control_is-edit',
  ];
  if (className) cls.push(className);

  const [state, setState] = useState<string | undefined>(value || '');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  if (!state) cls.push('field-control_no-data');

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  return (
    <TextField
      className={cls.join(' ')}
      type={showPassword ? 'text' : 'password'}
      variant="outlined"
      value={state}
      onChange={(e) => {
        setState(e.target.value);
        if (onChange) {
          onChange(e);
        }
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? (
                <Visibility className="color-light-blue" />
              ) : (
                <VisibilityOff className="color-actions-no-active" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...other}
    />
  );
};
