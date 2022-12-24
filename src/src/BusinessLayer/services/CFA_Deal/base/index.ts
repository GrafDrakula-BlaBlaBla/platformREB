import {Params} from 'router5/dist/types/base';
import moment from 'moment';
import fileSize from 'filesize';
import {
  ECFACreditLineType,
  ECFAStatuses,
  ICFABankUserDTO,
  ICFACreditContractDTO,
  ICFAExportContractDTO,
  ICFAGeneralAgreementDTO,
  ICFAItemDTO,
  ICFARequestDTOExtend,
  ICFAExportContractPreliminaryDTO,
  IExportConfirmedDocument,
} from '../../../../Model/CFA_Deal';
import {ISession} from '../../../../Bootstrap/Session/interfaces';
import {ICFA_DealService} from '../interfaces';
import {BaseListService} from '../../BaseList';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {EAttachmentStatus, IAttachmentDTO} from '../../../../Model/Attachment';
import {ICFA_DealAPIClient} from '../../../../IntegrationLayer/APIClients/CFA_Deal';
import {injectable} from 'inversify';
import {uuidv4} from '../../../../Utils/Uid';

const dateFormat = 'DD.MM.YYYY';

@injectable()
export class CFA_DealService
  extends BaseListService<ICFAItemDTO, ICFA_DealAPIClient>
  implements ICFA_DealService {
  protected APIClient!: ICFA_DealAPIClient;
  protected session!: ISession;

  getRequest = async (id: string): Promise<ICFARequestDTOExtend> => {
    const request = (await this.APIClient.getRequest(
      id
    )) as ICFARequestDTOExtend;
    if (request) request.isDone = request.status === ECFAStatuses.DONE;
    if (request) {
      if (request.revolving === true) {
        request.creditLineType = ECFACreditLineType.VKL;
      } else if (request.revolving === false) {
        request.creditLineType = ECFACreditLineType.VKL;
      }
    }
    return request;
  };

  downloadDocument(objectId: string, documentId: string): void {
    return this.APIClient.downloadDocument(objectId, documentId);
  }
  downloadDocuments(objectId: string, documentIds: string[]): void {
    return this.APIClient.downloadDocuments(objectId, documentIds);
  }
  downloadDocumentsAll(objectId: string): void {
    return this.APIClient.downloadDocumentsAll(objectId);
  }

  getGeneralAgreement = async (
    cfaId: string
  ): Promise<ICFAGeneralAgreementDTO | undefined> => {
    const data = await this.APIClient.getGeneralAgreement(cfaId);
    let ga: ICFAGeneralAgreementDTO | undefined;
    if (data) {
      ga = {...data} as ICFAGeneralAgreementDTO;
      ga.isValid = true;
      ga.isValidIssued = true;
      ga.isValidPaidFor = true;
      ga.conclusionDt = formatDateToString(ga.conclusionDt);
      ga.endDate = formatDateToString(ga.endDate);
      ga.plannedFeePaymentDate = formatDateToString(ga.plannedFeePaymentDate);
      ga.factFeePaymentDate = formatDateToString(ga.factFeePaymentDate);
      ga.issued?.forEach((d) => {
        d.changedDate = formatDateToString(d.changedDate);
        d.tempId = uuidv4();
      });
      ga.paidFor?.forEach((d) => {
        d.changedDate = formatDateToString(d.changedDate);
        d.tempId = uuidv4();
      });
    }
    return ga;
  };
  saveGeneralAgreement(
    data: ICFAGeneralAgreementDTO
  ): Promise<ICFAGeneralAgreementDTO> {
    const {
      creditLineTypeValue,
      tnSumm,
      tnCodes,
      isValid,
      isValidIssued,
      isValidPaidFor,
      ...ga
    } = {
      ...data,
    } as ICFAGeneralAgreementDTO;
    ga.conclusionDt = formatStringToDate(data.conclusionDt);
    ga.endDate = formatStringToDate(data.endDate);
    ga.plannedFeePaymentDate = formatStringToDate(data.plannedFeePaymentDate);
    ga.factFeePaymentDate = formatStringToDate(data.factFeePaymentDate);
    ga.issued = [...ga.issued].map((d) => {
      return {
        id: d.id,
        amount: d.amount,
        changedDate: formatStringToDate(d.changedDate),
      };
    });
    ga.paidFor = [...ga.paidFor].map((d) => {
      return {
        id: d.id,
        amount: d.amount,
        changedDate: formatStringToDate(d.changedDate),
      };
    });
    return this.APIClient.saveGeneralAgreement(ga);
  }

  getCreditContract = async (
    creditForAccreditiveId: string | number
  ): Promise<ICFACreditContractDTO | undefined> => {
    const data = await this.APIClient.getCreditContract(creditForAccreditiveId);
    let cc: ICFACreditContractDTO | undefined;
    if (data) {
      cc = {...data} as ICFACreditContractDTO;
      cc.isValid = true;
      cc.isValidIssued = true;
      cc.isValidPaidFor = true;
      cc.conclusionDt = formatDateToString(cc.conclusionDt);
      cc.endDate = formatDateToString(cc.endDate);
      cc.issued?.forEach((d) => {
        d.changedDate = formatDateToString(d.changedDate);
        d.maurityDate = formatDateToString(d.maurityDate);
        d.tempId = uuidv4();
      });
      cc.paidFor?.forEach((d) => {
        d.changedDate = formatDateToString(d.changedDate);
        d.tempId = uuidv4();
      });
    }
    return cc;
  };
  saveCreditContract(
    data: ICFACreditContractDTO
  ): Promise<ICFACreditContractDTO> {
    const {
      creditLineTypeValue,
      tnCodes,
      isValid,
      isValidIssued,
      isValidPaidFor,
      ...cc
    } = {
      ...data,
    } as ICFACreditContractDTO;
    cc.conclusionDt = formatStringToDate(data.conclusionDt);
    cc.endDate = formatStringToDate(data.endDate);
    cc.issued = [...cc.issued].map((d) => {
      return {
        id: d.id,
        amount: d.amount,
        changedDate: formatStringToDate(d.changedDate),
        maurityDate: formatStringToDate(d.maurityDate),
        tranchNumber: d.tranchNumber,
      };
    });
    cc.paidFor = [...cc.paidFor].map((d) => {
      return {
        id: d.id,
        amount: d.amount,
        changedDate: formatStringToDate(d.changedDate),
      };
    });
    return this.APIClient.saveCreditContract(cc);
  }

  getExportContractList = async (
    creditForAccreditiveId: number
  ): Promise<ICFAExportContractDTO[]> => {
    let exportContractList = await this.APIClient.getExportContractList(
      creditForAccreditiveId
    );
    if (exportContractList) {
      exportContractList = exportContractList.map(mapExportContractToView);
    }

    return exportContractList;
  };

  getExportContractPreliminaryList(
    id: string
  ): Promise<IBaseListDTO<ICFAExportContractPreliminaryDTO>> {
    return this.APIClient.getExportContractPreliminaryList(id);
  }

  createExportContractPreliminary = async (
    id: string,
    data: Omit<ICFAExportContractPreliminaryDTO, 'id'>
  ): Promise<ICFAExportContractPreliminaryDTO> => {
    return this.APIClient.createExportContractPreliminary(id, data);
  };

  editExportContractPreliminary = async (
    id: string,
    contractId: string,
    data: ICFAExportContractPreliminaryDTO
  ): Promise<void> => {
    this.APIClient.editExportContractPreliminary(id, contractId, data);
  };

  deleteExportContractPreliminary = async (
    id: string,
    contractId: string
  ): Promise<void> => {
    this.APIClient.deleteExportContractPreliminary(id, contractId);
  };

  getDocumentList = async (
    id: string,
    searchParams: Params
  ): Promise<IBaseListDTO<IAttachmentDTO>> => {
    const docs = await this.APIClient.getDocumentList(id, searchParams);
    docs.items = docs.items.map(this.attachmentDtoExtend);
    return docs;
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
    } as IAttachmentDTO;
  };

  attachCFAUsers = (cfaId: string, userIds: string[]): Promise<unknown> => {
    return this.APIClient.attachCFAUsers(cfaId, userIds);
  };
  getAvailableCFAUsers = (cfaId: string): Promise<ICFABankUserDTO[]> => {
    return this.APIClient.getAvailableCFAUsers(cfaId);
  };
}

function mapExportContractToView(
  exportContract: ICFAExportContractDTO
): ICFAExportContractDTO {
  const dateFields: Array<keyof IExportConfirmedDocument> = [
    'dateOfExportContract',
  ];
  const exportContractWithDatesFormat = mapDateToString<
    IExportConfirmedDocument
  >(exportContract.exportConfirmedDocument, dateFields);

  return {...exportContract, ...exportContractWithDatesFormat};
}

function mapDateToString<T>(data: T, fields: Array<keyof T>): T {
  const linkToData = data as {[key in keyof T]?: string};
  fields.forEach((item) => {
    linkToData[item] = formatDateToString(data[item]);
  });
  return linkToData as T;
}

function formatDateToString(date: any): string | undefined {
  if (moment(date, dateFormat).isValid()) return date;
  const value = date as Date;
  return value ? moment(value).format(dateFormat) : undefined;
}

function formatStringToDate(date: any): Date | undefined {
  const value = date as string;
  return value ? moment(value, dateFormat).toDate() : undefined;
}
