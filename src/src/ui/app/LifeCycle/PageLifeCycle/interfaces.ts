import {State} from 'router5';

export interface IPageLifeCycle {
  startRouting: (
    toState?: State,
    fromState?: State,
    callBack?: () => void
  ) => void;
  startMiddleware: () => void;
  endMiddleware: () => void;
  endRouting: (
    toState?: State,
    fromState?: State,
    callBack?: () => void
  ) => void;
  mountPage: (callBack?: () => void) => void;
  unmountPage: () => void;
}
