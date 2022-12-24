import React from 'react';
import {ROUTER_CONST_CB_ACTIVE} from '../../app/settings/routerConst/RouterConstCBActive';
import {CFADraft, TableCFADraft} from './Pages';

export const matchURLTo_CFA_Draft_Component = (
  urlPath: string
): JSX.Element => {
  return mapUrlToComponents.get(urlPath);
};

const mapUrlToComponents = new Map()
  .set(ROUTER_CONST_CB_ACTIVE.CFA_DRAFT.fullName, <TableCFADraft />)
  .set(ROUTER_CONST_CB_ACTIVE.CFA_DRAFT.DETAILS.fullName, <CFADraft />);
