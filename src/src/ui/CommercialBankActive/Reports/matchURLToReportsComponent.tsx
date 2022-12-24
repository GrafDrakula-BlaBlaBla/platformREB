import React from 'react';
import {ReportDetails, TableReports} from './Pages';
import {ROUTER_CONST_CB_ACTIVE} from '../../app/settings/routerConst/RouterConstCBActive';

export function matchURLToReportsComponent(urlPath: string): JSX.Element {
  return mapUrlToComponents.get(urlPath);
}

const mapUrlToComponents = new Map()
  .set(ROUTER_CONST_CB_ACTIVE.REPORTS.fullName, <TableReports />)
  .set(ROUTER_CONST_CB_ACTIVE.REPORTS.DETAILS.fullName, <ReportDetails />);
