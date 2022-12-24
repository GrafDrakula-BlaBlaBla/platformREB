import React from 'react';
import {TMenuConfig} from './MenuConfig';
import {ReactComponent as AccreditationIcon} from '../../../../assets/svg/menu/Accreditation.svg';
import {ReactComponent as HomeIcon} from '../../../../assets/svg/menu/Home.svg';
import {ROUTER_CONST_CB} from '../routerConst/RouterConstCB';

export const MENU_CONFIG_CB: TMenuConfig = [
  {
    id: 1,
    parentId: null,
    title: 'Главная',
    path: ROUTER_CONST_CB.HOME.fullName,
    logo: <HomeIcon />,
    permission: 'home',
  },
  {
    id: 2,
    parentId: null,
    title: 'Аккредитация',
    path: ROUTER_CONST_CB.ACCREDITATION.fullName,
    logo: <AccreditationIcon />,
    permission: 'accreditation',
  },
];
