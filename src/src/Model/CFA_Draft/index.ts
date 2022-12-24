import {ICFARequestDTO} from '../CFA_Deal';

export interface ICFADraftDTO extends ICFARequestDTO {
  draftCompletedAt?: string;
  draftCreatedAt?: string;
  draftOwner?: string;
  draftStatus?: ECFADraftStatuses;
  draftType?: ECFADraftTypes;
}

export interface ICFADraftExportContractDTO {
  id: string;
  canDelete: boolean;
  buyerCompanyName: string;
  dateOfExportContract: string;
  deliveryCountry: string;
  numberOfExportContract: string;
  revenuePlannedDate: string;
  tnSumm: string;
  tnCodes: IDraftTnCodes[];
  confirmedDocuments: IDraftConfirmedDocuments[];
}
export interface ICFADraftExportContractExtendedDTO
  extends ICFADraftExportContractDTO {
  tempId?: string;
  isDirty?: boolean;
  isValid?: boolean;
}

export interface IDraftConfirmedDocuments {
  amount: string;
  confirmedId: string;
  date?: Date;
  isTransport: false;
  name: string;
}
export interface IDraftTnCodes {
  code: string;
}

export enum ECFADraftStatuses {
  CREATED = 'CREATED',
  FINISHED = 'FINISHED',
  CANCELED = 'CANCELED',
}
export enum ECFADraftStatusesNames {
  CREATED = 'Создан',
  FINISHED = 'Исполнен',
  CANCELED = 'Отменен',
}

export enum ECFADraftTypes {
  CREATION = 'CREATION',
  EDIT = 'EDIT',
}

export const ICFADraftExportContractEmpty: ICFADraftExportContractExtendedDTO = {
  isDirty: true,
  isValid: false,
  id: '',
  canDelete: true,
  buyerCompanyName: '',
  dateOfExportContract: '',
  deliveryCountry: '',
  numberOfExportContract: '',
  revenuePlannedDate: '',
  tnSumm: '',
  tnCodes: [{code: ''}],
  confirmedDocuments: [
    {
      amount: '',
      confirmedId: '',
      date: undefined,
      isTransport: false,
      name: '',
    },
  ],
};
