import React, {useEffect} from 'react';
import {observer} from 'mobx-react-lite';
import useViewModel from '../../../hooks/useViewModel';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {IDashboardViewModel} from '../../../../ViewModel/viewModels/Dashboard/interfaces';
import {DashboardHeader} from '../DashboardHeader';
import {DashboardFilter} from '../DashboardFilter';
import {DashboardContent} from '../DashboardContent';
import {TWidgetSettingName} from '../../../../Model/Dashboard';
import '../react-grid.less';
import './index.less';

export interface IDashboardProps {
  title: string;
  settingsKey: TWidgetSettingName;
  className?: string;
  filterComponent?: JSX.Element;
}

export const Dashboard = observer((props: IDashboardProps) => {
  const {title, settingsKey, className, filterComponent} = props;
  const {setSettingsKey, getItems, setItems, isEdit} = useViewModel<
    IDashboardViewModel
  >(VIEW_MODEL.Dashboard);

  const cls = ['dashboard'];
  if (isEdit) cls.push('dashboard_backdrop');
  if (className) cls.push(className);

  useEffect(() => {
    setSettingsKey(settingsKey);
    getItems();

    return () => setItems();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={cls.join(' ')}>
      <DashboardHeader title={title} />
      {Boolean(filterComponent) && (
        <DashboardFilter>{filterComponent}</DashboardFilter>
      )}
      <DashboardContent />
    </div>
  );
});
