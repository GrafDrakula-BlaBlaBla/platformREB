import {ICFA_DraftAPIClient} from './interfaces';
import {IAPIModule} from '../../../InfrastructureLayer/APIModule/interfaces';
import {Params} from 'router5/dist/types/base';
import {IBaseListDTO} from '../../../Model/BaseList';
import {
  ICFADraftDTO,
  ICFADraftExportContractDTO,
} from '../../../Model/CFA_Draft';
import mockSession from '../../../Model/Session/mock';
import {IAttachmentDTO} from '../../../Model/Attachment';
import {d_BaseList} from '../../Decorators/d_BaseList';
import {inject, injectable} from 'inversify';
import {INFRASTRUCTURE_MODULE} from '../../../InfrastructureLayer/identifiers';
import {CFA_DRAFT_MOCK} from '../../../Model/CFA_Draft/mock';

@injectable()
export class CFA_DraftAPIClient implements ICFA_DraftAPIClient {
  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;
  protected urlPrefix: string = 'credit-for-accreditive/draft';

  @d_BaseList
  async getDrafts(params?: Params): Promise<IBaseListDTO<ICFADraftDTO>> {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.getData<IBaseListDTO<ICFADraftDTO>>(
        `${this.urlPrefix}/commercial/list`,
        {
          bankInfoId: mockSession?.bank.objectId,
          ...params,
        }
      );
    }
    return this.apiModule.getData<IBaseListDTO<ICFADraftDTO>>(
      `${this.urlPrefix}/commercial/list`,
      params
    );
  }
  getDraft = (draftId: string): Promise<ICFADraftDTO> => {
    if (process.env.REACT_APP_MOCK) {
      return new Promise((res) => {
        setTimeout(() => {
          res(CFA_DRAFT_MOCK);
        }, 1000);
      });
    }
    return this.apiModule.getData(`${this.urlPrefix}/commercial/${draftId}`);
  };

  createDraft = (data: ICFADraftDTO): Promise<ICFADraftDTO> => {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule
        .postData<ICFADraftDTO>(`${this.urlPrefix}/commercial`, {
          ...data,
          bankInfoId: mockSession?.bank.objectId,
          draftOwner: mockSession?.user.id,
        })
        .catch(this.errorHandlerCreateExecuteDraft);
    }
    return this.apiModule
      .postData<ICFADraftDTO>(`${this.urlPrefix}/commercial`, data)
      .catch(this.errorHandlerCreateExecuteDraft);
  };
  createDraftFromDeal = (dealId: string): Promise<ICFADraftDTO> => {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule
        .postData<ICFADraftDTO>(
          `${this.urlPrefix}/commercial/from-deal/${dealId}`,
          undefined,
          {
            bankId: mockSession?.bank.objectId,
            userId: mockSession?.user.id,
          }
        )
        .catch(this.errorHandlerCreateDraftFromDeal);
    }
    return this.apiModule.postData<ICFADraftDTO>(
      `${this.urlPrefix}/commercial/from-deal/${dealId}`
    );
  };
  updateDraft = (
    draftId: string,
    data: ICFADraftDTO
  ): Promise<ICFADraftDTO> => {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.putData<ICFADraftDTO>(
        `${this.urlPrefix}/commercial/${draftId}`,
        {
          ...data,
          bankInfoId: mockSession?.bank.objectId,
        },
        {
          userId: mockSession?.user.id,
        }
      );
    }
    return this.apiModule.putData<ICFADraftDTO>(
      `${this.urlPrefix}/commercial/${draftId}`,
      data
    );
  };
  executeDraft = (draftId: string): Promise<ICFADraftDTO> => {
    return this.apiModule
      .postData<ICFADraftDTO>(`${this.urlPrefix}/commercial/${draftId}/execute`)
      .catch(this.errorHandlerCreateExecuteDraft);
  };
  deleteDraft = (draftId: string): Promise<ICFADraftDTO> => {
    return this.apiModule.postData(
      `${this.urlPrefix}/commercial/${draftId}/cancel`
    );
  };

  errorHandlerCreateDraftFromDeal = (err: any) => {
    return Promise.reject(
      !Number.isInteger(err.status) && !err.errorMessage
        ? {errorMessage: 'Черновик редактирует другой пользователь'}
        : err
    );
  };
  errorHandlerCreateExecuteDraft = (err: any) => {
    return Promise.reject(
      !Number.isInteger(err.status) && !err.errorMessage
        ? {errorMessage: 'Сделка с таким RequestID уже существет'}
        : err
    );
  };

  @d_BaseList
  async getDocuments(
    draftId: string,
    params: Params
  ): Promise<IBaseListDTO<IAttachmentDTO>> {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.getData<IBaseListDTO<IAttachmentDTO>>(
        `${this.urlPrefix}/commercial/${draftId}/documents`,
        {
          bankId: mockSession?.bank.objectId,
          ...params,
        }
      );
    }
    return this.apiModule.getData<IBaseListDTO<IAttachmentDTO>>(
      `${this.urlPrefix}/commercial/${draftId}/documents`,
      params
    );
  }

  deleteDocument = (draftId: string, documentId: string): Promise<void> => {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.deleteData(
        `${this.urlPrefix}/commercial/${draftId}/documents/${documentId}`,
        {
          userId: mockSession?.user.id,
        }
      );
    }
    return this.apiModule.deleteData(
      `${this.urlPrefix}/commercial/${draftId}/documents/${documentId}`
    );
  };

  uploadDocuments = (
    draftId: string,
    reqDTO: FormData
  ): Promise<IAttachmentDTO[]> => {
    if (process.env.NODE_ENV === 'development') {
      reqDTO.append('userId', mockSession?.user.id as string);
    }
    return this.apiModule.postFormData(
      `${this.urlPrefix}/commercial/${draftId}/documents/upload`,
      reqDTO
    );
  };

  downloadDocument = (draftId: string, documentId: string): void => {
    return this.apiModule.downloadFile(
      `credit-for-accreditive/${draftId}/documents/download/${documentId}`
    );
  };
  downloadDocuments = (draftId: string, documentIds: string[]): void => {
    return this.apiModule.downloadFile(
      `credit-for-accreditive/${draftId}/documents/zip?attachments=${documentIds.join(
        ','
      )}`
    );
  };
  downloadDocumentsAll = (draftId: string): void => {
    return this.apiModule.downloadFile(
      `credit-for-accreditive/${draftId}/documents/download-all`
    );
  };

  getExportContracts = (
    draftId: string
  ): Promise<ICFADraftExportContractDTO[]> => {
    return this.apiModule.getData<ICFADraftExportContractDTO[]>(
      `${this.urlPrefix}/commercial/${draftId}/export-contract/list`
    );
  };

  createExportContract = (
    draftId: string,
    data: ICFADraftExportContractDTO
  ): Promise<ICFADraftExportContractDTO> => {
    return this.apiModule.postData<ICFADraftExportContractDTO>(
      `${this.urlPrefix}/commercial/${draftId}/export-contract`,
      data
    );
  };

  updateExportContract = (
    draftId: string,
    exportContractId: string,
    data: ICFADraftExportContractDTO
  ): Promise<ICFADraftExportContractDTO> => {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.putData<ICFADraftExportContractDTO>(
        `${this.urlPrefix}/commercial/${draftId}/export-contract/${exportContractId}`,
        data,
        {
          userId: mockSession?.user.id,
        }
      );
    }
    return this.apiModule.putData<ICFADraftExportContractDTO>(
      `${this.urlPrefix}/commercial/${draftId}/export-contract/${exportContractId}`,
      data
    );
  };

  deleteExportContract = (draftId: string, id: string): Promise<void> => {
    return this.apiModule.deleteData(
      `${this.urlPrefix}/commercial/${draftId}/export-contract/${id}`
    );
  };
}
