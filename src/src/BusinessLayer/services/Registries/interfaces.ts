import {IBaseListService} from '../BaseList/interfaces';
import {IRegistriesDTO} from '../../../Model/Registries';

export interface IRegistriesService extends IBaseListService<IRegistriesDTO> {
  getItem(id: string): Promise<IRegistriesDTO>;
  createItem(): Promise<IRegistriesDTO>;
  updateItem(id: string, status: string): Promise<IRegistriesDTO>;
  downloadRegistry(id: string): void;
}
