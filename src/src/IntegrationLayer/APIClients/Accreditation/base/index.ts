import {IAPIModule} from '../../../../InfrastructureLayer/APIModule/interfaces';
import {IAccreditationAPIClient} from '../interfaces';
import {IAccreditationDTO} from '../../../../Model/Accreditation';
import {Params} from 'router5/dist/types/base';
import {IAttachmentDTO} from '../../../../Model/Attachment';
import {IBaseListDTO} from '../../../../Model/BaseList';
import mockSession from '../../../../Model/Session/mock';
import {d_BaseList} from '../../../Decorators/d_BaseList';
import {injectable} from 'inversify';

@injectable()
export class AccreditationAPIClient implements IAccreditationAPIClient {
  protected readonly urlPrefix: string = 'bank-accreditation';
  protected apiModule!: IAPIModule;

  @d_BaseList
  async getItems(params?: Params): Promise<IBaseListDTO<IAccreditationDTO>> {
    return this.apiModule.getData<IBaseListDTO<IAccreditationDTO>>(
      `${this.urlPrefix}/list`,
      params
    );
  }

  getItem(accreditationId: string): Promise<IAccreditationDTO> {
    return this.apiModule.getData<IAccreditationDTO>(
      `${this.urlPrefix}/findById`,
      {bankAccreditationId: accreditationId}
    );
  }

  findAttachMeta(params?: Params): Promise<IAttachmentDTO[]> {
    return this.apiModule.getData(`${this.urlPrefix}/findAttachMeta`, params);
  }

  upload(reqDTO: FormData): Promise<IAttachmentDTO[]> {
    if (process.env.NODE_ENV === 'development') {
      reqDTO.append('userId', mockSession?.user.id as string);
    }
    return this.apiModule.postFormData(`${this.urlPrefix}/upload`, reqDTO);
  }
}
