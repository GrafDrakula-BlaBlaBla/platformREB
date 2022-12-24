import {Button, IconButton, Popover, PopoverProps} from '@material-ui/core';
import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {ReportDatePopoverQuarters} from './ReportDatePopoverQuarters';
import {ReportDatePopoverYears} from './ReportDatePopoverYears';
import {IReportDateValue} from './ReportDateFieldControl';

export interface IReportDatePopoverProps extends PopoverProps {
  anchorEl: HTMLElement | null;
  setAnchorEl: Dispatch<SetStateAction<HTMLElement | null>>;
  onClose: () => void;
  value: IReportDateValue;
  setValue: Dispatch<SetStateAction<IReportDateValue>>;
  minYear: number;
  maxYear: number;
  setCurrent?: boolean;
}

export const ReportDatePopover = (props: IReportDatePopoverProps) => {
  const {
    anchorEl,
    onClose,
    open,
    value,
    setValue,
    minYear,
    maxYear,
    setCurrent,
  } = props;

  const setYearsBefore = () => {
    if (value.year.start && value.year.end) {
      const newYear = {
        start: value.year.start - 1,
        end: value.year.end - 1,
      };
      setValue({...value, ...{year: newYear}});
    }
  };
  const setYearsAfter = () => {
    if (value.year.start && value.year.end) {
      const newYear = {
        start: value.year.start + 1,
        end: value.year.end + 1,
      };
      setValue({...value, ...{year: newYear}});
    }
  };

  const [isYears, setIsYears] = useState<boolean>(false);
  const toggleIsYears = () => {
    setIsYears(!isYears);
  };

  const popoverHeaderValue = `${
    !value.year.start && !value.year.end
      ? 'Год не выбран'
      : `${value.year.start}${
          value.year.start &&
          value.year.end &&
          value.year.start < value.year.end
            ? ` - ${value.year.end}`
            : ''
        }`
  }`;

  useEffect(
    () => () => {
      if (!open) {
        setIsYears(false);
      }
    },
    [open]
  );

  return (
    <Popover
      id={open ? 'simple-popover' : undefined}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
      transformOrigin={{vertical: -8, horizontal: 'left'}}
      className="report-date-field-control__popover"
    >
      <div className="report-date-field-control__popover-root">
        <div className="report-date-field-control__popover-title">
          <IconButton
            onClick={setYearsBefore}
            disabled={!value.year.start || value.year.start <= minYear}
            role="btn-prev"
          >
            <ChevronLeftIcon />
          </IconButton>
          <Button
            className="report-date-field-control__popover-current"
            onClick={toggleIsYears}
            role="btn-curr"
          >
            {popoverHeaderValue}
          </Button>
          <IconButton
            onClick={setYearsAfter}
            disabled={!value.year.end || value.year.end >= maxYear}
            role="btn-next"
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
        <div className="report-date-field-control__popover-content">
          {isYears ? (
            <div className="report-date-field-control__popover-years">
              <ReportDatePopoverYears
                value={value}
                setValue={setValue}
                minYear={minYear}
                maxYear={maxYear}
                setCurrent={setCurrent}
              />
            </div>
          ) : (
            <div className="report-date-field-control__popover-quarters">
              <ReportDatePopoverQuarters
                value={value}
                setValue={setValue}
                setCurrent={setCurrent}
              />
            </div>
          )}
        </div>
      </div>
    </Popover>
  );
};
