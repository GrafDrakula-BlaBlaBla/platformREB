import React from 'react';
import {Dashboard} from '../../../../Components/Dashboard';
import {StatisticsFilter} from '../../../../Components/Statistics/StatisticsFilter';

export const Statistics = () => {
  return (
    <Dashboard
      title="Статистика"
      settingsKey="WidgetsReb"
      filterComponent={<StatisticsFilter />}
    />
  );
};
