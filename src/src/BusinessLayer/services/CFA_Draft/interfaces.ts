import {Params} from 'router5/dist/types/base';
import {IBaseListDTO} from '../../../Model/BaseList';
import {IAttachmentDTO} from '../../../Model/Attachment';
import {
  ICFADraftDTO,
  ICFADraftExportContractDTO,
  ICFADraftExportContractExtendedDTO,
} from '../../../Model/CFA_Draft';

export interface ICFA_DraftService {
  isManual: () => boolean;

  initList: (params?: Params) => Promise<IBaseListDTO<ICFADraftDTO>>;
  getDraft: (draftId: string) => Promise<ICFADraftDTO>;

  createDraft: (data: ICFADraftDTO) => Promise<ICFADraftDTO>;
  createDraftFromDeal: (dealId: string) => Promise<ICFADraftDTO>;
  updateDraft: (data: ICFADraftDTO) => Promise<ICFADraftDTO>;
  executeDraft: (draftId: string) => Promise<ICFADraftDTO>;
  deleteDraft: (draftId: string) => Promise<ICFADraftDTO>;

  getDocuments: (
    draftId: string,
    params: Params
  ) => Promise<IBaseListDTO<IAttachmentDTO>>;
  deleteDocument: (draftId: string, documentId: string) => Promise<void>;
  uploadDocuments: (
    draftId: string,
    files: File[]
  ) => Promise<IAttachmentDTO[]>;
  downloadDocument: (draftId: string, documentId: string) => void;
  downloadDocuments: (draftId: string, documentIds: string[]) => void;
  downloadDocumentsAll: (draftId: string) => void;

  getExportContracts: (
    draftId: string
  ) => Promise<ICFADraftExportContractExtendedDTO[]>;
  createExportContract: (
    draftId: string,
    data: ICFADraftExportContractDTO
  ) => Promise<ICFADraftExportContractDTO>;
  updateExportContract: (
    draftId: string,
    data: ICFADraftExportContractDTO
  ) => Promise<ICFADraftExportContractDTO>;
  deleteExportContract: (draftId: string, id: string) => Promise<void>;
}
