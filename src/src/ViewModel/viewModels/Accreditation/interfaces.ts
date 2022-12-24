import {IAttachmentDTO} from '../../../Model/Attachment';
import {IAccreditationDTO} from '../../../Model/Accreditation';
import {IBaseViewModel} from '../Base/interfaces';
import {IListViewModel} from '../List/interfaces';

export interface IAccreditationViewModel
  extends IListViewModel<IAccreditationDTO> {
  item?: IAccreditationDTO;
  attachmentsDocs: IAccreditationAttachmentsViewModel;
  attachmentsMeeting: IAccreditationAttachmentsViewModel;
  setItem: (data?: IAccreditationDTO) => void;
  getItem: (id: string) => Promise<void>;
  getCurrentItem: () => Promise<void>;
  initAttachments: (acrreditationId: string) => Promise<void>;
}
export interface IAccreditationCommercialViewModel
  extends IAccreditationViewModel {
  createItem: () => Promise<IAccreditationDTO>;
  acceptMeeting: () => Promise<void>;
  send: () => Promise<void>;
}
export interface IAccreditationREBViewModel extends IAccreditationViewModel {
  accept: () => Promise<void>;
  complete: () => Promise<void>;
  consideration: () => Promise<void>;
  createMeeting: () => Promise<void>;
  reject: () => Promise<void>;
  revision: () => Promise<void>;
}

export interface IAccreditationAttachmentsViewModel extends IBaseViewModel {
  id?: string;
  attachments?: IAttachmentDTO[];
  init: (id: string) => Promise<void>;
  findAttachMeta: () => Promise<void>;
  upload: (files: File[]) => Promise<void>;
  download: (ids: string[]) => Promise<void>;
  remove: (is: string) => Promise<void>;
}
