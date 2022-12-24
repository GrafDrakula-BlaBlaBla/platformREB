import {inject, injectable} from 'inversify';
import {IAPIModule} from '../../../InfrastructureLayer/APIModule/interfaces';
import {INFRASTRUCTURE_MODULE} from '../../../InfrastructureLayer/identifiers';
import {IBicDTO} from '../../../Model/Bic';
import {IBicApiClient} from './interfaces';

@injectable()
export class BicApiClient implements IBicApiClient {
  protected urlPrefix: string = 'public';
  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;

  search = async (bicPart: string | null): Promise<Array<IBicDTO>> => {
    if (process.env.NODE_ENV === 'development') {
      return await this.apiModule.getData<Array<IBicDTO>>(
        `bic/search/${bicPart}`
      );
    }
    return await this.apiModule.getData<Array<IBicDTO>>(
      `${this.urlPrefix}/bic/search/${bicPart}`
    );
  };

  check = async (bic: string | null): Promise<{status: string}> => {
    if (process.env.NODE_ENV === 'development') {
      return await this.apiModule.getData<{status: string}>(`bic/check/${bic}`);
    }
    return await this.apiModule.getData<{status: string}>(
      `${this.urlPrefix}/bic/check/${bic}`
    );
  };
}
