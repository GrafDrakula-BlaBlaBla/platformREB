import {Params} from 'router5/dist/types/base';
import {IAPIModule} from '../../../../InfrastructureLayer/APIModule/interfaces';
import {
  ICFACreditContractDTO,
  ICFAExportContractDTO,
  ICFAGeneralAgreementDTO,
  ICFARequestDTO,
  ICFAItemDTO,
  ICFABankUserDTO,
  ICFAExportContractPreliminaryDTO,
} from '../../../../Model/CFA_Deal';
import {ICFA_DealAPIClient} from '../interfaces';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {IAttachmentDTO} from '../../../../Model/Attachment';
import {d_BaseList} from '../../../Decorators/d_BaseList';
import {injectable} from 'inversify';
import {
  CFA_CREDIT_CONTRACT_MOCK,
  CFA_GENERAL_AGREEMENT_MOCK,
  CFA_ITEMS_MOCK,
  CFA_REQUEST_MOCK,
  EXPORT_CONTRACT_PRELIMINARY,
  generateExportContractPreliminary,
} from '../../../../Model/CFA_Deal/mock';

@injectable()
export class CFA_DealAPIClient implements ICFA_DealAPIClient {
  protected apiModule!: IAPIModule;
  protected urlPrefix!: string;

  @d_BaseList
  async getItems(params?: Params): Promise<IBaseListDTO<ICFAItemDTO>> {
    if (process.env.REACT_APP_MOCK) {
      return new Promise<IBaseListDTO<ICFAItemDTO>>((resolve) =>
        setTimeout(
          () => resolve({items: CFA_ITEMS_MOCK, total: CFA_ITEMS_MOCK.length}),
          1000
        )
      );
    }
    return this.apiModule.getData<IBaseListDTO<ICFAItemDTO>>(
      `${this.urlPrefix}/bank`,
      params
    );
  }

  getRequest(id: string): Promise<ICFARequestDTO> {
    if (process.env.REACT_APP_MOCK) {
      return new Promise<ICFARequestDTO>((resolve) =>
        setTimeout(() => resolve(CFA_REQUEST_MOCK), 1000)
      );
    }
    return this.apiModule.getData<ICFARequestDTO>(`${this.urlPrefix}/${id}`);
  }

  async getGeneralAgreement(
    creditForAccreditiveId: string
  ): Promise<ICFAGeneralAgreementDTO | undefined> {
    if (process.env.REACT_APP_MOCK) {
      return new Promise<ICFAGeneralAgreementDTO>((resolve) =>
        setTimeout(() => resolve(CFA_GENERAL_AGREEMENT_MOCK), 1000)
      );
    }
    return this.apiModule.getData(
      `${this.urlPrefix}/${creditForAccreditiveId}/generalaggrement`
    );
  }

  saveGeneralAgreement = async (
    data: ICFAGeneralAgreementDTO
  ): Promise<ICFAGeneralAgreementDTO> => {
    if (process.env.NODE_ENV === 'development') {
      if (data.id) {
        return await this.apiModule.putData(
          `${this.urlPrefix}/${data.cfaId}/generalaggrement`,
          data
        );
      } else {
        return await this.apiModule.postData(
          `${this.urlPrefix}/${data.cfaId}/generalaggrement`,
          data
        );
      }
    }
    if (data.id) {
      return await this.apiModule.putData(
        `${this.urlPrefix}/${data.cfaId}/commercial/generalaggrement`,
        data
      );
    } else {
      return await this.apiModule.postData(
        `${this.urlPrefix}/${data.cfaId}/commercial/generalaggrement`,
        data
      );
    }
  };

  async getCreditContract(
    creditForAccreditiveId: string
  ): Promise<ICFACreditContractDTO | undefined> {
    if (process.env.REACT_APP_MOCK) {
      return new Promise<ICFACreditContractDTO>((resolve) =>
        setTimeout(() => resolve(CFA_CREDIT_CONTRACT_MOCK), 1000)
      );
    }
    return this.apiModule.getData(
      `${this.urlPrefix}/${creditForAccreditiveId}/creditagreement`
    );
  }

  saveCreditContract = async (
    data: ICFACreditContractDTO
  ): Promise<ICFACreditContractDTO> => {
    if (process.env.NODE_ENV === 'development') {
      if (data.id) {
        return await this.apiModule.putData(
          `${this.urlPrefix}/${data.cfaId}/creditagreement`,
          data
        );
      } else {
        return await this.apiModule.postData(
          `${this.urlPrefix}/${data.cfaId}/creditagreement`,
          data
        );
      }
    }
    if (data.id) {
      return await this.apiModule.putData(
        `${this.urlPrefix}/reb/${data.cfaId}/creditagreement`,
        data
      );
    } else {
      return await this.apiModule.postData(
        `${this.urlPrefix}/reb/${data.cfaId}/creditagreement`,
        data
      );
    }
  };

  getExportContractList(
    creditForAccreditiveId: number
  ): Promise<ICFAExportContractDTO[]> {
    return this.apiModule.getData<Array<ICFAExportContractDTO>>(
      `${this.urlPrefix}/${creditForAccreditiveId}/export-contract/list`
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
    >(`${this.urlPrefix}/${id}/preliminary-сontracts`);
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
    >(`${this.urlPrefix}/${id}/preliminary-сontracts`, data);
  };

  editExportContractPreliminary = async (
    id: string,
    contractId: string,
    data: ICFAExportContractPreliminaryDTO
  ): Promise<void> => {
    this.apiModule.putData(
      `${this.urlPrefix}/${id}/preliminary-сontracts${contractId}`,
      data
    );
  };

  deleteExportContractPreliminary = async (
    id: string,
    contractId: string
  ): Promise<void> => {
    this.apiModule.deleteData(
      `${this.urlPrefix}/${id}/preliminary-сontracts${contractId}`
    );
  };

  @d_BaseList
  async getDocumentList(
    id: string,
    searchParams: Params
  ): Promise<IBaseListDTO<IAttachmentDTO>> {
    return this.apiModule.getData<IBaseListDTO<IAttachmentDTO>>(
      `${this.urlPrefix}/${id}/documents`,
      searchParams
    );
  }

  async downloadDocument(objectId: string, documentId: string): Promise<void> {
    return this.apiModule.downloadFile(
      `${this.urlPrefix}/${objectId}/documents/download/${documentId}`
    );
  }

  async downloadDocuments(
    objectId: string,
    documentIds: string[]
  ): Promise<void> {
    return this.apiModule.downloadFile(
      `${
        this.urlPrefix
      }/${objectId}/documents/zip?attachments=${documentIds.join(',')}`
    );
  }

  async downloadDocumentsAll(objectId: string): Promise<void> {
    return this.apiModule.downloadFile(
      `${this.urlPrefix}/${objectId}/documents/download-all`
    );
  }

  attachCFAUsers = (cfaId: string, userIds: string[]): Promise<unknown> => {
    return new Promise<unknown>((resolve) => setTimeout(resolve, 1000));
  };
  getAvailableCFAUsers = (cfaId: string): Promise<ICFABankUserDTO[]> => {
    return new Promise<ICFABankUserDTO[]>((resolve) =>
      setTimeout(resolve, 1000)
    );
  };
}
