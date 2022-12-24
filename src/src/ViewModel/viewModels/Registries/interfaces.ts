import {IRegistriesDTO} from '../../../Model/Registries';
import {IListViewModel} from '../List/interfaces';

export interface IRegistriesViewModel extends IListViewModel<IRegistriesDTO> {
  registry?: IRegistriesDTO;

  getItem(id: string): Promise<void>;
  createItem(): Promise<void>;
  updateItem(id: string, status: string): Promise<void>;
  sendRegistryToReb(id: string): void;
  acceptRegistry(id: string): void;
  rejectRegistry(id: string): void;
  downloadRegistry(id: string): void;
}
