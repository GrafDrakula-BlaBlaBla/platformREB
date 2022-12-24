import {NavigationOptions, State} from 'router5';
import {DefaultDependencies, Plugin, Router} from 'router5/dist/types/router';
import {RouterDependencies} from '..';
import {VIEW_MODEL} from '../ViewModel/identifiers';
import {IPageLifeCycle} from '../ui/app/LifeCycle/PageLifeCycle';

export const routerLifeCycle = (
  router?: Router<RouterDependencies>,
  dependencies?: DefaultDependencies
): Plugin => ({
  onTransitionSuccess: (
    toState?: State,
    fromState?: State,
    opts?: NavigationOptions
  ): void => {
    const container = router?.getDependencies().container;
    const lifeCycle = container?.get<IPageLifeCycle>(VIEW_MODEL.PageLifeCycle);
    lifeCycle?.endRouting(toState, fromState);
  },
  onStart: () => {},
  onStop: () => {},
  onTransitionStart: async (toState?: State, fromState?: State) => {
    const container = router?.getDependencies().container;
    const lifeCycle = container?.get<IPageLifeCycle>(VIEW_MODEL.PageLifeCycle);
    lifeCycle?.startRouting(toState, fromState);
  },
  onTransitionCancel: (toState?: State, fromState?: State) => {},
  onTransitionError: (toState?: State, fromState?: State, err?: any) => {},
  teardown: () => {},
});
