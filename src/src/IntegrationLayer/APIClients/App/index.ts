import {IAppAPIClient} from './interfaces';
import {IAPIModule} from '../../../InfrastructureLayer/APIModule/interfaces';
import {inject, injectable} from 'inversify';
import {INFRASTRUCTURE_MODULE} from '../../../InfrastructureLayer/identifiers';

@injectable()
export class AppAPIClient implements IAppAPIClient {
  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;
}
