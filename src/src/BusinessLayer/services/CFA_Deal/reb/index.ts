import {CFA_DealService} from '../base';
import {ISession} from '../../../../Bootstrap/Session/interfaces';
import {ICFA_DealRebService} from '../interfaces';
import {IActualBankCFADTO, ICFABankUserDTO} from '../../../../Model/CFA_Deal';
import {ICFA_DealRebAPIClient} from '../../../../IntegrationLayer/APIClients/CFA_Deal';
import {inject, injectable} from 'inversify';
import {API_CLIENT} from '../../../../IntegrationLayer/identifiers';
import {SESSION} from '../../../../Bootstrap/Session';

@injectable()
export class CFA_DealRebService
  extends CFA_DealService
  implements ICFA_DealRebService {
  @inject(API_CLIENT.CreditForAccreditive)
  protected APIClient!: ICFA_DealRebAPIClient;
  @inject(SESSION) protected session!: ISession;

  getActualBankList = async (): Promise<IActualBankCFADTO[]> => {
    return this.APIClient.getActualBankList();
  };

  getAvailableUsers = (): Promise<ICFABankUserDTO[]> => {
    return this.APIClient.getAvailableUsers();
  };
}
