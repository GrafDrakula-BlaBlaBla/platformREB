import React from 'react';
import {TableRequest, AccreditationDetails} from './index';
import {ROUTER_CONST_CB} from '../../app/settings/routerConst/RouterConstCB';

export function matchURLToAccreditationComponent(urlPath: string): JSX.Element {
  return mapUrlToComponents.get(urlPath);
}

const mapUrlToComponents = new Map()
  .set(ROUTER_CONST_CB.ACCREDITATION.fullName, <TableRequest />)
  .set(
    ROUTER_CONST_CB.ACCREDITATION.DETAILS.fullName,
    <AccreditationDetails />
  );
