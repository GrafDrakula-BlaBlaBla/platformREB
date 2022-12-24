import React from 'react';
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab';
import './index.less';
import {ClassNameInjection} from '../../../../Utils/ClassNames/ClassNameInjection';

interface IProps {
  activeValue: string | number | boolean;
  onChange: (_: React.MouseEvent<{}>, value: string) => void;
  items: IToggleButtonConfig[];
  className?: string;
}

export interface IToggleButtonConfig {
  value: string | number | boolean;
  label: string | JSX.Element;
}

export const Toggle = ({activeValue, onChange, items, className}: IProps) => {
  return (
    <ToggleButtonGroup
      size="small"
      className={ClassNameInjection(className, 'toggle-button-group')}
      value={activeValue}
      exclusive
      onChange={onChange}
    >
      {items.map((item) => (
        <ToggleButton
          key={item.value.toString()}
          className="toggle-button-item"
          value={item.value}
        >
          {item.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
