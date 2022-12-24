import {AppConfig, IAppConfig} from './AppConfig';
import MainContainer from '../../../Containers/MainContainer';
import {routesCBActive} from '../routes/routesCBActive';
import {MENU_CONFIG_CB} from '../menuConfig/MenuConfigCB';
import {getPageMapFromSegmentCB} from '../mapPage/MapPageCB';
import {ROUTER_CONST_CB_ACTIVE} from '../routerConst/RouterConstCBActive';
import {MENU_CONFIG_CB_ACTIVE} from '../menuConfig/MenuConfigCBActive';
import {getPageMapFromSegmentCBActive} from '../mapPage/MapPageCBActive';
import {routesCB} from '../routes/routesCB';
import {ROUTER_CONST_CB} from '../routerConst/RouterConstCB';

export const ConfigCB: IAppConfig = new AppConfig(
  routesCB,
  MENU_CONFIG_CB,
  () => MainContainer(getPageMapFromSegmentCB),
  ROUTER_CONST_CB
);

export const ConfigCBActive: IAppConfig = new AppConfig(
  routesCBActive,
  MENU_CONFIG_CB_ACTIVE,
  () => MainContainer(getPageMapFromSegmentCBActive),
  ROUTER_CONST_CB_ACTIVE
);
