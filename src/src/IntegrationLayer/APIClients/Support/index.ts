import {inject, injectable} from 'inversify';
import {IAPIModule} from '../../../InfrastructureLayer/APIModule/interfaces';
import {INFRASTRUCTURE_MODULE} from '../../../InfrastructureLayer/identifiers';
import {ISupportDTO} from '../../../Model/Support';
import {ISupportAPIClient} from './interfaces';

@injectable()
export class SupportAPIClient implements ISupportAPIClient {
  protected urlPrefix: string = 'support';
  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;

  send(data: ISupportDTO): Promise<ISupportDTO> {
    return this.apiModule.postData(`${this.urlPrefix}/send`, data);
  }
}
