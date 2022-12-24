export interface ICFAItemDTO {
  id: string;
  requestId: string;
  borrowerId: string;
  debtorID: string;
  fullName: string;
  inn: string;
  industry: string;
  individualCategory: string;
  tb: string;
  status: string;
  statusCode: string;
  generalAgreementStatus: string;
  draftId?: string;
  assignedEmployees?: ICFABankUserDTO[];
}
export interface ICFARequestParametersDTO {
  limitCreditAgreement?: number;
  revolving?: boolean;
  creditLineType?: ECFACreditLineType;
  currency?: string;
  loanRate?: number;
  loanCreditLine?: string;
  loanTranche?: string;
  financingType?: string;
  limitGeneralAgreement?: number;
  loanPeriodGeneralAgreement?: string;
  commission?: number;
}
export interface ICFARequestDTO extends ICFARequestParametersDTO {
  id: string;
  bankInfoId?: string;
  requestId?: string;
  status?: string;
  fullName?: string;
  inn?: string;
  industry?: string;
  individualCategory?: string;
  tb?: string;
  generalAgreementStatus?: ECFAGeneralAgreementStatus;
  deliveryCountry?: string;
  buyerCompanyName?: string;
  sourceType?: ECFASourceType;
  createdAt?: string;
  okved2?: string;
  createdDraftId?: string;
  assignedEmployees?: ICFABankUserDTO[];
  dealStepStatus?: ECFADealStep;
}
export interface ICFARequestDTOExtend extends ICFARequestDTO {
  isDone: boolean;
}

export interface ICFAExportContractDTO {
  objectId: string;
  title: string;
  exportConfirmedDocument: IExportConfirmedDocument;
}

export interface ICFAExportContractPreliminaryDTO {
  currency: string;
  contractNumber: string;
  dateOfContract: Date | string;
  sumContract: number;
  sumHiTech: number;
  tnCode: {code: string; id: string}[];
  productName: string;
  id: string;
}
export interface IExportConfirmedDocument {
  numberOfExportContract: string;
  dateOfExportContract: Date | string;
  contractSumm: number;
  currency: string;
  buyerCompanyName: string;
  buyerCompanyCountry: string;
  deliveryCountry: string;
  documentsShipmentProducts: string;
  documentsInfo: string;
  tdocumentsInfo: string;
  tnCodes: string;
  documentSumm: string;
  deliveredProducts: number;
  deliveredProductsForPeriod: number;
  paidProducts: number;
  paidProductsForPeriod: number;
}

export interface IActualBankCFADTO {
  bankName: string;
  bic: string;
  correspondentAcc: string;
  legalAddress: string;
  objectId: string;
  status: string;
}

export interface ICFABankUserDTO {
  id: string;
  name: string;
  patronymic: string;
  surname: string;
  totalDeals: number;
}

export enum ECFAStatuses {
  NEW = 'NEW',
  DOC = 'DOC',
  KO = 'KO',
  DONE = 'DONE',
  REJECT = 'REJECT',
}
export enum ECFASourceType {
  MANUAL = 'MANUAL',
  API = 'API',
}
export enum ECFAGeneralAgreementStatus {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
}
export enum ECFADealStep {
  CREATED = 'CREATED',
  CAN_SEND = 'CAN_SEND',
  SENDED = 'SENDED',
  APPROVED = 'APPROVED',
  ON_REVISION = 'ON_REVISION',
}

/* accreditive */
/**
 * @limit лимит ГС
 * @creditLineType тип кредитной линии creditLineTYpe.revolving ? VKL : NKL; creditLineType.fixed = true изменение блокируктеся
 * @creditLineTypeValue хранит значение кредитной линии VKL | NKL
 * @accreditiveNumber Номер аккредитива
 * @unusedLimit Неиспользованный лимит
 * @balance Остаток по аккредитиву
 * @sumPercent Сумма % за 90 дней, покрытая аккредитивом
 * @issued Сумма увеличений аккредитива
 * @paidFor Сумма уменьшений аккредитива
 * @agreementId Генеральное соглашение №
 * @conclusionDt Дата заключения
 * @endDate Плановая дата окончания
 * @loanPeriod Срок
 * @commission Комиссия за обслуживание аккредитива (% комиссии)
 * @plannedSumServiceFee Плановая сумма комиссии к оплате
 * @plannedFeePaymentDate Плановая дата оплаты комиссии
 * @factSumServiceFee Плановая сумма комиссии к оплате
 * @factFeePaymentDate Плановая дата оплаты комиссии
 * @tnCodes ТН ВЭД
 * @tnSumm Сумма ТН ВЭД
 * @id идентификатор
 * @cfaId идентификатор кредита под аккредитив
 * @isValid все поля формы кроме issued и paidFor валидны или нет
 * @isValidIssued поле issued валидно или нет
 * @isValidPaidFor поле paidFor валидно или нет
 */
export interface ICFAGeneralAgreementDTO {
  limit: number;
  creditLineType: {
    revolving: boolean;
    fixed?: boolean;
  };
  creditLineTypeValue?: TCFACreditLineType;
  accreditiveNumber: string;
  unusedLimit: number;
  balance: number;
  sumPercent: number;
  issued: ICFAAccreditiveValueDTO[];
  paidFor: ICFAAccreditiveValueDTO[];
  agreementId: string;
  conclusionDt?: string | Date;
  endDate?: string | Date;
  loanPeriod: string;
  commission: number;
  plannedSumServiceFee: number;
  plannedFeePaymentDate?: string | Date;
  factSumServiceFee: number;
  factFeePaymentDate?: string | Date;
  tnCodes?: string[];
  tnSumm?: number;
  id: string;
  cfaId: string;

  isValid?: boolean;
  isValidIssued?: boolean;
  isValidPaidFor?: boolean;
}
export interface ICFACreditContractDTO {
  limit: number;
  creditLineType: {
    revolving: boolean;
    fixed?: boolean;
  };
  creditLineTypeValue?: TCFACreditLineType;
  issued: ICFAAccreditiveValueDTO[];
  unusedLimit: number;
  balance: number;
  paidFor: ICFAAccreditiveValueDTO[];
  agreementId: string;
  conclusionDt?: string | Date;
  endDate?: string | Date;
  loanPeriod: string;
  tnCodes?: string[];
  individualCategory: string;
  inn: string;
  commission: number;
  loanTranche: string;
  loanRate: number;
  loanMPT: number;
  sumPercent: number;
  id: string;
  cfaId?: string;

  isValid?: boolean;
  isValidIssued?: boolean;
  isValidPaidFor?: boolean;
}

export interface ICFAAccreditiveValueDTO {
  id: string;
  amount?: number;
  changedDate?: string | Date;
  maurityDate?: string | Date;
  tranchNumber?: number;
  tempId?: string;
}

export type TCFACreditLineType = 'VKL' | 'NKL';
export enum ECFACreditLineType {
  VKL = 'ВКЛ',
  NKL = 'НКЛ',
}

export const CFAAccreditiveValueEmpty: ICFAAccreditiveValueDTO = {
  id: '',
  amount: undefined,
  changedDate: undefined,
};
export const CFAAccreditiveCCValueEmpty: ICFAAccreditiveValueDTO = {
  id: '',
  amount: undefined,
  changedDate: undefined,
  maurityDate: undefined,
  tranchNumber: undefined,
};
