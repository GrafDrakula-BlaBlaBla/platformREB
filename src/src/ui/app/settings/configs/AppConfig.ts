import {Route} from 'router5';
import {TMenuConfig} from '../menuConfig/MenuConfig';

export interface IAppConfig {
  getMenuConfig(): any;
  getRoutes(): Route[];
  getUI(): () => JSX.Element;
  getRouterConst(): any;
}

export class AppConfig implements IAppConfig {
  constructor(
    protected routes: Route[],
    protected menuConfig: TMenuConfig,
    protected ui: () => JSX.Element,
    protected routerConst: any
  ) {}

  getMenuConfig = (): TMenuConfig => {
    return this.menuConfig;
  };

  getRoutes = (): Route[] => {
    return this.routes;
  };

  getUI = (): (() => JSX.Element) => {
    return this.ui;
  };

  getRouterConst = () => {
    return this.routerConst;
  };
}
