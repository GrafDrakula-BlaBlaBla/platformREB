import {Params} from 'router5/dist/types/base';
import {BaseViewModel} from '../../Base';
import {ICFADocumentViewModel} from './interfaces';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {IAttachmentDTO} from '../../../../Model/Attachment';
import {ICFA_DealService} from '../../../../BusinessLayer/services/CFA_Deal';
import {action, makeObservable, observable} from 'mobx';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../BusinessLayer/identifiers';

@injectable()
export class CFADocumentViewModel
  extends BaseViewModel
  implements ICFADocumentViewModel {
  protected creditForAccreditiveId?: string;
  searchParams: Params = {};
  documentList?: IBaseListDTO<IAttachmentDTO>;

  @inject(SERVICE.CreditForAccreditive) protected service!: ICFA_DealService;

  constructor() {
    super();
    makeObservable(this, {
      documentList: observable,
      setDocumentList: action,
    });
  }

  setDocumentList = (data?: IBaseListDTO<IAttachmentDTO>) => {
    this.documentList = data;
  };
  setCreditForAccreditiveId = (id?: string) => {
    this.creditForAccreditiveId = id;
  };
  setSearchParams = (searchParams: Params) => {
    this.searchParams = searchParams;
  };

  getDocumentList = async (id: string, searchParams: Params): Promise<void> => {
    this.setLoading();
    this.setCreditForAccreditiveId(id);
    this.setSearchParams(searchParams);
    const list = await this.service.getDocumentList(id, searchParams);
    this.setDocumentList(list);
    this.unsetLoading();
  };

  downloadDocument = (documentId: string): void => {
    if (this.creditForAccreditiveId)
      this.service.downloadDocument(this.creditForAccreditiveId, documentId);
  };
  downloadDocuments = (documentIds: string[]): void => {
    if (this.creditForAccreditiveId)
      this.service.downloadDocuments(this.creditForAccreditiveId, documentIds);
  };
  downloadDocumentsAll = (): void => {
    if (this.creditForAccreditiveId)
      this.service.downloadDocumentsAll(this.creditForAccreditiveId);
  };
}
