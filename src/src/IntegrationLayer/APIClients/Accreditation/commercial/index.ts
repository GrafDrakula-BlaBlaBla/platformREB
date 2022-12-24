import {IAccreditationCommercialAPIClient} from '../interfaces';
import {IAccreditationDTO} from '../../../../Model/Accreditation';
import {AccreditationAPIClient} from '../base';
import {Params} from 'router5/dist/types/base';
import {IBaseListDTO} from '../../../../Model/BaseList';
import mockSession from '../../../../Model/Session/mock';
import {d_BaseList} from '../../../Decorators/d_BaseList';
import {inject, injectable} from 'inversify';
import {INFRASTRUCTURE_MODULE} from '../../../../InfrastructureLayer/identifiers';
import {IAPIModule} from '../../../../InfrastructureLayer/APIModule/interfaces';

@injectable()
export class AccreditationCommercialAPIClient
  extends AccreditationAPIClient
  implements IAccreditationCommercialAPIClient {
  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;
  createItem(): Promise<IAccreditationDTO> {
    if (process.env.NODE_ENV === 'development') {
      const formData = new FormData();
      formData.append('bankId', mockSession?.bank.objectId as string);
      formData.append('userId', mockSession?.user.id as string);
      return this.apiModule.postFormData<IAccreditationDTO>(
        `${this.urlPrefix}/create`,
        formData
      );
    }
    return this.apiModule.postData<IAccreditationDTO>(
      `${this.urlPrefix}/commercial/create`
    );
  }
  acceptMeeting(accreditationId: string): Promise<boolean> {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.postData<boolean>(
        `${this.urlPrefix}/commercial/${mockSession?.bank.objectId}/accept-meeting/${accreditationId}`
      );
    }
    return this.apiModule.postData<boolean>(
      `${this.urlPrefix}/commercial/accept-meeting/${accreditationId}`
    );
  }
  send(accreditationId: string): Promise<boolean> {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.postData<boolean>(
        `${this.urlPrefix}/commercial/${mockSession?.bank.objectId}/send/${accreditationId}`
      );
    }
    return this.apiModule.postData<boolean>(
      `${this.urlPrefix}/commercial/send/${accreditationId}`
    );
  }

  @d_BaseList
  async getItems(params?: Params): Promise<IBaseListDTO<IAccreditationDTO>> {
    if (process.env.NODE_ENV === 'development') {
      return super.getItems({
        ...params,
        bankInfoId: mockSession?.bank.objectId,
      });
    }
    return this.apiModule.getData<IBaseListDTO<IAccreditationDTO>>(
      `${this.urlPrefix}/commercial/list`,
      params
    );
  }
}
