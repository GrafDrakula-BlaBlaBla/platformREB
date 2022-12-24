import {
  DefaultDependencies,
  Middleware,
  MiddlewareFactory,
  Route,
  Router,
} from 'router5/dist/types/router';
import {RouterDependencies} from '../index';
import {State} from 'router5';
import {DoneFn} from 'router5/dist/types/base';
import {VIEW_MODEL} from '../ViewModel/identifiers';
import {IPageLifeCycle} from '../ui/app/LifeCycle/PageLifeCycle';

const findSegment = (toStateName: string, routes: Route[]): Route | null => {
  return toStateName
    .split('.')
    .reduce<Route | null>((curSegment, curRouteName: string) => {
      if (curSegment && curSegment.children) {
        return (
          curSegment.children.find((seg: Route) => seg.name === curRouteName) ||
          null
        );
      }
      return routes.find((seg: any) => seg.name === curRouteName) || null;
    }, null);
};

export const onEnterMiddlewareFactory = (
  routes: Route<RouterDependencies>[]
): MiddlewareFactory<RouterDependencies> => {
  return (
    router: Router<RouterDependencies>,
    dependencies: DefaultDependencies
  ): Middleware => {
    return async (
      toState: State,
      fromState: State,
      done: DoneFn
    ): Promise<void> => {
      const container = router.getDependencies().container;
      const {startMiddleware, endMiddleware} = container.get<IPageLifeCycle>(
        VIEW_MODEL.PageLifeCycle
      );
      startMiddleware();
      const segment = findSegment(toState.name, routes);
      if (segment && (segment as any).onEnter) {
        return (segment as any).onEnter(toState.params, router)?.finally(() => {
          endMiddleware();
        });
      }
    };
  };
};
