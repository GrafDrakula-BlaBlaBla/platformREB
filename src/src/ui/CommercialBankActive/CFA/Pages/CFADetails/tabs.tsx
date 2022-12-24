import React from 'react';
import {ITabProps} from '../../../../Common/TabsComponents';
import {ECreditForAccreditiveTabs} from '../../../../app/settings/routes/routesBase';
import {CreditForAccreditiveChat} from './Discussion';
import {CFAExportContracts} from '../../../../Components/CFA_Deal/CFAExportContracts';
import {CFADocuments} from '../../../../Components/CFA_Deal/CFADocuments';
import {Accreditive} from './Accreditive';
import {
  CFARequestApiViewForm,
  CFARequestManualViewForm,
} from '../../../../Components/Forms';

export const CFA_TABS_API: ITabProps[] = [
  {
    label: 'Параметры',
    value: ECreditForAccreditiveTabs.Request,
    content: <CFARequestApiViewForm />,
  },
  {
    label: 'Документы',
    value: ECreditForAccreditiveTabs.Documents,
    content: (
      <CFADocuments downloadPermission="credit-for-accreditive/commercial/documents" />
    ),
  },
  {
    label: 'Экспортные контракты',
    value: ECreditForAccreditiveTabs.ExportContracts,
    content: <CFAExportContracts />,
  },
  {
    label: 'Аккредитив',
    value: ECreditForAccreditiveTabs.Accreditive,
    content: <Accreditive />,
  },
  {
    label: 'Чат',
    value: ECreditForAccreditiveTabs.Comments,
    content: <CreditForAccreditiveChat />,
    type: 'chat',
  },
];

export const CFA_TABS_MANUAL: ITabProps[] = [
  {
    label: 'Параметры',
    value: ECreditForAccreditiveTabs.Request,
    content: <CFARequestManualViewForm />,
  },
  {
    label: 'Документы',
    value: ECreditForAccreditiveTabs.Documents,
    content: (
      <CFADocuments downloadPermission="credit-for-accreditive/commercial/documents" />
    ),
  },
  {
    label: 'Экспортные контракты',
    value: ECreditForAccreditiveTabs.ExportContracts,
    content: <CFAExportContracts />,
  },
  {
    label: 'Аккредитив',
    value: ECreditForAccreditiveTabs.Accreditive,
    content: <Accreditive />,
  },
  {
    label: 'Чат',
    value: ECreditForAccreditiveTabs.Comments,
    content: <CreditForAccreditiveChat />,
    type: 'chat',
  },
];
