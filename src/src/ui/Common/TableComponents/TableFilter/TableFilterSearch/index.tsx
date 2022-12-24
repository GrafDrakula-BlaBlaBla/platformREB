import React, {useState, KeyboardEvent, useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import {InputAdornment} from '@material-ui/core';
import {TextFieldControl, TextFieldControlProps} from '../../../FieldControls';
import {useFilters} from '../../../../hooks/useFilters';
import {useRoute} from 'react-router5';
import {observer} from 'mobx-react-lite';
import './index.less';

export const TableFilterSearch = observer((props: TextFieldControlProps) => {
  const {name = '', ...otherProps} = props;
  const {filters, setFilter} = useFilters();
  const {route} = useRoute();

  const [value, setValue] = useState<string>(filters[name]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') setFilters();
  };

  const setFilters = () => setFilter(name, value, route.name);

  // eslint-disable-next-line
  useEffect(() => setValue(filters[name] || ''), [filters[name]]);

  return (
    <TextFieldControl
      value={value}
      className="table-filter-search"
      placeholder="Поиск"
      onChange={onChange}
      onKeyDown={onKeyDown}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={setFilters} edge="end">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...otherProps}
    />
  );
});
