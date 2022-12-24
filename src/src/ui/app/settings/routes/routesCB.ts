import {DefaultParams, routesBase} from './routesBase';
import {ROUTER_CONST_CB_ACTIVE} from '../routerConst/RouterConstCBActive';
import {Params} from 'router5/dist/types/base';
import {Router} from 'router5';
import {RouterDependencies} from '../../../../index';
import {IAccreditationViewModel} from '../../../../ViewModel/viewModels/Accreditation';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {EActiveTabsName} from '../../../REB/Accreditation';

export const routesCB = [
  ...routesBase,
  {
    name: ROUTER_CONST_CB_ACTIVE.ACCREDITATION.name,
    path: ROUTER_CONST_CB_ACTIVE.ACCREDITATION.path,
    defaultParams: DefaultParams.Pagination,
    children: [
      {
        name: ROUTER_CONST_CB_ACTIVE.ACCREDITATION.DETAILS.name,
        path: ROUTER_CONST_CB_ACTIVE.ACCREDITATION.DETAILS.path,
        onEnter: (params: Params, router: Router<RouterDependencies>): void => {
          const container = router.getDependencies().container;

          const {item, getItem, initAttachments} = container.get<
            IAccreditationViewModel
          >(VIEW_MODEL.Accreditation);

          if (!item) getItem(params.id);
          switch (params.tab) {
            case EActiveTabsName.AccreditationParameters:
              initAttachments(params.id);
              break;
          }
        },
      },
    ],
  },
];
