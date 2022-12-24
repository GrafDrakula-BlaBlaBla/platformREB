import React from 'react';
import {
  RadioGroupFieldControlProps,
  RadioGroupFieldControl,
} from '../../FieldControlsBase';
import {RadioGroupFieldControlView} from './RadioGroupFieldControlView';

export type RadioGroupFieldControlEditableProps = RadioGroupFieldControlProps & {
  isEdit?: boolean;
};

export const RadioGroupFieldControlEditable = (
  props: RadioGroupFieldControlEditableProps
) => {
  const {className, isEdit = true, value, ...other} = props;
  return isEdit ? (
    <RadioGroupFieldControl className={className} value={value} {...other} />
  ) : (
    <RadioGroupFieldControlView
      className={className}
      value={value}
      {...other}
    />
  );
};
