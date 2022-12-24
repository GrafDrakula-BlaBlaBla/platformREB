import React from 'react';
import {Statistics} from './Pages';
import {ROUTER_CONST_REB} from '../../app/settings/routerConst/RouterConstREB';

export const matchURLTo_Statistics_Component = (
  urlPath: string
): JSX.Element => {
  return mapUrlToComponents.get(urlPath);
};

const mapUrlToComponents = new Map().set(
  ROUTER_CONST_REB.STATISTICS.fullName,
  <Statistics />
);
