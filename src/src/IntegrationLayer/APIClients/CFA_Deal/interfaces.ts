import {Params} from 'router5/dist/types/base';
import {
  IActualBankCFADTO,
  ICFABankUserDTO,
  ICFACreditContractDTO,
  ICFAExportContractDTO,
  ICFAExportContractPreliminaryDTO,
  ICFAGeneralAgreementDTO,
  ICFAItemDTO,
  ICFARequestDTO,
  ICFARequestParametersDTO,
} from '../../../Model/CFA_Deal';
import {IBaseListDTO} from '../../../Model/BaseList';
import {IAttachmentDTO} from '../../../Model/Attachment';

export interface ICFA_DealAPIClient {
  getDocumentList: (
    objectId: string,
    searchParams: Params
  ) => Promise<IBaseListDTO<IAttachmentDTO>>;
  downloadDocument: (objectId: string, documentId: string) => void;
  downloadDocuments: (objectId: string, documentIds: string[]) => void;
  downloadDocumentsAll: (objectId: string) => void;

  getItems: (queryParams?: Params) => Promise<IBaseListDTO<ICFAItemDTO>>;

  getRequest(id: string): Promise<ICFARequestDTO>;

  getGeneralAgreement(
    creditForAccreditiveId: string
  ): Promise<ICFAGeneralAgreementDTO | undefined>;
  saveGeneralAgreement(
    data: ICFAGeneralAgreementDTO
  ): Promise<ICFAGeneralAgreementDTO>;

  getCreditContract(
    creditForAccreditiveId: string | number
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

export interface ICFA_DealComAPIClient extends ICFA_DealAPIClient {
  getAvailableUsers: (bankId: string) => Promise<ICFABankUserDTO[]>;
  saveRequestParameters(
    id: string,
    data: ICFARequestParametersDTO
  ): Promise<ICFARequestParametersDTO>;

  getControllers: () => Promise<ICFABankUserDTO[]>;
  attachControllers: (cfaId: string, userIds: string[]) => Promise<unknown>;

  // @todo: методы approveDeal и returnDeal являются моковыми, как только аналитика будет готова их нужно будет привести в соответствии с бэком
  approveDeal: () => Promise<void>;
  returnDeal: (value?: string) => Promise<void>;
}

export interface ICFA_DealRebAPIClient extends ICFA_DealAPIClient {
  getActualBankList: () => Promise<IActualBankCFADTO[]>;
  getAvailableUsers: () => Promise<ICFABankUserDTO[]>;
}
