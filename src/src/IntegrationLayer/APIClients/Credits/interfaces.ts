import {Params} from 'router5/dist/types/base';
import {ICreditDTO} from '../../../Model/Credits';
import {IBaseListDTO} from '../../../Model/BaseList';

export interface ICreditsAPIClient {
  getItems(searchParams?: Params): Promise<IBaseListDTO<ICreditDTO>>;
  deleteCredit(id: string | number): Promise<void>;
}
