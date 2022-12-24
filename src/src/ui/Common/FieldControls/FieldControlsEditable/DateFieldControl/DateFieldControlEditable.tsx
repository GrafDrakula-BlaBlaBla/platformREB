import React from 'react';
import {DateFieldControl, DateFieldControlProps} from '../../FieldControlsBase';
import {DateFieldControlView} from './DateFieldControlView';

export interface DateFieldControlEditableProps extends DateFieldControlProps {
  isEdit?: boolean;
}

export const DateFieldControlEditable = (
  props: DateFieldControlEditableProps
) => {
  const {className, variant, isEdit = true, value, ...other} = props;
  return isEdit ? (
    <DateFieldControl value={value} className={className} {...other} />
  ) : (
    <DateFieldControlView value={value} className={className} {...other} />
  );
};
