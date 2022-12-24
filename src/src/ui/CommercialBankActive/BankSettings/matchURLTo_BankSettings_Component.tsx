import React from 'react';
import {BankSettings} from './Pages/BankSettings';
import {ROUTER_CONST_CB_ACTIVE} from '../../app/settings/routerConst/RouterConstCBActive';

export const matchURLTo_BankSettings_Component = (
  urlPath: string
): JSX.Element => {
  return mapUrlToComponents.get(urlPath);
};

const mapUrlToComponents = new Map().set(
  ROUTER_CONST_CB_ACTIVE.BANK_SETTINGS.fullName,
  <BankSettings />
);
