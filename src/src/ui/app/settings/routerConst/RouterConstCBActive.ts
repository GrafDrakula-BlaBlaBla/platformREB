import {ROUTER_CONST_BASE} from './RouterConstBase';

export const ROUTER_CONST_CB_ACTIVE = {
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
  },
  FOUNDATION: {
    name: 'foundation',
    fullName: 'foundation',
    path: '/foundation',
  },
  CREDITS: {
    name: 'credits',
    fullName: 'credits',
    path: '/credits',
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
  BANK_SETTINGS: {
    name: 'bank_settings',
    fullName: 'bank_settings',
    path: '/bank_settings',
  },
  CREDIT_FOR_ACCREDITIVE: {
    name: 'cfa_statistics',
    fullName: 'cfa_statistics',
    path: '/cfa_statistics',
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
  CFA_DRAFT: {
    name: 'cfa_draft',
    fullName: 'cfa_draft',
    path: '/cfa_draft',
    DETAILS: {
      name: 'details',
      fullName: 'cfa_draft.details',
      path: '/:id',
    },
  },
  CFA_DRAFT_CANCELLED: {
    name: 'cfa_draft_cancelled',
    fullName: 'cfa_draft_cancelled',
    path: '/cfa_draft_cancelled',
    DETAILS: {
      name: 'details',
      fullName: 'cfa_draft_cancelled.details',
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
