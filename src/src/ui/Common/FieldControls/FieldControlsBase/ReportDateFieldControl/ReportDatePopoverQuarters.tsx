import React, {Dispatch, SetStateAction} from 'react';
import {IReportDateValue} from './ReportDateFieldControl';
import {IRadioItem, RadioGroupFieldControl} from '../RadioGroupFieldControl';
import {
  getReportDateYearsCurrent,
  isReportDateYearsEmpty,
} from './ReportDatePopoverYears';

export interface IReportDatePopoverQuartersProps {
  value: IReportDateValue;
  setValue: Dispatch<SetStateAction<IReportDateValue>>;
  setCurrent?: boolean;
}

export const ReportDatePopoverQuarters = ({
  value,
  setValue,
  setCurrent,
}: IReportDatePopoverQuartersProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year =
      setCurrent && isReportDateYearsEmpty(value)
        ? getReportDateYearsCurrent()
        : value.year;

    setValue({
      quarter: (event.target as HTMLInputElement).value,
      year: year,
    });
  };

  const items: IRadioItem[] = [
    {label: '1 квартал', value: '1'},
    {label: '1, 2 квартал', value: '2'},
    {label: '1, 2, 3 квартал', value: '3'},
    {label: '1, 2, 3, 4 квартал', value: '4'},
  ];

  return (
    <RadioGroupFieldControl
      items={items}
      value={value.quarter || ''}
      onChange={handleChange}
    />
  );
};

export const isReportDateQuarterEmpty = (value: IReportDateValue): boolean => {
  return !value.quarter;
};

export const getReportDateQuarterCurrent = (): string => {
  const today = new Date();
  return Math.floor((today.getMonth() + 3) / 3).toString();
};
