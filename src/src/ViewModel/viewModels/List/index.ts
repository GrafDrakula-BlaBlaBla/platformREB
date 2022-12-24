import {action, makeObservable, observable} from 'mobx';
import {IBaseListService} from '../../../BusinessLayer/services/BaseList/interfaces';
import {BaseViewModel} from '../Base';
import {Params} from 'router5/dist/types/base';
import {IListViewModel} from './interfaces';
import {injectable} from 'inversify';

@injectable()
export class ListViewModel<P, S extends IBaseListService<P>>
  extends BaseViewModel
  implements IListViewModel<P> {
  protected service!: S;

  constructor() {
    super();
    makeObservable(this, {
      total: observable,
      list: observable,
      setTotal: action,
      setList: action,
    });
  }

  total: number = 0;
  list: Array<P> = [];

  initList = async (searchParams?: Params, ...args: Parameters<any>) => {
    this.setLoading();
    const response = await this.service.initList(searchParams, ...args);
    this.setTotal(response.total);
    this.setList(response.items);
    this.unsetLoading();
  };

  setTotal = (total: number) => {
    this.total = total;
  };
  setList = (list: Array<P>) => {
    this.list = list;
  };
}
