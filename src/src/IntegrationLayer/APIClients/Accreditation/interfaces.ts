import {IAccreditationDTO} from '../../../Model/Accreditation';
import {Params} from 'router5/dist/types/base';
import {IAttachmentDTO} from '../../../Model/Attachment';
import {IBaseListDTO} from '../../../Model/BaseList';

export interface IAccreditationAPIClient {
  getItems: (params?: Params) => Promise<IBaseListDTO<IAccreditationDTO>>;
  getItem: (accreditationId: string) => Promise<IAccreditationDTO>;
  findAttachMeta: (params?: Params) => Promise<IAttachmentDTO[]>;
  upload: (reqDTO: FormData) => Promise<IAttachmentDTO[]>;
}
export interface IAccreditationCommercialAPIClient
  extends IAccreditationAPIClient {
  createItem: () => Promise<IAccreditationDTO>;
  acceptMeeting: (accreditationId: string) => Promise<boolean>;
  send: (accreditationId: string) => Promise<boolean>;
}
export interface IAccreditationREBAPIClient extends IAccreditationAPIClient {
  accept: (accreditationId: string) => Promise<boolean>;
  complete: (accreditationId: string) => Promise<boolean>;
  consideration: (accreditationId: string) => Promise<boolean>;
  createMeeting: (accreditationId: string) => Promise<boolean>;
  reject: (accreditationId: string) => Promise<boolean>;
  revision: (accreditationId: string) => Promise<boolean>;
}
