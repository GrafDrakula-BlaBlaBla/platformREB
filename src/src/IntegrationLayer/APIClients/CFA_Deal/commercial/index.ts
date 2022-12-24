import {Params} from 'router5/dist/types/base';
import mockSession, {session_kb_mock} from '../../../../Model/Session/mock';
import {IAPIModule} from '../../../../InfrastructureLayer/APIModule/interfaces';
import {
  ICFABankUserDTO,
  ICFACreditContractDTO,
  ICFAExportContractDTO,
  ICFAExportContractPreliminaryDTO,
  ICFAGeneralAgreementDTO,
  ICFAItemDTO,
  ICFARequestDTO,
  ICFARequestParametersDTO,
} from '../../../../Model/CFA_Deal';
import {CFA_DealAPIClient} from '../base';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {ICFA_DealComAPIClient} from '../interfaces';
import {IAttachmentDTO} from '../../../../Model/Attachment';
import {d_BaseList} from '../../../Decorators/d_BaseList';
import {INFRASTRUCTURE_MODULE} from '../../../../InfrastructureLayer/identifiers';
import {inject, injectable} from 'inversify';
import {
  EXPORT_CONTRACT_MOCK,
  EXPORT_CONTRACT_PRELIMINARY,
  generateExportContractPreliminary,
} from '../../../../Model/CFA_Deal/mock';
import {CFA_BANK_USERS_MOCK} from '../../../../Model/CFA_Deal/mock';

