import {ISession} from '../../../../Bootstrap/Session/interfaces';
import {
  IBankForAccreditationService,
  IBankForCFAService,
  IBankService,
} from '../interfaces';
import {BankForCFAService} from '../bankForCFA';
import {BankForAccreditationService} from '../bankForAccreditation';
import {IBankAPIClient} from '../../../../IntegrationLayer/APIClients/Banks';
import {
  IBankAgreementDTO,
  IBankDTO,
  IBankProductDTO,
  IBankAdminDTO,
} from '../../../../Model/Banks';
import {inject, injectable, postConstruct} from 'inversify';
import {API_CLIENT} from '../../../../IntegrationLayer/identifiers';
import {SESSION} from '../../../../Bootstrap/Session';

@injectable()
export class BankService implements IBankService {
  BankForCFA!: IBankForCFAService;
  BankForAccreditation!: IBankForAccreditationService;
  @inject(API_CLIENT.Banks) protected APIClient!: IBankAPIClient;
  @inject(SESSION) protected session!: ISession;

  @postConstruct()
  postConstruct() {
    this.BankForCFA = new BankForCFAService(this.APIClient.BankForCFA);
    this.BankForAccreditation = new BankForAccreditationService(
      this.APIClient.BankForAccreditation
    );
  }

  getBankInfo = (bankId?: string): Promise<IBankDTO> => {
    return this.APIClient.getBankInfo(bankId);
  };

  getBankInfoFromBic = (bic: string): Promise<IBankDTO> => {
    return this.APIClient.getBankInoFromBic(bic);
  };

  getCurrentBank = async (): Promise<IBankDTO> => {
    const session = await this.session.getSession();
    if (process.env.NODE_ENV === 'development') {
      return Promise.resolve(session.bank);
    }
    return this.getBankInfo(session?.bank.objectId);
  };

  getBankAdmins = async (): Promise<IBankAdminDTO[]> => {
    return this.APIClient.getBankAdmins();
  };

  getProducts = (): Promise<IBankProductDTO[]> => {
    return this.APIClient.getProducts();
  };

  getAgreements = (): Promise<IBankAgreementDTO[]> => {
    return this.APIClient.getAgreements();
  };
}
