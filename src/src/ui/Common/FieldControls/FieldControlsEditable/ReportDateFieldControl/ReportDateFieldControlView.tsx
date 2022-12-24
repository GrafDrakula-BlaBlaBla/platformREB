import React from 'react';
import {getReportDateDisplayValue} from '../../FieldControlsBase';
import {ReportDateFieldControlEditableProps} from './ReportDateFieldControlEditable';

export const ReportDateFieldControlView = (
  props: ReportDateFieldControlEditableProps
) => {
  const {value, className} = props;

  const cls = [
    'report-date-field-control',
    'field-control',
    'field-control_is-view',
  ];
  if (className) cls.push(className);
  if (!getReportDateDisplayValue(value)) cls.push('field-control_no-data');

  return getReportDateDisplayValue(value) ? (
    <div className={cls.join(' ')}>{getReportDateDisplayValue(value)}</div>
  ) : (
    <div className={cls.join(' ')}>не указано</div>
  );
};
