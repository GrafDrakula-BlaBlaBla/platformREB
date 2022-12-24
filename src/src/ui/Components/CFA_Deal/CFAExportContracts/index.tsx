import React, {useState} from 'react';
import {Current, Preliminary} from './Tabs';
import './index.less';
import {Switcher} from '../../../Common/SimpleComponents/Switcher';

enum SWITCHER_VALUE {
  CURRENT = 'current',
  PRELIMINARY = 'preliminary',
}

export const CFAExportContracts = () => {
  const [activeTab, setActiveTab] = useState<SWITCHER_VALUE>(
    SWITCHER_VALUE.CURRENT
  );

  const switcherItems = [
    {
      title: 'Действующие',
      value: SWITCHER_VALUE.CURRENT,
      selected: activeTab === SWITCHER_VALUE.CURRENT,
      onClick: () => setActiveTab(SWITCHER_VALUE.CURRENT),
    },
    {
      title: 'Предварительные',
      value: SWITCHER_VALUE.PRELIMINARY,
      selected: activeTab === SWITCHER_VALUE.PRELIMINARY,
      onClick: () => setActiveTab(SWITCHER_VALUE.PRELIMINARY),
    },
  ];

  // return <Current />;
  return (
    <React.Fragment>
      <div className="cfa-export-contracts__switcher">
        <Switcher items={switcherItems} />
      </div>
      {activeTab === SWITCHER_VALUE.CURRENT && <Current />}
      {activeTab === SWITCHER_VALUE.PRELIMINARY && <Preliminary />}
    </React.Fragment>
  );
};
