import React from 'react';
import './index.less';
import {TTabType} from '../Tabs';

export interface ITabPanelProps {
  active: boolean;
  className?: string;
  children?: React.ReactNode;
  type?: TTabType;
}

export function TabsPanel(props: ITabPanelProps) {
  const {children, active, className, type = 'default'} = props;
  const cls = ['tabs__panel', `tabs__panel_${type}`];
  if (active) cls.push('tabs__panel_active');
  if (className) cls.push(className);
  return (
    <div className={cls.join(' ')} hidden={!active}>
      {active && children}
    </div>
  );
}
