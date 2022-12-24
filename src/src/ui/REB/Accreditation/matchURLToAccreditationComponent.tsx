import React from 'react';
import {TableRequest, AccreditationDetails, TableBanks} from './index';
import {ROUTER_CONST_REB} from '../../app/settings/routerConst/RouterConstREB';

export function matchURLToAccreditationComponent(urlPath: string): JSX.Element {
  return mapUrlToComponents.get(urlPath);
}

const mapUrlToComponents = new Map()
  .set(ROUTER_CONST_REB.ACCREDITATION.fullName, <TableRequest />)
  .set(
    ROUTER_CONST_REB.ACCREDITATION.DETAILS.fullName,
    <AccreditationDetails />
  )
  .set(ROUTER_CONST_REB.ACCREDITATION.BANKS.fullName, <TableBanks />);
