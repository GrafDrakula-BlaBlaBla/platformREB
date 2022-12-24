import {AppConfig, IAppConfig} from './AppConfig';
import PreLoginContainer from '../../../Containers/PreLoginContainer';
import {routesPreLogin} from '../routes/routesPreLogin';
import {MENU_CONFIG_PRE_LOGIN} from '../menuConfig/MenuConfigPreLogin';
import {getPageMapFromSegmentPreLogin} from '../mapPage/MapPagePreLogin';
import {ROUTER_CONST_PRE_LOGIN} from '../routerConst/RouterConstPreLogin';

export const ConfigPreLogin: IAppConfig = new AppConfig(
  routesPreLogin,
  MENU_CONFIG_PRE_LOGIN,
  () => PreLoginContainer(getPageMapFromSegmentPreLogin),
  ROUTER_CONST_PRE_LOGIN
);
