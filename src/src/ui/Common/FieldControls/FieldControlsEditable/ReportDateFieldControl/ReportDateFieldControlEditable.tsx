import React from 'react';
import {
  ReportDateFieldControl,
  ReportDateFieldControlProps,
} from '../../FieldControlsBase';
import {ReportDateFieldControlView} from './ReportDateFieldControlView';

export type ReportDateFieldControlEditableProps = ReportDateFieldControlProps & {
  isEdit?: boolean;
};

export const ReportDateFieldControlEditable = (
  props: ReportDateFieldControlEditableProps
) => {
  const {isEdit = true, value, className, ...other} = props;

  return isEdit ? (
    <ReportDateFieldControl value={value} className={className} {...other} />
  ) : (
    <ReportDateFieldControlView
      value={value}
      className={className}
      {...other}
    />
  );
};
