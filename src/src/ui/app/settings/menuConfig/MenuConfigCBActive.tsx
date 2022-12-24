import React from 'react';
import {TMenuConfig} from './MenuConfig';
import {ROUTER_CONST_CB_ACTIVE} from '../routerConst/RouterConstCBActive';
import {ReactComponent as Report} from '../../../../assets/svg/menu/Report.svg';
import {ReactComponent as CreditForAccreditive} from '../../../../assets/svg/menu/CreditForAccreditive.svg';
import {ReactComponent as HomeIcon} from '../../../../assets/svg/menu/Home.svg';
import {ReactComponent as FoundationIcon} from '../../../../assets/svg/menu/Foundation.svg';
import {ReactComponent as CreditIcon} from '../../../../assets/svg/menu/Credit.svg';
import {ReactComponent as RegistryIcon} from '../../../../assets/svg/menu/Registry.svg';
import {ReactComponent as AccreditationIcon} from '../../../../assets/svg/menu/Accreditation.svg';
import {ReactComponent as Statistics} from '../../../../assets/svg/menu/Statistics.svg';
import {ReactComponent as BankSettings} from '../../../../assets/svg/menu/BankSettings.svg';
import {ReactComponent as UsersIcon} from '../../../../assets/svg/menu/Users.svg';

export const MENU_CONFIG_CB_ACTIVE: TMenuConfig = [
  {
    id: 1,
    parentId: null,
    title: 'Главная',
    path: ROUTER_CONST_CB_ACTIVE.HOME.fullName,
    logo: <HomeIcon />,
    permission: 'home',
  },
  {
    id: 2,
    parentId: null,
    title: 'Аккредитация',
    path: ROUTER_CONST_CB_ACTIVE.ACCREDITATION.fullName,
    nestedPaths: [ROUTER_CONST_CB_ACTIVE.ACCREDITATION.DETAILS.fullName],
    logo: <AccreditationIcon />,
    permission: 'accreditation',
  },
  {
    id: 3,
    parentId: null,
    title: 'Пользователи',
    path: ROUTER_CONST_CB_ACTIVE.USERS.fullName,
    logo: <UsersIcon />,
    permission: 'users',
  },
  {
    id: 4,
    parentId: null,
    title: 'Фондирование',
    path: ROUTER_CONST_CB_ACTIVE.FOUNDATION.fullName,
    logo: <FoundationIcon />,
    permission: 'foundation',
  },
  {
    id: 5,
    parentId: 4,
    title: 'Кредиты',
    path: ROUTER_CONST_CB_ACTIVE.CREDITS.fullName,
    logo: <CreditIcon />,
    permission: 'foundations/credits',
  },
  {
    id: 6,
    parentId: 4,
    title: 'Реестры',
    path: ROUTER_CONST_CB_ACTIVE.REGISTRIES.fullName,
    logo: <RegistryIcon />,
    permission: 'foundation/registers',
  },
  {
    id: 7,
    parentId: 4,
    title: 'Отчеты',
    path: ROUTER_CONST_CB_ACTIVE.REPORTS.fullName,
    logo: <Report />,
    permission: 'foundation/reports',
  },
  {
    id: 8,
    parentId: null,
    title: `Кредит\r\nпод аккредитив`,
    path: ROUTER_CONST_CB_ACTIVE.CREDIT_FOR_ACCREDITIVE.fullName,
    nestedPaths: [
      ROUTER_CONST_CB_ACTIVE.CFA_DEAL.fullName,
      ROUTER_CONST_CB_ACTIVE.CFA_DEAL.DETAILS.fullName,
      ROUTER_CONST_CB_ACTIVE.CFA_REPORTS.fullName,
      ROUTER_CONST_CB_ACTIVE.CFA_REPORTS.DETAILS_CREDIT_CONTRACT.fullName,
      ROUTER_CONST_CB_ACTIVE.CFA_REPORTS.DETAILS_GENERAL_AGREEMENT.fullName,
    ],
    redirect: ROUTER_CONST_CB_ACTIVE.CFA_DEAL.fullName,
    logo: <CreditForAccreditive />,
    permission: 'credit-for-accreditive',
  },

  {
    id: 13,
    parentId: null,
    title: `Статистика`,
    path: ROUTER_CONST_CB_ACTIVE.STATISTICS.fullName,
    logo: <Statistics />,
    permission: 'statistics',
  },
  {
    id: 14,
    parentId: null,
    title: `Настройки банка`,
    path: ROUTER_CONST_CB_ACTIVE.BANK_SETTINGS.fullName,
    logo: <BankSettings />,
    permission: 'bank-settings',
  },
];
