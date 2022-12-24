import {Params} from 'router5/dist/types/base';
import {IAttachmentDTO} from '../../../../Model/Attachment';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {IBaseViewModel} from '../../Base/interfaces';

export interface ICFADocumentViewModel extends IBaseViewModel {
  searchParams: Params;
  documentList?: IBaseListDTO<IAttachmentDTO>;
  setDocumentList(data?: IBaseListDTO<IAttachmentDTO>): void;
  getDocumentList(id: string, searchParams: Params): Promise<void>;
  downloadDocument(documentId: string): void;
  downloadDocuments(documentIds: string[]): void;
  downloadDocumentsAll(): void;
}
