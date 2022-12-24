import {IBaseListDTO} from '../../../Model/BaseList';
import {IRegistriesService} from './interfaces';
import {BaseListService} from '../BaseList';
import {IRegistriesDTO} from '../../../Model/Registries';
import {mapCreditToView} from '../Credits';
import {Params} from 'router5/dist/types/base';
import {IRegistriesAPIClient} from '../../../IntegrationLayer/APIClients/Registries/interfaces';
import moment from 'moment';
import {inject, injectable} from 'inversify';
import {API_CLIENT} from '../../../IntegrationLayer/identifiers';

@injectable()
export class RegistriesService
  extends BaseListService<IRegistriesDTO, IRegistriesAPIClient>
  implements IRegistriesService {
  @inject(API_CLIENT.Registries) protected APIClient!: IRegistriesAPIClient;

  initList = async (
    searchParams?: Params
  ): Promise<IBaseListDTO<IRegistriesDTO>> => {
    const response = await super.initList(searchParams);
    response.items = response.items.map(mapRegistryToView);
    return response;
  };

  async getItem(id: string): Promise<IRegistriesDTO> {
    const registry = await this.APIClient.getItem(id);
    return mapRegistryToView(registry);
  }

  async createItem(): Promise<IRegistriesDTO> {
    const registry = await this.APIClient.createItem();
    return mapRegistryToView(registry);
  }

  async updateItem(id: string, status: string): Promise<IRegistriesDTO> {
    const registry = await this.APIClient.updateItem(id, status);
    return mapRegistryToView(registry);
  }

  downloadRegistry(id: string): void {
    return this.APIClient.downloadExcel(id);
  }
}

function mapRegistryToView(registry: IRegistriesDTO): IRegistriesDTO {
  const format = 'DD.MM.YYYY';
  return {
    ...registry,
    createDate: moment(registry?.createDate).format(format),
    credits: registry?.credits?.map(mapCreditToView),
  };
}
