import React from 'react';
import {TabsHeader} from '../TabsHeader';
import {TabsPanels} from '../TabsPanels';
import './index.less';

export type TTabType = 'default' | 'table' | 'footer' | 'chat';

export interface ITabProps {
  label: string;
  value: string;
  hide?: boolean;
  disabled?: boolean;
  className?: string;
  content?: any;
  type?: TTabType;
}
export interface ITabsProps {
  onChangeTab: (_: React.ChangeEvent<{}>, newValue: string) => void;
  tabs: ITabProps[];
  activeTab: string;
}

export function Tabs(props: ITabsProps) {
  return (
    <div className="tabs">
      <TabsHeader {...props} />
      <TabsPanels {...props} />
    </div>
  );
}
