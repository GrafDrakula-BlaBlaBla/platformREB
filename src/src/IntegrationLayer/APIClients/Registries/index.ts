import {IRegistriesAPIClient} from './interfaces';
import {IAPIModule} from '../../../InfrastructureLayer/APIModule/interfaces';
import {Params} from 'router5/dist/types/base';
import {IBaseListDTO} from '../../../Model/BaseList';
import {IRegistriesDTO} from '../../../Model/Registries';
import {d_BaseList} from '../../Decorators/d_BaseList';
import {inject, injectable} from 'inversify';
import {INFRASTRUCTURE_MODULE} from '../../../InfrastructureLayer/identifiers';

@injectable()
export class RegistriesAPIClient implements IRegistriesAPIClient {
  protected prefixUrl: string = 'eks/registry';
  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;

  @d_BaseList
  async getItems(searchParams: Params): Promise<IBaseListDTO<IRegistriesDTO>> {
    return this.apiModule.getData<IBaseListDTO<IRegistriesDTO>>(
      this.prefixUrl,
      searchParams
    );
  }

  async createItem(): Promise<IRegistriesDTO> {
    return this.apiModule.postData<IRegistriesDTO>(this.prefixUrl);
  }

  async getItem(id: string): Promise<IRegistriesDTO> {
    return this.apiModule.getData<IRegistriesDTO>(`${this.prefixUrl}/${id}`);
  }

  async updateItem(id: string, status: string): Promise<IRegistriesDTO> {
    return this.apiModule.putData<IRegistriesDTO>(
      `${this.prefixUrl}/${id}/${status}`
    );
  }

  downloadExcel(id: string): void {
    return this.apiModule.downloadFile(`${this.prefixUrl}/${id}/excel`);
  }
}
