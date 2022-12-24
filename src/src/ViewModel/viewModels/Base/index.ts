import {injectable} from 'inversify';
import {action, makeObservable, observable} from 'mobx';
import {IBaseViewModel} from './interfaces';

@injectable()
export abstract class BaseViewModel implements IBaseViewModel {
  protected constructor() {
    makeObservable(this, {
      loading: observable,
      setLoading: action,
      unsetLoading: action,
    });
  }

  loading: boolean = false;

  setLoading = () => {
    this.loading = true;
  };

  unsetLoading = () => {
    this.loading = false;
  };
}
