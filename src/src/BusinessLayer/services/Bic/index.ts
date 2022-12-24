import {inject, injectable} from 'inversify';
import {IBicApiClient} from '../../../IntegrationLayer/APIClients/Bic/interfaces';
import {API_CLIENT} from '../../../IntegrationLayer/identifiers';
import {IBicService} from './interfaces';

@injectable()
export class BicService implements IBicService {
  @inject(API_CLIENT.Bic) protected ApiClient!: IBicApiClient;

  search = async (bicPart: string) => {
    const MaxSize = 5;
    const _bicPart = bicPart || null;
    const result = await this.ApiClient.search(_bicPart);
    if (result && result.length > MaxSize) {
      return result.slice(0, MaxSize);
    }
    return result || [];
  };

  check = async (bic: string) => {
    const _bic = bic || null;
    const result = await this.ApiClient.check(_bic);
    return result ? result.status === 'ok' : false;
  };
}
