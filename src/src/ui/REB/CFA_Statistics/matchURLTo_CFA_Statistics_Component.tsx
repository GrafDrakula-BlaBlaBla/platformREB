import React from 'react';
import {ROUTER_CONST_REB} from '../../app/settings/routerConst/RouterConstREB';
import {Statistics} from './Pages';

export const matchURLTo_CFA_Statistics_Component = (
  urlPath: string
): JSX.Element => {
  return mapUrlToComponents.get(urlPath);
};

const mapUrlToComponents = new Map().set(
  ROUTER_CONST_REB.CREDIT_FOR_ACCREDITIVE.fullName,
  <Statistics />
);
