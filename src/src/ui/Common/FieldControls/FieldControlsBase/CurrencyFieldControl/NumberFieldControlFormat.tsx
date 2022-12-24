import React from 'react';
import NumberFormat from 'react-number-format';

export interface ICurrencyFieldControlFormat {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: {target: {name: string; value: string}}) => void;
  name: string;
}

export const NumberFieldControlFormat = (
  props: ICurrencyFieldControlFormat
) => {
  const {inputRef, onChange, ...other} = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator=" "
      decimalScale={2}
      isNumericString={false}
    />
  );
};
