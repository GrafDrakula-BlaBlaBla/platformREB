import {inject, injectable} from 'inversify';
import {IAppAPIClient} from '../../../IntegrationLayer/APIClients/App/interfaces';
import {API_CLIENT} from '../../../IntegrationLayer/identifiers';
import {IAppService} from './interfaces';

@injectable()
export class AppService implements IAppService {
  @inject(API_CLIENT.App) protected APIClient!: IAppAPIClient;
}
