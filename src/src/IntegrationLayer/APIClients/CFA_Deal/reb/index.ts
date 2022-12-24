import {Params} from 'router5/dist/types/base';
import {IAPIModule} from '../../../../InfrastructureLayer/APIModule/interfaces';
import {
  IActualBankCFADTO,
  ICFABankUserDTO,
  ICFACreditContractDTO,
  ICFAExportContractDTO,
  ICFAExportContractPreliminaryDTO,
  ICFAGeneralAgreementDTO,
  ICFAItemDTO,
  ICFARequestDTO,
} from '../../../../Model/CFA_Deal';
import {CFA_DealAPIClient} from '../base';
import {ICFA_DealRebAPIClient} from '../interfaces';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {IAttachmentDTO} from '../../../../Model/Attachment';
import {session_reb_mock} from '../../../../Model/Session/mock';
import {
  CFA_BANK_USERS_MOCK,
  EXPORT_CONTRACT_MOCK,
  EXPORT_CONTRACT_PRELIMINARY,
  generateExportContractPreliminary,
} from '../../../../Model/CFA_Deal/mock';
import {d_BaseList} from '../../../Decorators/d_BaseList';
import {inject, injectable} from 'inversify';
import {INFRASTRUCTURE_MODULE} from '../../../../InfrastructureLayer/identifiers';

@injectable()
export class CFA_DealRebAPIClient
  extends CFA_DealAPIClient
  implements ICFA_DealRebAPIClient {
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
      `${this.urlPrefix}/reb/${id}/documents`,
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
      `${this.urlPrefix}/reb/${objectId}/documents/download/${documentId}`
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
      }/reb/${objectId}/documents/zip?attachments=${documentIds.join(',')}`
    );
  };

  downloadDocumentsAll = async (objectId: string): Promise<void> => {
    if (process.env.NODE_ENV === 'development') {
      return super.downloadDocumentsAll(objectId);
    }
    return this.apiModule.downloadFile(
      `${this.urlPrefix}/reb/${objectId}/documents/download-all`
    );
  };

  @d_BaseList
  async getItems(params?: Params): Promise<IBaseListDTO<ICFAItemDTO>> {
    if (process.env.REACT_APP_MOCK) {
      return super.getItems(params);
    }
    if (process.env.NODE_ENV === 'development') {
      if (!params) params = {};
      params.bankType = 'REB';
      return this.apiModule.getData(`${this.urlPrefix}/reb/bank`, params);
    }
    return this.apiModule.getData<IBaseListDTO<ICFAItemDTO>>(
      `${this.urlPrefix}/reb/bank`,
      params
    );
  }

  getRequest(id: string): Promise<ICFARequestDTO> {
    if (process.env.REACT_APP_MOCK) {
      return super.getRequest(id);
    }
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.getData<ICFARequestDTO>(
        `${this.urlPrefix}/reb/${id}`,
        {bankId: session_reb_mock.bank.objectId}
      );
    }
    return this.apiModule.getData<ICFARequestDTO>(
      `${this.urlPrefix}/reb/${id}`
    );
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
      `${this.urlPrefix}/reb/${creditForAccreditiveId}/generalaggrement`
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
      `${this.urlPrefix}/reb/${creditForAccreditiveId}/creditagreement`
    );
  };

  getExportContractList(
    creditForAccreditiveId: number
  ): Promise<ICFAExportContractDTO[]> {
    if (process.env.NODE_ENV === 'development') {
      //todo: в swagger-e бэка нет эндоинта и временно будем использовать мок
      // return this.apiModule.getData<Array<ICFAExportContractDTO>>(
      //   `${this.urlPrefix}/reb/${creditForAccreditiveId}/export-contract/list`,
      //   {bankId: session_reb_mock.bank.objectId}
      // );
      return new Promise((resolve, _) => {
        resolve([EXPORT_CONTRACT_MOCK]);
      });
    }
    return this.apiModule.getData<Array<ICFAExportContractDTO>>(
      `${this.urlPrefix}/reb/${creditForAccreditiveId}/export-contract/list`
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
    >(`${this.urlPrefix}/reb/${id}/preliminary-сontracts`);
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
    >(`${this.urlPrefix}/reb/${id}/preliminary-сontracts`, data);
  };

  editExportContractPreliminary = async (
    id: string,
    contractId: string,
    data: ICFAExportContractPreliminaryDTO
  ): Promise<void> => {
    this.apiModule.putData(
      `${this.urlPrefix}/reb/${id}/preliminary-сontracts${contractId}`,
      data
    );
  };

  deleteExportContractPreliminary = async (
    id: string,
    contractId: string
  ): Promise<void> => {
    this.apiModule.deleteData(
      `${this.urlPrefix}/reb/${id}/preliminary-сontracts${contractId}`
    );
  };

  getActualBankList = async (): Promise<IActualBankCFADTO[]> => {
    if (process.env.NODE_ENV === 'development')
      return this.apiModule.getData(`${this.urlPrefix}/reb/banks`);
    return this.apiModule.getData(`${this.urlPrefix}/reb/banks`);
  };

  attachCFAUsers = (cfaId: string, userIds: string[]): Promise<unknown> => {
    return this.apiModule.putData(
      `${this.urlPrefix}/reb/${cfaId}/available-users`,
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
      `${this.urlPrefix}/reb/${cfaId}/available-users`
    );
  };
  getAvailableUsers = (): Promise<ICFABankUserDTO[]> => {
    if (process.env.REACT_APP_MOCK) {
      return new Promise<ICFABankUserDTO[]>((resolve) =>
        setTimeout(() => resolve(CFA_BANK_USERS_MOCK), 1000)
      );
    }
    return this.apiModule.getData(`${this.urlPrefix}/reb/bank/available-users`);
  };
}
