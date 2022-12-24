import React, {FC} from 'react';
import {IMultyCurrencyProps} from './MultyCurrencyFieldControl';

export type MultyCurrencyFieldControlEditableProps = IMultyCurrencyProps & {
  isEdit?: boolean;
};

export const MultyCurrencyFieldControlEditable: FC<MultyCurrencyFieldControlEditableProps> = ({
  className,
  value,
  isEdit,
  ...other
}) => {
  return <div></div>;
  // return isEdit? (<MultyCurrencyFieldControl className={className} value={value} {...other}/>) : ()
};
