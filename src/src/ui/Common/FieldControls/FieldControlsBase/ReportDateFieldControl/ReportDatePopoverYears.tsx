import React, {Dispatch, SetStateAction, useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import {Button} from '@material-ui/core';
import {
  IReportDateValue,
  IReportDateYearsValue,
} from './ReportDateFieldControl';
import {
  getReportDateQuarterCurrent,
  isReportDateQuarterEmpty,
} from './ReportDatePopoverQuarters';

export interface IReportDatePopoverYearsProps {
  value: IReportDateValue;
  setValue: Dispatch<SetStateAction<IReportDateValue>>;
  minYear: number;
  maxYear: number;
  setCurrent?: boolean;
}

export const ReportDatePopoverYears = (props: IReportDatePopoverYearsProps) => {
  const {value, setValue, minYear, maxYear, setCurrent} = props;
  const [startClick, setStartClick] = useState<boolean>(true);

  const onClick = (year: number) => {
    const quarter =
      setCurrent && isReportDateQuarterEmpty(value)
        ? getReportDateQuarterCurrent()
        : value.quarter;

    if (startClick) {
      setStartClick(false);
      const newYear = {
        start: year,
        end: year,
      };
      setValue({
        quarter: quarter,
        year: newYear,
      });
    } else {
      setStartClick(true);
      const newYear = {
        start:
          value.year.start && year >= value.year.start
            ? value.year.start
            : year,
        end:
          value.year.start && year >= value.year.start
            ? year
            : value.year.start,
      };
      setValue({
        quarter: quarter,
        year: newYear,
      });
    }
  };

  const renderButtons = () => {
    const list = [];
    for (let i = minYear; i <= maxYear; i++) {
      list.push(i);
    }
    return list.map((item, i) => {
      const isSelected =
        value.year.start &&
        item >= value.year.start &&
        value.year.end &&
        item <= value.year.end;
      return (
        <Button
          key={i}
          onClick={() => {
            onClick(item);
          }}
          className={`${isSelected ? 'selected' : ''}`}
        >
          {item}
        </Button>
      );
    });
  };

  return (
    <FormControl component="fieldset" role="years">
      {renderButtons()}
    </FormControl>
  );
};

export const isReportDateYearsEmpty = (value: IReportDateValue): boolean => {
  return !value.year.start && !value.year.end;
};

export const getReportDateYearsCurrent = (): IReportDateYearsValue => {
  const today = new Date();
  return {
    start: today.getFullYear(),
    end: today.getFullYear(),
  };
};
