import {
  IAccreditation_BankDTO,
  IBankAdminDTO,
  IBankAgreementDTO,
  IBankDTO,
  IBankProductDTO,
  ICFA_BankDTO,
} from '../../../Model/Banks';
import {IBaseViewModel} from '../Base/interfaces';
import {IListViewModel} from '../List/interfaces';
import {IDictionaryTerritorialBankExtendedDTO} from '../../../Model/Dictionary';
import {IUserDTO} from '../../../Model/User';
import {ISelectItem} from '../../../ui/Common/FieldControls';

export interface IBankViewModel extends IBaseViewModel {
  BankForCFA: IBankForCFAViewModel;
  BankForAccreditation: IBankForAccreditationViewModel;
  bankInfo?: IBankDTO;
  currentBank?: IBankDTO;
  bankAdmins: IBankAdminDTO[];
  bankProducts?: IBankProductDTO[];
  bankProductsSelectItems?: ISelectItem[];
  clearBankInfo: () => void;
  getBankInfo: (bankId?: string) => Promise<IBankDTO>;
  getBankInfoFromBic: (bic: string) => Promise<void>;
  getCurrentBank: () => Promise<IBankDTO>;
  getBankAdmins: () => Promise<void>;
  getBankProducts: () => Promise<void>;
}

export interface IBankForCFAViewModel extends IListViewModel<ICFA_BankDTO> {}

export interface IBankForAccreditationViewModel
  extends IListViewModel<IAccreditation_BankDTO> {}

export interface IBankSettingsViewModel {
  bank?: IBankDTO;
  products?: IBankProductDTO[];
  agreements?: IBankAgreementDTO[];
  territorialBanks?: IDictionaryTerritorialBankExtendedDTO[];
  territorialBanksSelect: ISelectItem[];
  territorialBankId?: string;
  users?: IUserDTO[];

  isManual?: boolean;
  isTerritorialBankAdding?: boolean;

  loadingBank: boolean;
  loadingProducts: boolean;
  loadingAgreements: boolean;
  loadingTerritorialBanks: boolean;
  loadingUsers: boolean;

  getBank(): Promise<void>;
  getProducts(): Promise<void>;
  getAgreements(): Promise<void>;
  getTerritorialBanks(): Promise<void>;
  getUsers(territorialBankId: string): Promise<IUserDTO[]>;

  territorialBankAdd(): void;
  territorialBankSave(id: string): Promise<void>;
  territorialBankCancel(id: string): void;
  territorialBankDelete(id: string): Promise<void>;
  territorialBankSetIsDirty(id: string, value: boolean): void;
  territorialBankSetIsValid(id: string, value: boolean): void;
  territorialBankSetField(id: string, name: string, value: string): void;

  updateUsers(data?: IUserDTO[]): Promise<void>;
  updateUserBank(userId: string, bankId: string): void;
  removeUser(id: string): Promise<void>;
}
