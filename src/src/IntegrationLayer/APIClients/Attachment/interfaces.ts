import {IAttachmentDTO} from '../../../Model/Attachment';

export interface IAttachmentAPIClient {
  uploadAttachment: (form: FormData) => Promise<IAttachmentDTO>;
  getMetaInformation: (id: string) => Promise<IAttachmentDTO>;
  deleteItem: (id: string) => Promise<void>;
  downloadAttachment: (id: string) => void;
}
