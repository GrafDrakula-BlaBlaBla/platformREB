import {IBaseListService} from '../BaseList/interfaces';
import {
  IAccreditation_BankDTO,
  IBankAdminDTO,
  IBankAgreementDTO,
  IBankDTO,
  IBankProductDTO,
  ICFA_BankDTO,
} from '../../../Model/Banks';

export interface IBankService {
  BankForCFA: IBankForCFAService;
  BankForAccreditation: IBankForAccreditationService;
  getBankInfo(bankId?: string): Promise<IBankDTO>;
  getBankInfoFromBic(bic: string): Promise<IBankDTO>;
  getCurrentBank(): Promise<IBankDTO>;
  getBankAdmins(): Promise<IBankAdminDTO[]>;
  getProducts(): Promise<IBankProductDTO[]>;
  getAgreements(): Promise<IBankAgreementDTO[]>;
}

export interface IBankForCFAService extends IBaseListService<ICFA_BankDTO> {}

export interface IBankForAccreditationService
  extends IBaseListService<IAccreditation_BankDTO> {}
