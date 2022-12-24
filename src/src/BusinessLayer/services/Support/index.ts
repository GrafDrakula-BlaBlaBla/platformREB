import {ISupportService} from './interfaces';
import {ISupportDTO} from '../../../Model/Support';
import {ISupportAPIClient} from '../../../IntegrationLayer/APIClients/Support/interfaces';
import {inject, injectable} from 'inversify';
import {API_CLIENT} from '../../../IntegrationLayer/identifiers';

@injectable()
export class SupportService implements ISupportService {
  @inject(API_CLIENT.Support) protected APIClient!: ISupportAPIClient;

  send(data: ISupportDTO): Promise<ISupportDTO> {
    return this.APIClient.send(data);
  }
}
