import {Params} from 'router5/dist/types/base';
import {IBaseViewModel} from '../../Base/interfaces';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {IAttachmentDTO} from '../../../../Model/Attachment';

export interface ICFADraftDocumentComViewModel extends IBaseViewModel {
  isValid: boolean;
  searchParams: Params;
  documentList?: IBaseListDTO<IAttachmentDTO>;

  setDocumentList: (data?: IBaseListDTO<IAttachmentDTO>) => void;
  getDocumentList: (id: string, searchParams: Params) => Promise<void>;
  downloadDocument: (documentId: string) => void;
  downloadDocuments: (documentIds: string[]) => void;
  downloadDocumentsAll: () => void;

  deleteDocument: (documentId: string) => Promise<void>;
  uploadDocuments: (files: File[]) => Promise<void>;
}
