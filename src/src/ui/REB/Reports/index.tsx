import React from 'react';
import {ReportDetails} from './Pages';
import {TableReports} from './Pages';
import {ROUTER_CONST_REB} from '../../app/settings/routerConst/RouterConstREB';

export function matchURLToReportsComponent(urlPath: string): JSX.Element {
  return mapUrlToComponents.get(urlPath);
}

const mapUrlToComponents = new Map()
  .set(ROUTER_CONST_REB.REPORTS.fullName, <TableReports />)
  .set(ROUTER_CONST_REB.REPORTS.DETAILS.fullName, <ReportDetails />);
