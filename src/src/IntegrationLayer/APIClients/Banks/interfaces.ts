import {
  IAccreditation_BankDTO,
  IBankAdminDTO,
  IBankAgreementDTO,
  IBankDTO,
  IBankProductDTO,
  ICFA_BankDTO,
} from '../../../Model/Banks';
import {Params} from 'router5/dist/types/base';
import {IBaseListDTO} from '../../../Model/BaseList';

export interface IBankAPIClient {
  BankForCFA: IBankForCFAApiClient;
  BankForAccreditation: IBankForAccreditationApiClient;
  getBankInfo: (bankId?: string) => Promise<IBankDTO>;
  getBankInoFromBic: (bic: string) => Promise<IBankDTO>;
  getReb: () => Promise<IBankDTO>;
  getBankAdmins: () => Promise<IBankAdminDTO[]>;
  getProducts: () => Promise<IBankProductDTO[]>;
  getAgreements: () => Promise<IBankAgreementDTO[]>;
}

export interface IBankForCFAApiClient {
  getItems(searchParams?: Params): Promise<IBaseListDTO<ICFA_BankDTO>>;
}
export interface IBankForAccreditationApiClient {
  getItems(
    searchParams?: Params
  ): Promise<IBaseListDTO<IAccreditation_BankDTO>>;
}
