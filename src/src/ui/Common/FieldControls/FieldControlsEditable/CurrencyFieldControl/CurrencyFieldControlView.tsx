import React from 'react';
import NumberFormat from 'react-number-format';
import {CurrencyFieldControlEditableProps} from './CurrencyFieldControlEditable';
import {
  getCurrencySign,
  isCurrencyFieldControlHasData,
} from '../../FieldControlsBase';

export const CurrencyFieldControlView = (
  props: CurrencyFieldControlEditableProps
) => {
  const {className, value, codeLat = 'RUB'} = props;

  const cls = [
    'currency-field-control',
    'field-control',
    'field-control_is-view',
  ];
  if (className) cls.push(className);
  if (!isCurrencyFieldControlHasData(value)) cls.push('field-control_no-data');

  return isCurrencyFieldControlHasData(value) ? (
    <NumberFormat
      value={value}
      displayType="text"
      thousandSeparator=" "
      suffix={` ${getCurrencySign(codeLat)}`}
      decimalScale={2}
      fixedDecimalScale
      className={cls.join(' ')}
    />
  ) : (
    <div className={cls.join(' ')}>не указано</div>
  );
};
