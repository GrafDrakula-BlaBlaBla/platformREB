import {Params} from 'router5/dist/types/base';
import {IBaseListDTO} from '../../../Model/BaseList';
import {IRegistriesDTO} from '../../../Model/Registries';

export interface IRegistriesAPIClient {
  getItems(searchParams?: Params): Promise<IBaseListDTO<IRegistriesDTO>>;

  createItem(): Promise<IRegistriesDTO>;

  getItem(id: string): Promise<IRegistriesDTO>;

  updateItem(id: string, status: string): Promise<IRegistriesDTO>;

  downloadExcel(id: string): void;
}
