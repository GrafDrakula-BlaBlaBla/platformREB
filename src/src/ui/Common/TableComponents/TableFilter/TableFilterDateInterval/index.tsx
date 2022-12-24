import React, {useEffect, useState} from 'react';
import {format, isValid, parse} from 'date-fns';
import {useFilters} from '../../../../hooks/useFilters';
import {
  DateIntervalFieldControl,
  IDateIntervalValue,
} from '../../../FieldControls';
import {useRoute} from 'react-router5';
import {observer} from 'mobx-react-lite';
import './index.less';

export interface ITableFilterDateIntervalProps {
  nameYearStart: string;
  nameYearEnd: string;
}

const toValue = (start?: string, end?: string) => {
  return {
    start: start ? parse(start, 'dd.MM.yyyy', new Date()) : undefined,
    end: end ? parse(end, 'dd.MM.yyyy', new Date()) : undefined,
  };
};

export const TableFilterDateInterval = observer(
  (props: ITableFilterDateIntervalProps) => {
    const {nameYearStart, nameYearEnd} = props;
    const {filters, setFilterObject} = useFilters();
    const {route} = useRoute();

    const [value, setValue] = useState<IDateIntervalValue>(
      toValue(filters[nameYearStart], filters[nameYearEnd])
    );

    const onChange = (value: IDateIntervalValue) => {
      setFilters(value);
    };

    const setFilters = (value: IDateIntervalValue) => {
      const startDate =
        value.start && isValid(value.start)
          ? format(value.start, 'dd.MM.yyyy')
          : undefined;
      const endDate =
        value.end && isValid(value.end)
          ? format(value.end, 'dd.MM.yyyy')
          : undefined;

      const obj: Record<string, any> = {};
      if (startDate !== filters[nameYearStart]) obj[nameYearStart] = startDate;
      if (endDate !== filters[nameYearEnd]) obj[nameYearEnd] = endDate;
      setFilterObject(obj, route.name);
    };

    useEffect(() => {
      setValue(toValue(filters[nameYearStart], filters[nameYearEnd]));
      // eslint-disable-next-line
    }, [filters]);

    return (
      <DateIntervalFieldControl
        className="table-filter-date-interval"
        value={value}
        onChange={onChange}
        placeholderStart={'С'}
        placeholderEnd={'По'}
      />
    );
  }
);
