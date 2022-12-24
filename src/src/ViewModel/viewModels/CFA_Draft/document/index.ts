import {ICFADraftDocumentComViewModel} from './interfaces';
import {Params} from 'router5/dist/types/base';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {IAttachmentDTO} from '../../../../Model/Attachment';
import {ICFA_DraftService} from '../../../../BusinessLayer/services/CFA_Draft/interfaces';
import {action, computed, makeObservable, observable} from 'mobx';
import {BaseViewModel} from '../../Base';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../BusinessLayer/identifiers';

@injectable()
export class CFADraftDocumentComViewModel
  extends BaseViewModel
  implements ICFADraftDocumentComViewModel {
  protected draftId?: string;
  searchParams: Params = {};
  documentList?: IBaseListDTO<IAttachmentDTO>;

  @inject(SERVICE.CFA_Draft) protected service!: ICFA_DraftService;

  constructor() {
    super();
    makeObservable(this, {
      isValid: computed,
      documentList: observable,
      setDocumentList: action,
    });
  }

  get isValid() {
    return this.documentList ? this.documentList.total > 0 : false;
  }

  setDocumentList = (data?: IBaseListDTO<IAttachmentDTO>) => {
    this.documentList = data;
  };
  setDraftId = (id?: string) => {
    this.draftId = id;
  };
  setSearchParams = (params: Params) => {
    this.searchParams = params;
  };

  getDocumentList = async (id: string, params: Params): Promise<void> => {
    this.setLoading();
    this.setDraftId(id);
    this.setSearchParams(params);
    const list = await this.service.getDocuments(id, params);
    this.setDocumentList(list);
    this.unsetLoading();
  };

  downloadDocument = (documentId: string) => {
    if (this.draftId) this.service.downloadDocument(this.draftId, documentId);
  };
  downloadDocuments = (documentIds: string[]) => {
    if (this.draftId) this.service.downloadDocuments(this.draftId, documentIds);
  };
  downloadDocumentsAll = () => {
    if (this.draftId) this.service.downloadDocumentsAll(this.draftId);
  };

  deleteDocument = async (documentId: string) => {
    if (this.draftId) {
      this.setLoading();
      try {
        await this.service.deleteDocument(this.draftId, documentId);
        await this.getDocumentList(this.draftId, this.searchParams);
      } finally {
        this.unsetLoading();
      }
    }
  };
  uploadDocuments = async (files: File[]) => {
    if (this.draftId) {
      this.setLoading();
      try {
        await this.service.uploadDocuments(this.draftId, files);
        await this.getDocumentList(this.draftId, this.searchParams);
      } finally {
        this.unsetLoading();
      }
    }
  };
}