@injectable()
export class CFA_DealComAPIClient
  extends CFA_DealAPIClient
  implements ICFA_DealComAPIClient {
  protected urlPrefix: string = 'credit-for-accreditive';

  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;

  @d_BaseList
  async getDocumentList(
    id: string,
    searchParams: Params
  ): Promise<IBaseListDTO<IAttachmentDTO>> {
    if (process.env.NODE_ENV === 'development') {
      return super.getDocumentList(id, searchParams);
    }
    return this.apiModule.getData<IBaseListDTO<IAttachmentDTO>>(
      `${this.urlPrefix}/commercial/${id}/documents`,
      searchParams
    );
  }

  downloadDocument = async (
    objectId: string,
    documentId: string
  ): Promise<void> => {
    if (process.env.NODE_ENV === 'development') {
      return super.downloadDocument(objectId, documentId);
    }
    return this.apiModule.downloadFile(
      `${this.urlPrefix}/commercial/${objectId}/documents/download/${documentId}`
    );
  };

  downloadDocuments = async (
    objectId: string,
    documentIds: string[]
  ): Promise<void> => {
    if (process.env.NODE_ENV === 'development') {
      return super.downloadDocuments(objectId, documentIds);
    }
    return this.apiModule.downloadFile(
      `${
        this.urlPrefix
      }/commercial/${objectId}/documents/zip?attachments=${documentIds.join(
        ','
      )}`
    );
  };

  downloadDocumentsAll = async (objectId: string): Promise<void> => {
    if (process.env.NODE_ENV === 'development') {
      return super.downloadDocumentsAll(objectId);
    }
    return this.apiModule.downloadFile(
      `${this.urlPrefix}/commercial/${objectId}/documents/download-all`
    );
  };

  @d_BaseList
  async getItems(queryParams?: Params): Promise<IBaseListDTO<ICFAItemDTO>> {
    if (process.env.REACT_APP_MOCK) {
      return super.getItems(queryParams);
    }
    if (process.env.NODE_ENV === 'development') {
      if (!queryParams) queryParams = {};
      queryParams.bankId = mockSession?.bank.objectId;
      queryParams.bankType = 'COM';
      return this.apiModule.getData<IBaseListDTO<ICFAItemDTO>>(
        `${this.urlPrefix}/commercial/bank`,
        queryParams
      );
    }
    return this.apiModule.getData<IBaseListDTO<ICFAItemDTO>>(
      `${this.urlPrefix}/commercial/bank`,
      queryParams
    );
  }

  getRequest(id: string): Promise<ICFARequestDTO> {
    if (process.env.REACT_APP_MOCK) {
      return super.getRequest(id);
    }
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.getData<ICFARequestDTO>(
        `${this.urlPrefix}/commercial/${id}`,
        {bankId: session_kb_mock?.bank.objectId}
      );
    }
    return this.apiModule.getData<ICFARequestDTO>(
      `${this.urlPrefix}/commercial/${id}`
    );
  }

  saveRequestParameters(
    id: string,
    data: ICFARequestParametersDTO
  ): Promise<ICFARequestParametersDTO> {
    return this.apiModule.putData(`${this.urlPrefix}/commercial/${id}`, data);
  }

  getGeneralAgreement = async (
    creditForAccreditiveId: string
  ): Promise<ICFAGeneralAgreementDTO | undefined> => {
    if (process.env.REACT_APP_MOCK) {
      return super.getGeneralAgreement(creditForAccreditiveId);
    }
    if (process.env.NODE_ENV === 'development') {
      return super.getGeneralAgreement(creditForAccreditiveId);
    }
    return this.apiModule.getData(
      `${this.urlPrefix}/commercial/${creditForAccreditiveId}/generalagreement`
    );
  };

  getCreditContract = async (
    creditForAccreditiveId: string
  ): Promise<ICFACreditContractDTO | undefined> => {
    if (process.env.REACT_APP_MOCK) {
      return super.getCreditContract(creditForAccreditiveId);
    }
    if (process.env.NODE_ENV === 'development') {
      return super.getCreditContract(creditForAccreditiveId);
    }
    return this.apiModule.getData<ICFACreditContractDTO>(
      `${this.urlPrefix}/commercial/${creditForAccreditiveId}/creditagreement`
    );
  };

  deleteDocuments = (
    objectId: string,
    documentIds: string[]
  ): Promise<void> => {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.deleteData(`${this.urlPrefix}/documents`, {
        userId: mockSession?.user.id as string,
        creditId: objectId,
        attachmentIds: documentIds,
      });
    }
    return this.apiModule.deleteData(`${this.urlPrefix}/commercial/documents`, {
      creditId: objectId,
      attachmentIds: documentIds,
    });
  };
  uploadDocuments = (reqDTO: FormData): Promise<IAttachmentDTO[]> => {
    if (process.env.NODE_ENV === 'development') {
      reqDTO.append('userId', mockSession?.user.id as string);
      return this.apiModule.postFormData(
        `${this.urlPrefix}/documents/upload`,
        reqDTO
      );
    }
    return this.apiModule.postFormData(
      `${this.urlPrefix}/commercial/documents/upload`,
      reqDTO
    );
  };

  getExportContractList(
    creditForAccreditiveId: number
  ): Promise<ICFAExportContractDTO[]> {
    if (process.env.REACT_APP_MOCK) {
      return new Promise((res) => {
        res([EXPORT_CONTRACT_MOCK, EXPORT_CONTRACT_MOCK]);
      });
    }
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.getData<Array<ICFAExportContractDTO>>(
        `${this.urlPrefix}/commercial/${creditForAccreditiveId}/export-contract/list`,
        {bankId: session_kb_mock?.bank.objectId}
      );
    }
    return this.apiModule.getData<Array<ICFAExportContractDTO>>(
      `${this.urlPrefix}/commercial/${creditForAccreditiveId}/export-contract/list`
    );
  }

  getExportContractPreliminaryList(
    id: string
  ): Promise<IBaseListDTO<ICFAExportContractPreliminaryDTO>> {
    if (process.env.REACT_APP_MOCK) {
      const items = [EXPORT_CONTRACT_PRELIMINARY];
      return new Promise((res, rej) => {
        res({items: items, total: items.length});
      });
    }

    return this.apiModule.getData<
      IBaseListDTO<ICFAExportContractPreliminaryDTO>
    >(`${this.urlPrefix}/commercial/${id}/preliminary-сontracts`);
  }

  createExportContractPreliminary = async (
    id: string,
    data: Omit<ICFAExportContractPreliminaryDTO, 'id'>
  ): Promise<ICFAExportContractPreliminaryDTO> => {
    if (process.env.REACT_APP_MOCK) {
      return new Promise((res) => {
        setTimeout(() => {
          res(generateExportContractPreliminary(data));
        }, 1000);
      });
    }
    return this.apiModule.postData<
      ICFAExportContractPreliminaryDTO,
      Omit<ICFAExportContractPreliminaryDTO, 'id'>
    >(`${this.urlPrefix}/commercial/${id}/preliminary-сontracts`, data);
  };

  editExportContractPreliminary = async (
    id: string,
    contractId: string,
    data: ICFAExportContractPreliminaryDTO
  ): Promise<void> => {
    this.apiModule.putData(
      `${this.urlPrefix}/commercial/${id}/preliminary-сontracts${contractId}`,
      data
    );
  };

  deleteExportContractPreliminary = async (
    id: string,
    contractId: string
  ): Promise<void> => {
    this.apiModule.deleteData(
      `${this.urlPrefix}/commercial/${id}/preliminary-сontracts${contractId}`
    );
  };

  attachCFAUsers = (cfaId: string, userIds: string[]): Promise<unknown> => {
    return this.apiModule.putData(
      `${this.urlPrefix}/commercial/${cfaId}/available-users`,
      userIds
    );
  };
  getAvailableCFAUsers = (cfaId: string): Promise<ICFABankUserDTO[]> => {
    if (process.env.REACT_APP_MOCK) {
      return new Promise<ICFABankUserDTO[]>((resolve) =>
        setTimeout(() => resolve(CFA_BANK_USERS_MOCK), 1000)
      );
    }
    return this.apiModule.getData(
      `${this.urlPrefix}/commercial/${cfaId}/available-users`
    );
  };
  getAvailableUsers = (bankId: string): Promise<ICFABankUserDTO[]> => {
    if (process.env.REACT_APP_MOCK) {
      return new Promise<ICFABankUserDTO[]>((resolve) =>
        setTimeout(() => resolve(CFA_BANK_USERS_MOCK), 1000)
      );
    }
    return this.apiModule.getData(
      `${this.urlPrefix}/commercial/available-users`,
      {bankId: bankId}
    );
  };

  getControllers = (): Promise<ICFABankUserDTO[]> => {
    if (process.env.REACT_APP_MOCK) {
      return new Promise<ICFABankUserDTO[]>((resolve) =>
        setTimeout(() => resolve(CFA_BANK_USERS_MOCK), 1000)
      );
    }
    return this.apiModule.getData(`${this.urlPrefix}/banks/controller`);
  };
  attachControllers = (cfaId: string, userIds: string[]): Promise<unknown> => {
    if (process.env.REACT_APP_MOCK) {
      return new Promise<unknown>((resolve) =>
        setTimeout(() => resolve(false), 1000)
      );
    }
    return this.apiModule.putData(
      `${this.urlPrefix}/commercial/${cfaId}/attach-controllers`,
      userIds
    );
  };

  // @todo: методы approveDeal и returnDeal являются моковыми, как только аналитика будет готова их нужно будет привести в соответствии с бэком
  approveDeal = () => {
    return new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
  };
  returnDeal = (value?: string) => {
    console.log('returnDeal', value);
    return new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
  };
}
