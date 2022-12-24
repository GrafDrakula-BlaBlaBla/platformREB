import {IBaseListService} from '../BaseList/interfaces';
import {IAttachmentDTO} from '../../../Model/Attachment';
import {IAccreditationDTO} from '../../../Model/Accreditation';

export interface IAccreditationService
  extends IBaseListService<IAccreditationDTO> {
  getItem: (accreditationId: string) => Promise<IAccreditationDTO>;
  findAttachMeta: (
    accreditationId: string,
    fileType: string
  ) => Promise<IAttachmentDTO[]>;
  upload: (
    accreditationId: string,
    fileType: string,
    files: File[]
  ) => Promise<IAttachmentDTO[]>;
}

export interface IAccreditationCommercialService extends IAccreditationService {
  createItem: () => Promise<IAccreditationDTO>;
  acceptMeeting: (accreditationId: string) => Promise<boolean>;
  send: (accreditationId: string) => Promise<boolean>;
}

export interface IAccreditationREBService extends IAccreditationService {
  accept: (accreditationId: string) => Promise<boolean>;
  complete: (accreditationId: string) => Promise<boolean>;
  consideration: (accreditationId: string) => Promise<boolean>;
  createMeeting: (accreditationId: string) => Promise<boolean>;
  reject: (accreditationId: string) => Promise<boolean>;
  revision: (accreditationId: string) => Promise<boolean>;
}
