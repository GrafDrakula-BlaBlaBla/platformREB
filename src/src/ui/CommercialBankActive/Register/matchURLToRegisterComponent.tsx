import React from 'react';
import {TableRegisters, RegisterDetails} from './Page';
import {ROUTER_CONST_CB_ACTIVE} from '../../app/settings/routerConst/RouterConstCBActive';

export function matchURLToRegisterComponent(urlPath: string): JSX.Element {
  return mapUrlToComponents.get(urlPath);
}

const mapUrlToComponents = new Map()
  .set(ROUTER_CONST_CB_ACTIVE.REGISTRIES.fullName, <TableRegisters />)
  .set(ROUTER_CONST_CB_ACTIVE.REGISTRIES.DETAILS.fullName, <RegisterDetails />);
