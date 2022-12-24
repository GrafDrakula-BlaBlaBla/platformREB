import React from 'react';
import {TableCredits} from './Pages';
import {ROUTER_CONST_CB_ACTIVE} from '../../app/settings/routerConst/RouterConstCBActive';

export const matchURLToCreditComponent = (urlPath: string): JSX.Element => {
  return mapUrlToComponents.get(urlPath);
};

const mapUrlToComponents = new Map().set(
  ROUTER_CONST_CB_ACTIVE.CREDITS.fullName,
  <TableCredits />
);
