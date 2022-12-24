import {Params} from 'router5/dist/types/base';

export interface IBaseListAPIClient {
  getItems: (searchParams?: Params) => Promise<any>;
}
