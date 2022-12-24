import React from 'react';
import {
  CurrencyFieldControl,
  CurrencyFieldControlProps,
} from '../../FieldControlsBase';
import {CurrencyFieldControlView} from './CurrencyFieldControlView';

export type CurrencyFieldControlEditableProps = CurrencyFieldControlProps & {
  isEdit?: boolean;
};

export const CurrencyFieldControlEditable = (
  props: CurrencyFieldControlEditableProps
) => {
  const {className, isEdit = true, value, ...other} = props;
  return isEdit ? (
    <CurrencyFieldControl value={value} className={className} {...other} />
  ) : (
    <CurrencyFieldControlView value={value} className={className} {...other} />
  );
};
