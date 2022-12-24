import React, {FC} from 'react';
import NumberFormat from 'react-number-format';

export interface IMultyCurrencyFieldControlFormat {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: {target: {name: string; value: string}}) => void;
  name: string;
}

export const MultyCurrencyControlFormat: FC<IMultyCurrencyFieldControlFormat> = ({
  inputRef,
  onChange,
  name,
  ...other
}) => {
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: name,
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
