import {IBaseViewModel} from '../Base/interfaces';
import {Params} from 'router5/dist/types/base';

export interface IListViewModel<P> extends IBaseViewModel {
  total: number;
  list: Array<P>;
  initList: (searchParams?: Params, ...args: Parameters<any>) => Promise<void>;
  setList: (list: Array<P>) => void;
}
