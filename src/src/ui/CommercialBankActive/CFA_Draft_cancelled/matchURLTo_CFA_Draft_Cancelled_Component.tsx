import React from 'react';
import {ROUTER_CONST_CB_ACTIVE} from '../../app/settings/routerConst/RouterConstCBActive';
import {CFADraft} from '../CFA_Draft/Pages';
import {TableCFADraftCancelled} from './Pages';

export const matchURLTo_CFA_Draft_Cancelled_Component = (
  urlPath: string
): JSX.Element => {
  return mapUrlToComponents.get(urlPath);
};

const mapUrlToComponents = new Map()
  .set(
    ROUTER_CONST_CB_ACTIVE.CFA_DRAFT_CANCELLED.fullName,
    <TableCFADraftCancelled />
  )
  .set(
    ROUTER_CONST_CB_ACTIVE.CFA_DRAFT_CANCELLED.DETAILS.fullName,
    <CFADraft />
  );
