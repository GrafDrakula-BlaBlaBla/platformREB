import {BaseListService} from '../../BaseList';
import {IBankForAccreditationService} from '../interfaces';
import {IBankForAccreditationApiClient} from '../../../../IntegrationLayer/APIClients/Banks';
import {IAccreditation_BankDTO} from '../../../../Model/Banks';
// import {API_CLIENT} from '../../../../IntegrationLayer/identifiers';
// import {inject, injectable} from 'inversify';

//todo: в рамках 1277 переделать
// @injectable()
export class BankForAccreditationService
  extends BaseListService<
    IAccreditation_BankDTO,
    IBankForAccreditationApiClient
  >
  implements IBankForAccreditationService {
  constructor(protected APIClient: IBankForAccreditationApiClient) {
    super();
  }
}
