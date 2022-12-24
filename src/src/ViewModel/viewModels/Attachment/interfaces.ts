import {IAttachmentView} from '../../../Model/Attachment';

export interface IAttachmentViewModel {
  loading: boolean;
  attachments: Array<IAttachmentView>;
  attachmentsIds: Array<string>;

  initModel: (ids: Array<string>) => void;
  uploadDocument: (files: Array<File>) => Promise<IAttachmentView | undefined>;
  removeDocument: (id: string) => Promise<void>;
  downloadAttachment: (id: string) => void;
}
