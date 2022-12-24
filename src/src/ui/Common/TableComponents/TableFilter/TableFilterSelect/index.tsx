import React, {useEffect, useState} from 'react';
import {useFilters} from '../../../../hooks/useFilters';
import {
  SelectFieldControl,
  SelectFieldControlProps,
} from '../../../FieldControls';
import {useRoute} from 'react-router5';
import {observer} from 'mobx-react-lite';
import './index.less';

export interface ITableFilterSelectProps extends SelectFieldControlProps {}

export const TableFilterSelect = observer((props: SelectFieldControlProps) => {
  const {name = ''} = props;
  const {filters, setFilter} = useFilters();
  const {route} = useRoute();

  const [value, setValue] = useState(filters[name]);

  const onChange = (
    e: React.ChangeEvent<{name?: string | undefined; value: unknown}>
  ) => {
    setFilters(e.target.value);
  };

  const setFilters = (value: unknown) => setFilter(name, value, route.name);

  // eslint-disable-next-line
  useEffect(() => setValue(filters[name] || ''), [filters[name]]);

  return <SelectFieldControl {...props} value={value} onChange={onChange} />;
});
