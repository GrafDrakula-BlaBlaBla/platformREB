import React from 'react';
import {ITabsProps} from '../Tabs';
import {TabsPanel} from '../TabsPanel';

export function TabsPanels(props: ITabsProps) {
  const {tabs, activeTab} = props;
  return (
    <React.Fragment>
      {tabs.map((tab) => {
        return tab.hide ? null : (
          <TabsPanel
            key={tab.value}
            active={tab.value === activeTab}
            className={tab.className}
            type={tab.type}
          >
            {tab.content}
          </TabsPanel>
        );
      })}
    </React.Fragment>
  );
}
