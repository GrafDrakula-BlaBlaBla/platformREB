import React from 'react';
import {Statistics} from './Pages';
import {ROUTER_CONST_CB_ACTIVE} from '../../app/settings/routerConst/RouterConstCBActive';

export const matchURLTo_Statistics_Component = (
  urlPath: string
): JSX.Element => {
  return mapUrlToComponents.get(urlPath);
};

const mapUrlToComponents = new Map().set(
  ROUTER_CONST_CB_ACTIVE.STATISTICS.fullName,
  <Statistics />
);
