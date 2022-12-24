import {ISession} from '../../../Bootstrap/Session/interfaces';
import {Params} from 'router5/dist/types/base';
import {IBaseListDTO} from '../../../Model/BaseList';
import {
  ICFADraftDTO,
  ICFADraftExportContractDTO,
  ICFADraftExportContractExtendedDTO,
} from '../../../Model/CFA_Draft';
import {EAttachmentStatus, IAttachmentDTO} from '../../../Model/Attachment';
import {ICFA_DraftAPIClient} from '../../../IntegrationLayer/APIClients/CFA_Draft/interfaces';
import {ICFA_DraftService} from './interfaces';
import {uuidv4} from '../../../Utils/Uid';
import fileSize from 'filesize';
import {inject, injectable} from 'inversify';
import {API_CLIENT} from '../../../IntegrationLayer/identifiers';
import {SESSION} from '../../../Bootstrap/Session';

@injectable()
export class CFA_DraftService implements ICFA_DraftService {
  @inject(SESSION) protected session!: ISession;
  @inject(API_CLIENT.CFA_Draft) protected APIClient!: ICFA_DraftAPIClient;

  isManual = (): boolean => {
    return this.session.isBankManual();
  };

  /** drafts **/
  initList = (params?: Params): Promise<IBaseListDTO<ICFADraftDTO>> => {
    return this.APIClient.getDrafts(params);
  };
  getDraft = (draftId: string): Promise<ICFADraftDTO> => {
    return this.APIClient.getDraft(draftId);
  };

  createDraft = (data: ICFADraftDTO): Promise<ICFADraftDTO> => {
    return this.APIClient.createDraft(data);
  };
  createDraftFromDeal = (dealId: string): Promise<ICFADraftDTO> => {
    return this.APIClient.createDraftFromDeal(dealId);
  };
  updateDraft = (data: ICFADraftDTO): Promise<ICFADraftDTO> => {
    return this.APIClient.updateDraft(data.id, data);
  };
  executeDraft = (draftId: string): Promise<ICFADraftDTO> => {
    return this.APIClient.executeDraft(draftId);
  };
  deleteDraft = (draftId: string): Promise<ICFADraftDTO> => {
    return this.APIClient.deleteDraft(draftId);
  };

  /** documents **/
  getDocuments = async (
    draftId: string,
    params: Params
  ): Promise<IBaseListDTO<IAttachmentDTO>> => {
    const docs = await this.APIClient.getDocuments(draftId, params);
    docs.items = docs.items.map(this.attachmentDtoExtend);
    return docs;
  };
  deleteDocument = (draftId: string, documentId: string): Promise<void> => {
    return this.APIClient.deleteDocument(draftId, documentId);
  };
  uploadDocuments = (
    draftId: string,
    files: File[]
  ): Promise<IAttachmentDTO[]> => {
    return this.APIClient.uploadDocuments(draftId, this.filesToFormData(files));
  };
  downloadDocument = (draftId: string, documentId: string): void => {
    return this.APIClient.downloadDocument(draftId, documentId);
  };
  downloadDocuments = (draftId: string, documentIds: string[]): void => {
    return this.APIClient.downloadDocuments(draftId, documentIds);
  };
  downloadDocumentsAll = (draftId: string): void => {
    return this.APIClient.downloadDocumentsAll(draftId);
  };

  filesToFormData = (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    return formData;
  };
  attachmentDtoExtend = (file: IAttachmentDTO) => {
    const regexp = /(?:\.([^.]+))?$/;
    const fileExt = regexp.exec(file.attachmentName);
    return {
      ...file,
      attachmentSizeString: fileSize(file.attachmentSize),
      attachmentExtension: fileExt ? fileExt[1].toLocaleUpperCase() : '',
      status: EAttachmentStatus.GET,
      disabled: false,
      canDelete: file.hasOwnProperty('canDelete') ? file.canDelete : true,
    } as IAttachmentDTO;
  };

  /** exportContracts **/
  getExportContracts = async (
    draftId: string
  ): Promise<ICFADraftExportContractExtendedDTO[]> => {
    const items = await this.APIClient.getExportContracts(draftId);
    items?.forEach((item: ICFADraftExportContractExtendedDTO) => {
      item.tempId = uuidv4();
      item.isDirty = false;
      item.isValid = true;
    });
    return items;
  };
  createExportContract = (
    draftId: string,
    data: ICFADraftExportContractDTO
  ): Promise<ICFADraftExportContractDTO> => {
    return this.APIClient.createExportContract(draftId, data);
  };
  updateExportContract = (
    draftId: string,
    data: ICFADraftExportContractDTO
  ): Promise<ICFADraftExportContractDTO> => {
    return this.APIClient.updateExportContract(draftId, data.id, data);
  };
  deleteExportContract = (draftId: string, id: string): Promise<void> => {
    return this.APIClient.deleteExportContract(draftId, id);
  };
}
