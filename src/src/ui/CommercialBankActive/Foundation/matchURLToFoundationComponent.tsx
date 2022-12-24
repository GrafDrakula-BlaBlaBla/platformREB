import React from 'react';
import {Foundation} from './Pages';
import {ROUTER_CONST_CB_ACTIVE} from '../../app/settings/routerConst/RouterConstCBActive';

export const matchURLToFoundationComponent = (urlPath: string): JSX.Element => {
  return mapUrlToComponents.get(urlPath);
};

const mapUrlToComponents = new Map().set(
  ROUTER_CONST_CB_ACTIVE.FOUNDATION.fullName,
  <Foundation />
);
