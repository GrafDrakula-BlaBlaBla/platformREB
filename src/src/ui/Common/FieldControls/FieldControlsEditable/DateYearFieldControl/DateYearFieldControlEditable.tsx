import React from 'react';
import {
  DateYearFieldControl,
  DateYearFieldControlProps,
} from '../../FieldControlsBase';
import {DateYearFieldControlView} from './DateYearFieldControlView';

export interface DateYearFieldControlEditableProps
  extends DateYearFieldControlProps {
  isEdit?: boolean;
}

export const DateYearFieldControlEditable = (
  props: DateYearFieldControlEditableProps
) => {
  const {className, variant, isEdit = true, value, ...other} = props;
  return isEdit ? (
    <DateYearFieldControl value={value} className={className} {...other} />
  ) : (
    <DateYearFieldControlView value={value} className={className} {...other} />
  );
};
