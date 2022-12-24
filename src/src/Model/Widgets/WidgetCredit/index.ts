export interface IWidgetCreditDefault {
  balance: string;
  issued: string;
  paidFor: string;
  unusedLimit: string;
}
export interface IWidgetCreditAgreement extends IWidgetCreditDefault {
  limitCreditAgreement: string;
}

export interface IWidgetGeneralAgreement extends IWidgetCreditDefault {
  limitGeneralAgreement: string;
}

export interface IWidgetCreditInfoDTO {
  creditAgreement: IWidgetCreditAgreement;
  generalAgreement: IWidgetGeneralAgreement;
}

export type IWidgetCreditMappedInfoKey =
  | keyof IWidgetCreditDefault
  | 'limitAgreement';
export interface IWidgetCreditValueMappedInfo {
  name: IWidgetCreditMappedInfoKey;
  creditAgreement: number;
  generalAgreement: number;
}
export type IWidgetCreditMappedInfo = IWidgetCreditValueMappedInfo[];
