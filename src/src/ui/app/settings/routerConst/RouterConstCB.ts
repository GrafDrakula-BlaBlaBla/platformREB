import {ROUTER_CONST_BASE} from './RouterConstBase';

export const ROUTER_CONST_CB = {
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
};
