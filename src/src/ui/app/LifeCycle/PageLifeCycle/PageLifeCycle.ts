import {inject, injectable} from 'inversify';
import {State} from 'router5';
import {VIEW_MODEL} from '../../../../ViewModel/identifiers';
import {IAppViewModel} from '../../../../ViewModel/viewModels/App/interfaces';
import {IFilterViewModel} from '../../../../ViewModel/viewModels/Filter/interfaces';
import {IPageLifeCycle} from './interfaces';

@injectable()
export class PageLifeCycle implements IPageLifeCycle {
  @inject(VIEW_MODEL.App) appViewModel!: IAppViewModel;
  @inject(VIEW_MODEL.Filters) filtersViewModel!: IFilterViewModel;

  startRouting = (toState?: State, fromState?: State): void => {
    if (process.env.NODE_ENV === 'development') {
      console.log(1, 'onTransitionStart', toState?.path);
    }
    let {setGlobalLoading} = this.appViewModel;
    setGlobalLoading(true);
  };

  startMiddleware = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log(2, 'middleware start');
    }
  };

  endMiddleware = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log(4, 'middleware end');
    }
  };

  endRouting = (toState?: State, fromState?: State) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(5, 'onTransitionSuccess', toState?.path);
    }
    let {setGlobalLoading} = this.appViewModel;
    setGlobalLoading(false);
  };

  mountPage = (callBack?: () => void) => {
    callBack?.();
    if (process.env.NODE_ENV === 'development') {
      console.log(6, 'Component mount');
    }
  };

  unmountPage = () => {
    const {unsubscribeOnFiltersAll} = this.filtersViewModel;
    unsubscribeOnFiltersAll();

    if (process.env.NODE_ENV === 'development') {
      console.log(7, 'Component unmount');
    }
  };
}
