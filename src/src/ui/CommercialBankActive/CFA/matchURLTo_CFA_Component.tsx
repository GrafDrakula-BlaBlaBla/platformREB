import React from 'react';
import {ROUTER_CONST_CB_ACTIVE} from '../../app/settings/routerConst/RouterConstCBActive';
import {CFADetails, ReportDetails, TableItems} from './Pages';

export const matchURLTo_CFA_Component = (urlPath: string): JSX.Element => {
  return mapUrlToComponents.get(urlPath);
};

const mapUrlToComponents = new Map()
  .set(ROUTER_CONST_CB_ACTIVE.CFA_DEAL.fullName, <TableItems />)
  .set(ROUTER_CONST_CB_ACTIVE.CFA_DEAL.DETAILS.fullName, <CFADetails />)
  .set(ROUTER_CONST_CB_ACTIVE.CFA_REPORTS.fullName, <TableItems />)
  .set(
    ROUTER_CONST_CB_ACTIVE.CFA_REPORTS.DETAILS_GENERAL_AGREEMENT.fullName,
    <ReportDetails />
  )
  .set(
    ROUTER_CONST_CB_ACTIVE.CFA_REPORTS.DETAILS_CREDIT_CONTRACT.fullName,
    <ReportDetails />
  );
