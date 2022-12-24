import {IAttachmentView} from '../../../Model/Attachment';

export interface IAttachmentService {
  getMetaInformationById: (id: string) => Promise<IAttachmentView>;
  uploadAttachment: (attachment: File) => Promise<IAttachmentView>;
  deleteAttachment: (id: string) => Promise<void>;
  downloadAttachment: (id: string) => void;
}
