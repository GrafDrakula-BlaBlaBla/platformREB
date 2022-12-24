import React, {useEffect, useState} from 'react';
import {useFilters} from '../../../../hooks/useFilters';
import {ReportDateFieldControl, IReportDateValue} from '../../../FieldControls';
import {useRoute} from 'react-router5';
import {observer} from 'mobx-react-lite';
import './index.less';

export interface ITableFilterReportDateProps {
  nameQuarter: string;
  nameYearStart: string;
  nameYearEnd: string;
}

const toValue = (quarter?: string, start?: number, end?: number) => {
  return {
    quarter: quarter,
    year: {start: start, end: end},
  };
};

export const TableFilterReportDate = observer(
  (props: ITableFilterReportDateProps) => {
    const {nameQuarter, nameYearStart, nameYearEnd} = props;
    const {filters, setFilterObject} = useFilters();
    const {route} = useRoute();

    const [value, setValue] = useState<IReportDateValue>(
      toValue(
        filters[nameQuarter],
        filters[nameYearStart],
        filters[nameYearEnd]
      )
    );

    const onChange = (value: IReportDateValue) => {
      setFilters(value);
    };

    const setFilters = (value: IReportDateValue) => {
      const obj: Record<string, any> = {};
      if (value.quarter && value.year.start && value.year.end) {
        obj[nameQuarter] = value.quarter;
        obj[nameYearStart] = value.year.start;
        obj[nameYearEnd] = value.year.end;
      } else {
        if (filters[nameQuarter]) obj[nameQuarter] = null;
        if (filters[nameYearStart]) obj[nameYearStart] = null;
        if (filters[nameYearEnd]) obj[nameYearEnd] = null;
      }
      setFilterObject(obj, route.name);
    };

    useEffect(() => {
      setValue(
        toValue(
          filters[nameQuarter],
          filters[nameYearStart],
          filters[nameYearEnd]
        )
      );
      // eslint-disable-next-line
    }, [filters]);

    return (
      <ReportDateFieldControl
        value={value}
        onChange={onChange}
        placeholder="Квартал Год"
      />
    );
  }
);
