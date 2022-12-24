import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {IconButton, InputAdornment} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import {TextFieldControl} from '../../../../Common/FieldControls';
import {ClassNameInjection} from '../../../../../Utils/ClassNames/ClassNameInjection';
import './index.less';

interface IProps {
  className?: string;
  onSearch?: (searchStr: string) => void;
}

export const Search: FC<IProps> = ({className, onSearch}) => {
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(e.target.value);
    if (!e.target.value) {
      onSearch?.('');
    }
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
    }
  };
  const onClick = () => {
    onSearch?.(value);
  };

  return (
    <TextFieldControl
      className={ClassNameInjection('table-filter-search', className)}
      placeholder="Поиск"
      onChange={onChange}
      onKeyDown={onKeyDown}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onClick} edge="end">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
