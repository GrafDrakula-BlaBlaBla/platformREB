import React from 'react';
import {ITabProps} from '../../../../Common/TabsComponents';
import {ECreditForAccreditiveTabs} from '../../../../app/settings/routes/routesBase';
import {CFADraftRequest} from './CFADraftRequest';
import {CFADraftDocuments} from './CFADraftDocuments';
import {CFADraftExportContracts} from './CFADraftExportContracts';

export const CFA_TABS_DRAFT: ITabProps[] = [
  {
    label: 'Параметры',
    value: ECreditForAccreditiveTabs.Request,
    content: <CFADraftRequest />,
  },
  {
    label: 'Документы',
    value: ECreditForAccreditiveTabs.Documents,
    content: (
      <CFADraftDocuments downloadPermission="credit-for-accreditive/commercial/documents" />
    ),
  },
  {
    label: 'Экспортные контракты',
    value: ECreditForAccreditiveTabs.ExportContracts,
    content: <CFADraftExportContracts />,
  },
  {
    label: 'Аккредитив',
    value: ECreditForAccreditiveTabs.Accreditive,
    disabled: true,
  },
  {
    label: 'Чат',
    value: ECreditForAccreditiveTabs.Comments,
    disabled: true,
  },
];
