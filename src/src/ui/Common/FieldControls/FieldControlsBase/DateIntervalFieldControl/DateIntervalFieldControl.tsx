import React, {useEffect, useState} from 'react';
import {TModify} from '../../../../../Utils/TS/TModify';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {FormControl, FormHelperText} from '@material-ui/core';
import {DateFieldControl, DateFieldControlProps} from '../DateFieldControl';

export interface IDateIntervalValue {
  start?: Date | null;
  end?: Date | null;
}

export const dateIntervalDefaultValue: IDateIntervalValue = {
  start: undefined,
  end: undefined,
};

export interface DateIntervalFieldControlProps
  extends TModify<
    DateFieldControlProps,
    {
      value?: IDateIntervalValue;
      onChange?: (value: IDateIntervalValue, name?: string | null) => void;
    }
  > {
  labelStart?: string;
  labelEnd?: string;
  placeholderStart?: string;
  placeholderEnd?: string;
}

export const DateIntervalFieldControl = (
  props: DateIntervalFieldControlProps
) => {
  const {
    value,
    onChange,
    className,
    error,
    helperText,
    placeholder,
    label,
    labelStart,
    labelEnd,
    placeholderStart,
    placeholderEnd,
    minDate,
    maxDate,
    ...other
  } = props;

  const cls = [
    'date-interval-field-control',
    'field-control',
    'field-control_is-edit',
  ];
  if (className) cls.push(className);

  const [state, setState] = useState<IDateIntervalValue>(
    dateIntervalDefaultValue
  );
  if (!state || (!state.start && !state.end)) cls.push('field-control_no-data');

  const setStartDate = (date: Date | null) => {
    const value = {...state};
    value.start = date;
    setState(value);
    if (onChange) {
      onChange(value, props.name);
    }
  };

  const setEndDate = (date: Date | null) => {
    const value = {...state};
    value.end = date;
    setState(value);
    if (onChange) {
      onChange(value, props.name);
    }
  };

  useEffect(() => {
    setState(value || dateIntervalDefaultValue);
  }, [value]);

  return (
    <FormControl className={cls.join(' ')}>
      <div className="date-interval-field-control__dates">
        <DateFieldControl
          value={state.start}
          minDate={minDate}
          maxDate={state.end}
          onChange={setStartDate}
          error={error}
          helperText={null}
          className="date-interval-field-control__start"
          placeholder={placeholderStart}
          label={labelStart}
          {...other}
        />
        <MoreHorizIcon />
        <DateFieldControl
          value={state.end}
          minDate={state.start}
          maxDate={maxDate}
          onChange={setEndDate}
          error={error}
          helperText={null}
          className="date-interval-field-control__end"
          placeholder={placeholderEnd}
          label={labelEnd}
          {...other}
        />
      </div>
      {error && helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
