import {Bootstrap} from '../../../Bootstrap';
import {IAppConfig} from '../settings/configs/AppConfig';
import {ConfigPreLogin} from '../settings/configs/ConfigPreLogin';
import {ConfigREB} from '../settings/configs/ConfigREB';
import {ConfigCB, ConfigCBActive} from '../settings/configs/ConfigCB';
import {ConfigPUC} from '../settings/configs/ConfigPUC';
import {EBankStatuses} from '../../../Model/Banks';
import {ISessionDTO} from '../../../Model/Session';

export const init = async (): Promise<{
  bootstrap: Bootstrap;
  config: IAppConfig;
}> => {
  const bootstrap = new Bootstrap();
  const session = await bootstrap.startSession();
  await bootstrap.configureDiContainer(
    session ? (session.user.isReb ? 'reb' : 'commercial') : undefined
  );
  if (session) {
    await bootstrap.loadCurrentUser();
    await bootstrap.loadCurrentBank();
  }
  const config = getConfig(session);
  const routes = config.getRoutes();
  const routerConst = config.getRouterConst();
  const menuConfig = config.getMenuConfig();

  bootstrap.initRouter(routes, menuConfig, routerConst);
  return {bootstrap: bootstrap, config: config};
};

const getConfig = (session: ISessionDTO): IAppConfig => {
  return !session
    ? ConfigPreLogin
    : !session.user.isActive
    ? ConfigPUC
    : session.user.isReb
    ? ConfigREB
    : session.bank.status === EBankStatuses.CREATED
    ? ConfigCB
    : ConfigCBActive;
};
