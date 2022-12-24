import {EAccreditationStatuses} from '../Accreditation';

export interface ICFA_BankDTO {
  bankName: string;
  bankId: string;
  amountDeals: number;
  amountReport: number;
  plannedSumDeals: number;
  factSumDeals: number;
}

export interface IAccreditation_BankDTO {
  id: string;
  status: EAccreditationStatuses;
  createdAt: string;
  updatedAt: string;
  bankId: string;
  bankName: string;
  bankBic: string;
  bankAccount: string;
  bankAddress: string;
  employeeName: string;
  employeePatronymic: string;
  employeeSurname: string;
  employeeEmail: string;
  employeePhone: string;
}

export interface IBankDTO {
  objectId: string;
  bankName: string;
  legalAddress: string;
  bic: string;
  correspondentAcc: string;
  status: EBankStatuses | string;
  settings?: {
    interactionType?: EBankInteractionTypes | string | null;
  };
}

export interface IBankAdminDTO {
  email: string;
  name: string;
  patronymic: string;
  phoneNumber: string;
  surname: string;
}

export interface IBankProductDTO {
  type: string;
  title: string;
  isActivated: boolean;
}

export interface IBankAgreementDTO {
  docType: string;
  docTitle?: string;
  docSize?: number;
  objectId?: string;
}

export enum EBankStatuses {
  CREATED = 'CREATED',
  APPROVED = 'APPROVED',
}
export enum EBankStatusNames {
  CREATED = 'Аккредитация не пройдена',
  APPROVED = 'Аккредитация пройдена',
}
export enum EBankInteractionTypes {
  MANUAL = 'MANUAL',
  API = 'API',
}

export enum ETypeOfBank {
  COMMERCIAL = 'commercial',
  REB = 'reb',
}
