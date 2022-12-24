import {ROUTER_CONST_BASE} from './RouterConstBase';

export const ROUTER_CONST_REB = {
  ...ROUTER_CONST_BASE,
  ACCREDITATION: {
    name: 'accreditation',
    fullName: 'accreditation',
    path: '/accreditation',
    DETAILS: {
      fullName: 'accreditation.details',
      name: 'details',
      path: '/:id',
    },
    BANKS: {
      name: 'banks',
      fullName: 'accreditation.banks',
      path: '/banks',
    },
  },
  REGISTRIES: {
    name: 'registries',
    fullName: 'registries',
    path: '/registries',
    DETAILS: {
      fullName: 'registries.details',
      name: 'details',
      path: '/:id',
    },
  },
  REPORTS: {
    name: 'reports',
    fullName: 'reports',
    path: '/reports',
    DETAILS: {
      fullName: 'reports.details',
      name: 'details',
      path: '/:id',
    },
  },
  STATISTICS: {
    name: 'statistics',
    fullName: 'statistics',
    path: '/statistics',
  },
  CREDIT_FOR_ACCREDITIVE: {
    name: 'cfa_statistics',
    fullName: 'cfa_statistics',
    path: '/cfa_statistics',
  },
  CFA_BANKS: {
    name: 'cfa_banks',
    fullName: 'cfa_banks',
    path: '/cfa_banks',
  },
  CFA_DEAL: {
    name: 'cfa_deal',
    fullName: 'cfa_deal',
    path: '/cfa_deal',
    DETAILS: {
      name: 'details',
      fullName: 'cfa_deal.details',
      path: '/:id',
    },
  },
  CFA_REPORTS: {
    name: 'cfa_reports',
    fullName: 'cfa_reports',
    path: '/cfa_reports',
    DETAILS_GENERAL_AGREEMENT: {
      name: 'details_general_agreement',
      fullName: 'cfa_reports.details_general_agreement',
      path: '/details_general_agreement/:id',
    },
    DETAILS_CREDIT_CONTRACT: {
      name: 'details_credit_contract',
      fullName: 'cfa_reports.details_credit_contract',
      path: '/details_credit_contract/:id',
    },
  },
};
