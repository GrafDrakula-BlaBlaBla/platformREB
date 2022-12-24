import React, {useState} from 'react';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import {InputAdornment, TextField} from '@material-ui/core';
import {TextFieldProps} from '@material-ui/core/TextField/TextField';
import {NumberFieldControlFormat} from './NumberFieldControlFormat';
import {ClassNameInjection} from '../../../../../Utils/ClassNames/ClassNameInjection';

const CURRENCIES_KNOWN: Record<string, string> = {
  RUB: '₽',
  USD: '$',
  EUR: '€',
};

export const getCurrencySign = (codeLat: string) => {
  return CURRENCIES_KNOWN[codeLat] ? CURRENCIES_KNOWN[codeLat] : codeLat;
};

export type CurrencyFieldControlProps = TextFieldProps & {
  value?: string | number;
  codeLat?: string;
};

export const isCurrencyFieldControlHasData = (value?: string | number) => {
  return value || value === 0;
};

export const CurrencyFieldControl = (props: CurrencyFieldControlProps) => {
  const {
    className,
    variant,
    value,
    onChange,
    InputProps,
    codeLat = 'RUB',
    ...other
  } = props;

  const [state, setState] = useState<string | number | undefined>(value);

  const cls = ClassNameInjection(
    'currency-field-control',
    'field-control',
    'field-control_is-edit',
    className,
    {'field-control_no-data': !isCurrencyFieldControlHasData(state)}
  );

  useUpdateEffect(() => {
    setState(value);
  }, [value]);

  return (
    <TextField
      className={cls}
      variant="outlined"
      value={state}
      onChange={(e) => {
        setState(e.target.value);
        if (onChange) {
          onChange(e);
        }
      }}
      InputProps={{
        inputComponent: NumberFieldControlFormat as any,
        endAdornment: (
          <InputAdornment position="end">
            {getCurrencySign(codeLat)}
          </InputAdornment>
        ),
      }}
      {...other}
    />
  );
};
