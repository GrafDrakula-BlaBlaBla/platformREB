import React from 'react';
import {
  DateIntervalFieldControl,
  DateIntervalFieldControlProps,
} from '../../FieldControlsBase';
import {DateIntervalFieldControlView} from './DateIntervalFieldControlView';

export interface DateIntervalFieldControlEditableProps
  extends DateIntervalFieldControlProps {
  isEdit?: boolean;
}

export const DateIntervalFieldControlEditable = (
  props: DateIntervalFieldControlEditableProps
) => {
  const {className, variant, isEdit = true, value, ...other} = props;
  return isEdit ? (
    <DateIntervalFieldControl value={value} className={className} {...other} />
  ) : (
    <DateIntervalFieldControlView
      value={value}
      className={className}
      {...other}
    />
  );
};
