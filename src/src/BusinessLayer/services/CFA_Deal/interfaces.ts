import {Params} from 'router5/dist/types/base';
import {
  IActualBankCFADTO,
  ICFABankUserDTO,
  ICFACreditContractDTO,
  ICFAExportContractDTO,
  ICFAExportContractPreliminaryDTO,
  ICFAGeneralAgreementDTO,
  ICFAItemDTO,
  ICFARequestDTOExtend,
  ICFARequestParametersDTO,
} from '../../../Model/CFA_Deal';
import {IBaseListDTO} from '../../../Model/BaseList';
import {IBaseListService} from '../BaseList/interfaces';
import {IAttachmentDTO} from '../../../Model/Attachment';

export interface ICFA_DealService extends IBaseListService<ICFAItemDTO> {
  getRequest: (id: string) => Promise<ICFARequestDTOExtend>;

  getDocumentList: (
    id: string,
    searchParams: Params
  ) => Promise<IBaseListDTO<IAttachmentDTO>>;
  downloadDocument: (objectId: string, documentId: string) => void;
  downloadDocuments: (objectId: string, documentIds: string[]) => void;
  downloadDocumentsAll: (objectId: string) => void;

  getGeneralAgreement(
    creditForAccreditiveId: string
  ): Promise<ICFAGeneralAgreementDTO | undefined>;
  saveGeneralAgreement(
    data: ICFAGeneralAgreementDTO
  ): Promise<ICFAGeneralAgreementDTO>;

  getCreditContract(
    creditForAccreditiveId: string
  ): Promise<ICFACreditContractDTO | undefined>;
  saveCreditContract(
    data: ICFACreditContractDTO
  ): Promise<ICFACreditContractDTO>;

  getExportContractList(
    creditForAccreditiveId: number
  ): Promise<ICFAExportContractDTO[]>;

  getExportContractPreliminaryList(
    id: string
  ): Promise<IBaseListDTO<ICFAExportContractPreliminaryDTO>>;
  createExportContractPreliminary(
    id: string,
    data: Omit<ICFAExportContractPreliminaryDTO, 'id'>
  ): Promise<ICFAExportContractPreliminaryDTO>;
  editExportContractPreliminary(
    id: string,
    contractId: string,
    data: ICFAExportContractPreliminaryDTO
  ): Promise<void>;
  deleteExportContractPreliminary(
    id: string,
    contractId: string
  ): Promise<void>;

  attachCFAUsers: (cfaId: string, userIds: string[]) => Promise<unknown>;
  getAvailableCFAUsers: (cfaId: string) => Promise<ICFABankUserDTO[]>;
}

export interface ICFA_DealComService extends ICFA_DealService {
  getAvailableUsers: () => Promise<ICFABankUserDTO[]>;
  saveRequestParameters(
    id: string,
    data: ICFARequestParametersDTO
  ): Promise<ICFARequestParametersDTO>;

  getControllers: () => Promise<ICFABankUserDTO[]>;
  attachControllers: (cfaId: string, userIds: string[]) => Promise<unknown>;

  approveDeal: () => Promise<void>;
  returnDeal: (value?: string) => Promise<void>;
}

export interface ICFA_DealRebService extends ICFA_DealService {
  getActualBankList: () => Promise<IActualBankCFADTO[]>;
  getAvailableUsers: () => Promise<ICFABankUserDTO[]>;
}
