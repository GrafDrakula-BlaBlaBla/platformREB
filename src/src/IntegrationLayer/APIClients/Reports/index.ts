import {Params} from 'router5/dist/types/base';
import {IAPIModule} from '../../../InfrastructureLayer/APIModule/interfaces';
import {IReportDTO} from '../../../Model/Reports';
import {IBaseListDTO} from '../../../Model/BaseList';
import {IReportsAPIClient} from './interfaces';
import {d_BaseList} from '../../Decorators/d_BaseList';
import {inject, injectable} from 'inversify';
import {INFRASTRUCTURE_MODULE} from '../../../InfrastructureLayer/identifiers';

@injectable()
export class ReportsAPIClient implements IReportsAPIClient {
  protected urlPrefix: string = 'eks/report';
  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;

  @d_BaseList
  async getItems(searchParams: Params): Promise<IBaseListDTO<IReportDTO>> {
    return this.apiModule.getData<IBaseListDTO<IReportDTO>>(
      this.urlPrefix,
      searchParams
    );
  }

  getItem(id: string): Promise<IReportDTO> {
    return this.apiModule.getData(`${this.urlPrefix}/${id}`);
  }

  createItem(): Promise<IReportDTO> {
    return this.apiModule.postData(`${this.urlPrefix}`);
  }

  updateItem(id: string, status: string): Promise<IReportDTO> {
    return this.apiModule.putData(`${this.urlPrefix}/${id}/${status}`);
  }
}
