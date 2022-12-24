import React from 'react';
import NumberFormat from 'react-number-format';

interface IProps {
  value: number;
  suffix?: string;
  decimalScale?: number;
}

export const MoneyWrapper = ({value, suffix, decimalScale}: IProps) => {
  if (!Number.isInteger(value) && !decimalScale) {
    decimalScale = 2;
  }

  return (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator=" "
      decimalScale={decimalScale}
      suffix={suffix}
      fixedDecimalScale
    />
  );
};
