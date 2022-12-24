import {IBankForCFAApiClient} from '../../../../IntegrationLayer/APIClients/Banks';
import {BaseListService} from '../../BaseList';
import {IBankForCFAService} from '../interfaces';
import {ICFA_BankDTO} from '../../../../Model/Banks';
// import {inject, injectable} from 'inversify';
// import {API_CLIENT} from '../../../../IntegrationLayer/identifiers';

//todo: в рамках 1277 переделать
// @injectable()
export class BankForCFAService
  extends BaseListService<ICFA_BankDTO, IBankForCFAApiClient>
  implements IBankForCFAService {
  constructor(protected APIClient: IBankForCFAApiClient) {
    super();
  }
}
