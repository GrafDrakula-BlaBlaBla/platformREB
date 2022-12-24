import {interfaces} from 'inversify';
import {configureDIContainer, createDIContainer} from './createDIContainer';
import {infrastructureModuleContainer} from '../InfrastructureLayer/containers/infrastructureModuleContainer';
import {INFRASTRUCTURE_MODULE} from '../InfrastructureLayer/identifiers';
import {errorModuleContainer} from '../ErrorsLayer/containers/errorModuleContainer';
import {getViewModelContainer} from '../ViewModel';
import createRouter5, {Router, Route} from 'router5';
import {createRouter} from '../routes/createRouter';
import {SESSION, Session} from './Session';
import {IAPIModule} from '../InfrastructureLayer/APIModule/interfaces';
import {TMenuConfig} from '../ui/app/settings/menuConfig/MenuConfig';
import {ISession} from './Session/interfaces';
import {ISessionDTO} from '../Model/Session';
import {getApiClientContainer} from '../IntegrationLayer';
import {getServiceContainer} from '../BusinessLayer';
import {CBRolesNames, REBRolesNames} from '../Model/User';
import {VIEW_MODEL} from '../ViewModel/identifiers';
import {IBankViewModel} from '../ViewModel/viewModels/Banks';
import {IUserViewModel} from '../ViewModel/viewModels/User/interfaces';
import moment from 'moment';
import 'moment/locale/ru';
import numeral from 'numeral';
import 'numeral/locales/ru';

moment.locale('ru');
numeral.locale('ru');

export type ACCOUNT = 'reb' | 'commercial' | undefined;
export type ContainerFactory = (a: ACCOUNT) => Promise<interfaces.Container>;

/***
 * Загрузчик приложения.
 */
export class Bootstrap {
  private diContainer: interfaces.Container;
  private router: Router;
  private session?: ISessionDTO;

  constructor() {
    this.router = createRouter5();
    this.diContainer = createDIContainer(
      infrastructureModuleContainer,
      errorModuleContainer
    );

    this.diContainer
      .bind<ISession>(SESSION)
      .toDynamicValue(({container}) => {
        const apiModule = container.get<IAPIModule>(
          INFRASTRUCTURE_MODULE.APIModule
        );
        return new Session(apiModule);
      })
      .inSingletonScope();
  }

  async configureDiContainer(account: ACCOUNT) {
    this.diContainer = await configureDIContainer(
      this.diContainer,
      getApiClientContainer(account),
      getServiceContainer(account),
      getViewModelContainer(account)
    ).then((container) => container);
  }

  initRouter(routes: Route[], menuConfig: TMenuConfig, routerConst: any) {
    this.router = createRouter(routes);
    this.router.setDependencies({container: this.diContainer});
    this.router.setDependencies({menuConfig: menuConfig});
    this.router.setDependencies({routerConst});
  }

  getDiContainer(): interfaces.Container {
    return this.diContainer;
  }

  getRouter(): Router {
    return this.router;
  }

  getPermissions(): Record<string, Array<string>> {
    return this.session?.permissions || {};
  }

  getRoles() {
    if (this.session?.user.isReb) {
      return REBRolesNames;
    }
    return CBRolesNames;
  }

  startSession = async () => {
    const session = this.diContainer.get<ISession>(SESSION);
    this.session = await session.getSession();
    return this.session;
  };

  loadCurrentUser = async () => {
    const {getCurrentUser} = this.diContainer.get<IUserViewModel>(
      VIEW_MODEL.User
    );
    await getCurrentUser();
  };

  loadCurrentBank = async () => {
    const {getCurrentBank} = this.diContainer.get<IBankViewModel>(
      VIEW_MODEL.Banks
    );
    await getCurrentBank();
  };
}
