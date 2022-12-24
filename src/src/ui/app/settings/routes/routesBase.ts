import {Params} from 'router5/dist/types/base';
import {Router} from 'router5';
import {ROUTER_CONST_BASE} from '../routerConst/RouterConstBase';
import {RouterDependencies} from '../../../..';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {IMessagesViewModel} from '../../../../ViewModel/viewModels/Messages/interfaces';
import {IUserViewModel} from '../../../../ViewModel/viewModels/User/interfaces';
import {IDictionaryViewModel} from '../../../../ViewModel/viewModels/Dictionary/interfaces';
import {IBankViewModel} from '../../../../ViewModel/viewModels/Banks';

export const DefaultParams = {
  Pagination: {
    limit: 5,
    offset: 0,
  },
};

export enum EUserAreaTabs {
  AboutBank = 'about_bank',
  Profile = 'profile',
  Instruction = 'instruction',
}
export enum ECreditForAccreditiveTabs {
  Request = 'request',
  Documents = 'documents',
  Accreditive = 'accreditive',
  ExportContracts = 'exportcontracts',
  Comments = 'comments',
  ChangeLog = 'changelog',
}

export const routesBase = [
  {
    name: ROUTER_CONST_BASE.HOME.name,
    path: ROUTER_CONST_BASE.HOME.path,
  },
  {
    name: ROUTER_CONST_BASE.NOTIFICATION_CENTER.name,
    path: ROUTER_CONST_BASE.NOTIFICATION_CENTER.path,
    onEnter: (params: Params, router: Router<RouterDependencies>): void => {
      const container = router.getDependencies().container;
      const messagesViewModel = container.get<IMessagesViewModel>(
        VIEW_MODEL.Messages
      );
      messagesViewModel.initList(params);
    },
  },
  {
    name: ROUTER_CONST_BASE.CONTROLS.name,
    path: ROUTER_CONST_BASE.CONTROLS.path,
  },
  {
    name: ROUTER_CONST_BASE.USERS.name,
    path: ROUTER_CONST_BASE.USERS.path,
    defaultParams: {...DefaultParams.Pagination, limit: 100},
    onEnter: (params: Params, router: Router<RouterDependencies>) => {
      const container = router.getDependencies().container;
      const {getUsers, getBankUserRoles} = container.get<IUserViewModel>(
        VIEW_MODEL.User
      );
      getUsers(params);
      getBankUserRoles();
      const {getTerritorialBanks} = container.get<IDictionaryViewModel>(
        VIEW_MODEL.Dictionary
      );
      getTerritorialBanks();
    },
  },
  {
    name: ROUTER_CONST_BASE.USER_AREA.name,
    path: ROUTER_CONST_BASE.USER_AREA.path,
    defaultParams: {...DefaultParams.Pagination, limit: 100},
    onEnter: (params: Params, router: Router<RouterDependencies>) => {
      switch (params.tab) {
        case EUserAreaTabs.AboutBank:
          const container = router.getDependencies().container;
          const {getBankAdmins} = container.get<IBankViewModel>(
            VIEW_MODEL.Banks
          );
          getBankAdmins();
          break;
        case EUserAreaTabs.Profile:
          break;
      }
    },
  },
];
