import {uuidv4} from '../../Utils/Uid';

export interface IDictionaryDTO {
  [key: string]: string;
}

export interface IDictionaryCountriesDTO {
  alfa2?: string;
  alfa3?: string;
  code?: string;
  flag?: string;
  fullName?: string;
  shortName?: string;
}

export interface IDictionaryTerritorialBankDTO {
  id: string;
  fullName: string;
  shortName: string;
}

export interface IDictionaryTerritorialBankExtendedDTO
  extends IDictionaryTerritorialBankDTO {
  isNew: boolean;
  isDirty: boolean;
  isValid: boolean;
  isLoading: boolean;
}

export const TERRITORIAL_BANK_NEW: IDictionaryTerritorialBankExtendedDTO = {
  id: uuidv4(),
  shortName: '',
  fullName: '',
  isNew: true,
  isDirty: true,
  isValid: false,
  isLoading: false,
};

export interface ICurrencyDTO {
  id: string;
  name: string;
  codeDig: string;
  codeLat: string;
  isClearing: boolean;
}
