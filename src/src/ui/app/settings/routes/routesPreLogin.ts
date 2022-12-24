import {Router} from 'router5';
import {Params} from 'router5/dist/types/base';
import {RouterDependencies} from '../../../../index';
import {SStorage} from '../../../../Utils/Storage';
import {ROUTER_CONST_PRE_LOGIN} from '../routerConst/RouterConstPreLogin';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {IBankViewModel} from '../../../../ViewModel/viewModels/Banks';

export const routesPreLogin = [
  {
    name: ROUTER_CONST_PRE_LOGIN.HOME.name,
    path: ROUTER_CONST_PRE_LOGIN.HOME.path,
  },
  {
    name: ROUTER_CONST_PRE_LOGIN.BIC.name,
    path: ROUTER_CONST_PRE_LOGIN.BIC.path,
  },
  {
    name: ROUTER_CONST_PRE_LOGIN.PROFILE.name,
    path: ROUTER_CONST_PRE_LOGIN.PROFILE.path,
    onEnter: (_: Params, router: Router<RouterDependencies>): void => {
      const container = router.getDependencies().container;
      const state = container.get<IBankViewModel>(VIEW_MODEL.Banks);
      const bic = SStorage?.registration?.bic;
      if (bic) {
        state.getBankInfoFromBic(bic);
      }
    },
  },
  {
    name: ROUTER_CONST_PRE_LOGIN.LOGIN.name,
    path: ROUTER_CONST_PRE_LOGIN.LOGIN.path,
  },
];
