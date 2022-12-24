import React, {useEffect, useState} from 'react';
import {useFilters} from '../../../../hooks/useFilters';
import {ISelectItem, MultiSelectFieldControl} from '../../../FieldControls';
import {useRoute} from 'react-router5';
import {observer} from 'mobx-react-lite';
import './index.less';

export interface ITableFilterMultiSelectProps {
  name: string;
  label?: string;
  items: ISelectItem[];
}

export const TableFilterMultiSelect = observer(
  (props: ITableFilterMultiSelectProps) => {
    const {name} = props;
    const {filters, setFilter} = useFilters();
    const {route} = useRoute();

    const [value, setValue] = useState<string[]>(filters[name]);

    const onChange = (
      e: React.ChangeEvent<{name?: string; value: unknown}>
    ) => {
      setFilters(e.target.value as string[]);
    };

    const setFilters = (value: unknown[]) => {
      setFilter(name, value, route.name);
    };

    // eslint-disable-next-line
    useEffect(() => setValue(filters[name]), [filters[name]]);

    return (
      <MultiSelectFieldControl
        {...props}
        value={value || []}
        onChange={onChange}
      />
    );
  }
);
