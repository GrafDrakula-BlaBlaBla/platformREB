import React, {FC, ReactElement, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {InputAdornment, TextField} from '@material-ui/core';
import {TextFieldProps} from '@material-ui/core/TextField/TextField';
import {MultyCurrencyControlFormat} from './MultyCurrencyFieldControlFormat';
import useUpdateEffect from '../../hooks/useUpdateEffect';

const currency = [
  {
    code: '643',
    icon: '₽',
    name: 'Рубль',
  },
  {
    code: '840',
    icon: '$',
    name: 'Доллар США',
  },
  {
    code: '978',
    icon: '€',
    name: 'Евро',
  },
];

export type IMultyCurrencyProps = TextFieldProps & {
  value?: number;
  currencyIcon?: ReactElement;
};

export const MultyCurrencyFieldControl: FC<IMultyCurrencyProps> = observer(
  ({value, currencyIcon, onChange, ...other}) => {
    const [state, setState] = useState<string | number | undefined>(
      value || ''
    );
    useUpdateEffect(() => {
      setState(value);
    }, [value]);

    return (
      <TextField
        className={''}
        variant="outlined"
        value={state}
        onChange={(e) => {
          setState(e.target.value);
          if (onChange) {
            onChange(e);
          }
        }}
        InputProps={{
          inputComponent: MultyCurrencyControlFormat as any,
          endAdornment: (
            <InputAdornment position="end">{currencyIcon}</InputAdornment>
          ),
        }}
        {...other}
      />
    );
  }
);
