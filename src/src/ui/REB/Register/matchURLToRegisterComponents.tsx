import React from 'react';
import {RegisterTablePage, RegisterDetails} from './Pages';
import {ROUTER_CONST_REB} from '../../app/settings/routerConst/RouterConstREB';

export function matchURLToRegisterComponent(urlPath: string): JSX.Element {
  return mapUrlToComponents.get(urlPath);
}

const mapUrlToComponents = new Map()
  .set(ROUTER_CONST_REB.REGISTRIES.fullName, <RegisterTablePage />)
  .set(ROUTER_CONST_REB.REGISTRIES.DETAILS.fullName, <RegisterDetails />);
