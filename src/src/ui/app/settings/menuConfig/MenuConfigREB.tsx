import React from 'react';
import {TMenuConfig} from './MenuConfig';
import {ROUTER_CONST_REB} from '../routerConst/RouterConstREB';
import {ReactComponent as Report} from '../../../../assets/svg/menu/Report.svg';
import {ReactComponent as CreditForAccreditive} from '../../../../assets/svg/menu/CreditForAccreditive.svg';
import {ReactComponent as AccreditationIcon} from '../../../../assets/svg/menu/Accreditation.svg';
import {ReactComponent as RegistryIcon} from '../../../../assets/svg/menu/Registry.svg';
import {ReactComponent as HomeIcon} from '../../../../assets/svg/menu/Home.svg';
import {ReactComponent as Statistics} from '../../../../assets/svg/menu/Statistics.svg';
import {ReactComponent as UsersIcon} from '../../../../assets/svg/menu/Users.svg';

export const MENU_CONFIG_REB: TMenuConfig = [
  {
    id: 1,
    parentId: null,
    title: 'Главная',
    path: ROUTER_CONST_REB.HOME.fullName,
    logo: <HomeIcon />,
    permission: 'home',
  },
  {
    id: 2,
    parentId: null,
    title: 'Аккредитация',
    path: ROUTER_CONST_REB.ACCREDITATION.BANKS.fullName,
    nestedPaths: [
      ROUTER_CONST_REB.ACCREDITATION.fullName,
      ROUTER_CONST_REB.ACCREDITATION.DETAILS.fullName,
    ],
    logo: <AccreditationIcon />,
    permission: 'accreditation',
  },
  {
    id: 3,
    parentId: null,
    title: 'Пользователи',
    path: ROUTER_CONST_REB.USERS.fullName,
    logo: <UsersIcon />,
    permission: 'users',
  },
  {
    id: 4,
    parentId: null,
    title: 'Реестры',
    path: ROUTER_CONST_REB.REGISTRIES.fullName,
    logo: <RegistryIcon />,
    permission: 'foundation/registers',
  },
  {
    id: 5,
    parentId: null,
    title: 'Отчеты',
    path: ROUTER_CONST_REB.REPORTS.fullName,
    logo: <Report />,
    permission: 'foundation/report',
  },
  {
    id: 6,
    parentId: null,
    title: `Кредит\r\nпод аккредитив`,
    path: ROUTER_CONST_REB.CFA_BANKS.fullName,
    nestedPaths: [
      ROUTER_CONST_REB.CFA_DEAL.fullName,
      ROUTER_CONST_REB.CFA_DEAL.DETAILS.fullName,
      ROUTER_CONST_REB.CFA_REPORTS.fullName,
      ROUTER_CONST_REB.CFA_REPORTS.DETAILS_GENERAL_AGREEMENT.fullName,
      ROUTER_CONST_REB.CFA_REPORTS.DETAILS_CREDIT_CONTRACT.fullName,
    ],
    logo: <CreditForAccreditive />,
    permission: 'credit-for-accreditive',
  },
  {
    id: 9,
    parentId: null,
    title: `Статистика`,
    path: ROUTER_CONST_REB.STATISTICS.fullName,
    logo: <Statistics />,
    permission: 'statistics',
  },
];
