import React, {useState} from 'react';
import useUpdateEffect from '../../../../hooks/useUpdateEffect';
import {TModify} from '../../../../../Utils/TS/TModify';
import {ReactComponent as CalendarIcon} from '../../../../../assets/svg/commonArea/CalendarIcon.svg';
import {TextFieldProps} from '@material-ui/core/TextField/TextField';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from '@material-ui/core';
import {ReportDatePopover} from './ReportDatePopover';

export interface IReportDateYearsValue {
  start?: number;
  end?: number;
}

export interface IReportDateValue {
  quarter?: string;
  year: IReportDateYearsValue;
}

export interface ReportDateFieldControlProps
  extends TModify<
    TextFieldProps,
    {
      value?: IReportDateValue;
      onChange?: (value: IReportDateValue) => void;
      setCurrent?: boolean;
    }
  > {}

export const reportDateDefaultValues: IReportDateValue = {
  quarter: undefined,
  year: {
    start: undefined,
    end: undefined,
  },
};

export const getReportDateDisplayValue = (value?: IReportDateValue) => {
  let displayValue = '';
  if (value) {
    displayValue = `${value.quarter ? `${value.quarter} кв` : ''}${
      value.quarter && (value.year.start || value.year.end) ? `, ` : ''
    }${
      !value.year.start && !value.year.end
        ? ''
        : `${value.year.start}${
            value.year.start &&
            value.year.end &&
            value.year.start < value.year.end
              ? ` - ${value.year.end}`
              : ''
          }`
    }`;
  }
  return displayValue;
};

export const ReportDateFieldControl = (props: ReportDateFieldControlProps) => {
  const {
    value,
    onChange,
    className,
    variant,
    error,
    helperText,
    setCurrent = true,
    ...other
  } = props;

  const [state, setState] = useState<IReportDateValue>(
    value || reportDateDefaultValues
  );
  const [hasData, setHasData] = useState<boolean>(
    Boolean(getReportDateDisplayValue(value))
  );
  const [triggerChange, setTriggerChange] = useState<boolean>(true);

  const cls = [
    'report-date-field-control',
    'field-control',
    'field-control_is-edit',
  ];
  if (className) cls.push(className);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const el = event.currentTarget?.parentElement?.parentElement;
    setAnchorEl(el || null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  useUpdateEffect(() => {
    setHasData(Boolean(getReportDateDisplayValue(state)));
    if (onChange && triggerChange) {
      onChange(state);
    }
    setTriggerChange(true);
  }, [state]);

  const minYear = 2021;
  const maxYear = new Date().getFullYear();

  const clearYearEnd = () => {
    const value = {...state};
    value.year.end = value.year.start;
    setState(value);
  };

  const clearYearStart = () => {
    const value = {...state};
    value.year.start = undefined;
    value.year.end = undefined;
    setState(value);
  };

  const clearQuarter = () => {
    const value = {...state};
    value.quarter = '';
    setState(value);
  };

  const erase = () => {
    if (state.year.end && state.year.start) {
      if (state.year.end > state.year.start) {
        clearYearEnd();
      } else {
        clearYearStart();
      }
    } else if (state.quarter) {
      clearQuarter();
    }
  };

  const eraseAll = () => {
    setState(reportDateDefaultValues);
  };

  useUpdateEffect(() => {
    setTriggerChange(false);
    setState(value || reportDateDefaultValues);
  }, [value]);

  return (
    <FormControl
      className={
        hasData
          ? cls.join(' ')
          : cls.concat(['field-control_no-data']).join(' ')
      }
    >
      <TextField
        {...other}
        value={getReportDateDisplayValue(state)}
        variant="outlined"
        onKeyDown={(e) => {
          if (e.key === 'Backspace') {
            if (setCurrent) {
              eraseAll();
            } else {
              erase();
            }
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClick} edge="end">
                <CalendarIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={!!error}
      />
      <ReportDatePopover
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        onClose={handleClose}
        open={open}
        value={state}
        setValue={setState}
        minYear={minYear}
        maxYear={maxYear}
        setCurrent={setCurrent}
      />
      {error && helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
