export interface ICFA_ReportDTO {
  objectId: string;
  period: string;
  amountOfAgreement: number;
  valueOfAccreditives: number;
  valueOfIssued: number;
  valueOfAccredRests: number;
  reportStatus: string;
}
export interface ICFA_ReportAgreementDTO {
  amount: number;
  limit: number;
  preBalance: number;
  issued: number;
  paidFor: number;
  balance: number;
  unusedLimit: number;
}
export interface ICFA_ReportDetailedDTO {
  acceptedDate: string;
  period: string;
  reportStatus: string;
  generalAgreement: ICFA_ReportAgreementDTO;
  creditAgreement: ICFA_ReportAgreementDTO;
  id: string;
}
export interface ICFA_ReportDealDTO {
  id: string;
  requestId: string;
  agreementId: string;
  fullName: string;
  inn: string;
  conclusionDt: string;
  endDate: string;
  limit: number;
  preBalance: number;
  issued: number;
  paidFor: number;
  balance: number;
  unusedLimit: number;
  exportContracts: ICFA_ReportExportContractDTO[];
}
export interface ICFA_ReportExportContractDTO {
  objectId: string;
  title: string;
  exportConfirmedDocument: ICFA_ReportExportConfirmedDocument;
}
export interface ICFA_ReportExportConfirmedDocument {
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

export enum ECFA_ReportStatus {
  NEW = 'NEW',
  ACCEPTED = 'ACCEPTED',
}
export enum ECFA_ReportStatusNames {
  NEW = 'Новый',
  ACCEPTED = 'Принят',
}

export interface IActualBankCFA_ReportDTO {
  bankName: string;
  bic: string;
  correspondentAcc: string;
  legalAddress: string;
  objectId: string;
  status: string;
}
