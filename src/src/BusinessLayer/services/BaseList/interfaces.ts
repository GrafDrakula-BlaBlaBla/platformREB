import {Params} from 'router5/dist/types/base';
import {IBaseListDTO} from '../../../Model/BaseList';

export interface IBaseListService<T> {
  initList: (
    searchParams?: Params,
    ...args: Parameters<any>
  ) => Promise<IBaseListDTO<T>>;
}
