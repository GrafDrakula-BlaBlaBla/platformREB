import {AppConfig, IAppConfig} from './AppConfig';
import MainContainer from '../../../Containers/MainContainer';
import {routesREB} from '../routes/routesREB';
import {MENU_CONFIG_REB} from '../menuConfig/MenuConfigREB';
import {getPageMapFromSegmentREB} from '../mapPage/MapPageREB';
import {ROUTER_CONST_REB} from '../routerConst/RouterConstREB';

export const ConfigREB: IAppConfig = new AppConfig(
  routesREB,
  MENU_CONFIG_REB,
  () => MainContainer(getPageMapFromSegmentREB),
  ROUTER_CONST_REB
);
