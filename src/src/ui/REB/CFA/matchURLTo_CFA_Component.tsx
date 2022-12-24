import React from 'react';
import {ROUTER_CONST_REB} from '../../app/settings/routerConst/RouterConstREB';
import {CFADetails, ReportDetails, TableItems, TableBanks} from './Pages';

export const matchURLTo_CFA_Component = (urlPath: string): JSX.Element => {
  return mapUrlToComponents.get(urlPath);
};

const mapUrlToComponents = new Map()
  .set(ROUTER_CONST_REB.CFA_BANKS.fullName, <TableBanks />)
  .set(ROUTER_CONST_REB.CFA_DEAL.fullName, <TableItems />)
  .set(ROUTER_CONST_REB.CFA_DEAL.DETAILS.fullName, <CFADetails />)
  .set(ROUTER_CONST_REB.CFA_REPORTS.fullName, <TableItems />)
  .set(
    ROUTER_CONST_REB.CFA_REPORTS.DETAILS_GENERAL_AGREEMENT.fullName,
    <ReportDetails />
  )
  .set(
    ROUTER_CONST_REB.CFA_REPORTS.DETAILS_CREDIT_CONTRACT.fullName,
    <ReportDetails />
  );
