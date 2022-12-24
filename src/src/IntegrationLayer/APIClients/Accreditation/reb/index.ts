import {IAccreditationREBAPIClient} from '../interfaces';
import {AccreditationAPIClient} from '../base';
import {Params} from 'router5/dist/types/base';
import {IAccreditationDTO} from '../../../../Model/Accreditation';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {d_BaseList} from '../../../Decorators/d_BaseList';
import {inject, injectable} from 'inversify';
import {INFRASTRUCTURE_MODULE} from '../../../../InfrastructureLayer/identifiers';
import {IAPIModule} from '../../../../InfrastructureLayer/APIModule/interfaces';

@injectable()
export class AccreditationREBAPIClient
  extends AccreditationAPIClient
  implements IAccreditationREBAPIClient {
  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;

  accept(accreditationId: string): Promise<boolean> {
    return this.apiModule.postData<boolean>(
      `${this.urlPrefix}/reb/accept/${accreditationId}`
    );
  }
  complete(accreditationId: string): Promise<boolean> {
    return this.apiModule.postData<boolean>(
      `${this.urlPrefix}/reb/complete/${accreditationId}`
    );
  }
  consideration(accreditationId: string): Promise<boolean> {
    return this.apiModule.postData<boolean>(
      `${this.urlPrefix}/reb/consideration/${accreditationId}`
    );
  }
  createMeeting(accreditationId: string): Promise<boolean> {
    return this.apiModule.postData<boolean>(
      `${this.urlPrefix}/reb/create-meeting/${accreditationId}`
    );
  }
  reject(accreditationId: string): Promise<boolean> {
    return this.apiModule.postData<boolean>(
      `${this.urlPrefix}/reb/reject/${accreditationId}`
    );
  }
  revision(accreditationId: string): Promise<boolean> {
    return this.apiModule.postData<boolean>(
      `${this.urlPrefix}/reb/revision/${accreditationId}`
    );
  }

  @d_BaseList
  async getItems(params?: Params): Promise<IBaseListDTO<IAccreditationDTO>> {
    if (process.env.NODE_ENV === 'development') {
      return super.getItems(params);
    }
    return this.apiModule.getData<IBaseListDTO<IAccreditationDTO>>(
      `${this.urlPrefix}/reb/list`,
      params
    );
  }
}
