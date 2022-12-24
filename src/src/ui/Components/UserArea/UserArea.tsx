import React, {useContext} from 'react';
import {useRoute} from 'react-router5';
import {PageLayout} from '../../Common/PageLayout';
import {ITabProps, Tabs} from '../../Common/TabsComponents';
import {AboutBank} from './AboutBank';
import {UserInstructionForm} from '../Forms/User/UserInstructionForm';
import {UserProfileViewForm} from '../Forms';
import {ROUTER_CONST_BASE} from '../../app/settings/routerConst/RouterConstBase';
import PermissionContext from '../../app/contexts/PremissionContext';
import {EUserAreaTabs} from '../../app/settings/routes/routesBase';

export const UserArea = () => {
  const {isAccess} = useContext(PermissionContext);
  const {
    route: {params},
    router,
  } = useRoute();

  const activeTab = params.tab;

  const handleTabTransfer = (_: React.ChangeEvent<{}>, newValue: string) => {
    router.navigate(ROUTER_CONST_BASE.USER_AREA.fullName, {
      tab: newValue,
    });
  };

  const config: ITabProps[] = [
    {
      label: 'О банке',
      value: EUserAreaTabs.AboutBank,
      content: <AboutBank />,
    },
    {
      label: 'Профиль',
      value: EUserAreaTabs.Profile,
      content: <UserProfileViewForm />,
      hide: isAccess('users', 'bank'),
    },
    {
      label: 'Инструкция пользователя',
      value: EUserAreaTabs.Instruction,
      content: <UserInstructionForm />,
    },
  ];

  return (
    <PageLayout title="Личный кабинет пользователя" type="tabs">
      <Tabs
        tabs={config}
        activeTab={activeTab}
        onChangeTab={handleTabTransfer}
      />
    </PageLayout>
  );
};
