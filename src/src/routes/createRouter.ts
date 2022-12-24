import createRouter5, {Route, Router} from 'router5';
import browserPlugin from 'router5-plugin-browser';
import {onEnterMiddlewareFactory} from './onEnter';
import {routerLifeCycle} from './RouterLifeCycle';

export const createRouter = (routes: Route[]): Router => {
  const router = createRouter5(routes, {
    allowNotFound: true,
    queryParamsMode: 'loose',
    autoCleanUp: false,
  });

  router.useMiddleware(onEnterMiddlewareFactory(routes));

  router.usePlugin(
    browserPlugin({
      useHash: true,
    }),
    routerLifeCycle
  );

  return router;
};
