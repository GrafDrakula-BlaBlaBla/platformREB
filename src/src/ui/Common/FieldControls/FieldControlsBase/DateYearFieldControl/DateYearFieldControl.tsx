import React, {useEffect, useState} from 'react';
import {parse} from 'date-fns';
import {TModify} from '../../../../../Utils/TS/TModify';
import {DateFieldControl, DateFieldControlProps} from '../DateFieldControl';

export interface DateYearFieldControlProps
  extends TModify<
    DateFieldControlProps,
    {
      value?: number;
      onChange?: (year?: number, name?: string | null) => void;
    }
  > {}

export const DateYearFieldControl = (props: DateYearFieldControlProps) => {
  const {className, variant, value, onChange, views, ...other} = props;

  const cls = [
    'date-year-field-control',
    'date-field-control',
    'field-control',
    'field-control_is-edit',
  ];
  if (className) cls.push(className);

  const [state, setState] = useState<number | undefined>(value);
  if (!state) cls.push('field-control_no-data');

  useEffect(() => {
    setState(value);
  }, [value]);

  return (
    <DateFieldControl
      className={cls.join(' ')}
      value={
        typeof state === 'number'
          ? parse(String(state), 'yyyy', new Date())
          : undefined
      }
      onChange={(date, name) => {
        const year = date?.getFullYear();
        setState(year);
        if (onChange) {
          onChange(year, name);
        }
      }}
      views={['year']}
      format="yyyy"
      minDateMessage="Год не может быть меньше 1900"
      maxDateMessage="Дата не может быть больше 2100"
      invalidDateMessage="Не верный формат"
      {...other}
    />
  );
};
