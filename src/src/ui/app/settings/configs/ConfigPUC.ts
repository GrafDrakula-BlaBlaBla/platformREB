import PreLoginContainer from '../../../Containers/PreLoginContainer';
import {getPageMapFromSegmentPUC} from '../mapPage/MapPagePUC';
import {ROUTER_CONST_PUC} from '../routerConst/RouterConstPUC';
import {routesPUC} from '../routes/routesPUC';
import {AppConfig, IAppConfig} from './AppConfig';

export const ConfigPUC: IAppConfig = new AppConfig(
  routesPUC,
  [],
  () => PreLoginContainer(getPageMapFromSegmentPUC),
  ROUTER_CONST_PUC
);
