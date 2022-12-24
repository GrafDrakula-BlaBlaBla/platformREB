import {IAPIModule} from '../../../../InfrastructureLayer/APIModule/interfaces';
import {
  IBankAPIClient,
  IBankForAccreditationApiClient,
  IBankForCFAApiClient,
} from '../interfaces';
import {
  IBankAgreementDTO,
  IBankDTO,
  IBankProductDTO,
  IBankAdminDTO,
} from '../../../../Model/Banks';
import {BankForCFAApiClient} from '../bankForCFA';
import {BankForAccreditationApiClient} from '../bankForAccreditation';
import {ADMIN_ROLE} from '../../../../Model/Session/mock';
import {inject, injectable, postConstruct} from 'inversify';
import {INFRASTRUCTURE_MODULE} from '../../../../InfrastructureLayer/identifiers';
import {BANK_AGREEMENTS, BANK_PRODUCTS} from '../../../../Model/Banks/mock';

@injectable()
export class BankAPIClient implements IBankAPIClient {
  BankForCFA!: IBankForCFAApiClient;
  BankForAccreditation!: IBankForAccreditationApiClient;
  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;

  @postConstruct()
  postConstruct() {
    this.BankForCFA = new BankForCFAApiClient(
      this.apiModule,
      'credit-for-accreditive'
    );
    this.BankForAccreditation = new BankForAccreditationApiClient(
      this.apiModule,
      'bank-accreditation'
    );
  }

  getBankInfo = (bankId?: string): Promise<IBankDTO> => {
    bankId = bankId || '';
    return this.apiModule.getData(`banks/${bankId}`);
  };

  getBankInoFromBic = (bic: string): Promise<IBankDTO> => {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.getData(`banks/bic/${bic}`);
    }
    return this.apiModule.getData(`public/bank/bic/${bic}`);
  };

  getReb = () => {
    return this.apiModule.getData<IBankDTO>(`banks/getReb`);
  };

  getBankAdmins = (): Promise<IBankAdminDTO[]> => {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.getData(`banks/by-role/`, {
        roles: ADMIN_ROLE,
      });
    }
    return this.apiModule.getData(`banks/admins/`);
  };

  // @todo: нужно апи
  getProducts = () => {
    if (process.env.NODE_ENV === 'development') {
      return new Promise<IBankProductDTO[]>((resolve) =>
        setTimeout(() => resolve(BANK_PRODUCTS), 1000)
      );
    }
    return this.apiModule.getData<IBankProductDTO[]>('banks/products');
  };

  // @todo: нужно апи
  getAgreements = () => {
    if (process.env.NODE_ENV === 'development') {
      return new Promise<IBankAgreementDTO[]>((resolve) =>
        setTimeout(() => resolve(BANK_AGREEMENTS), 1000)
      );
    }
    return this.apiModule.getData<IBankAgreementDTO[]>(
      'banks/package-of-contracts'
    );
  };
}
