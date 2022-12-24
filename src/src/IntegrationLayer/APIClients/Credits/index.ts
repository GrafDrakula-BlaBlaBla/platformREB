import {IAPIModule} from '../../../InfrastructureLayer/APIModule/interfaces';
import {ICreditDTO} from '../../../Model/Credits';
import {Params} from 'router5/dist/types/base';
import {IBaseListDTO} from '../../../Model/BaseList';
import {ICreditsAPIClient} from './interfaces';
import {d_BaseList} from '../../Decorators/d_BaseList';
import {inject, injectable} from 'inversify';
import {INFRASTRUCTURE_MODULE} from '../../../InfrastructureLayer/identifiers';

@injectable()
export class CreditAPIClient implements ICreditsAPIClient {
  protected urlPrefix: string = 'credit';

  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;

  @d_BaseList
  async getItems(searchParams?: Params): Promise<IBaseListDTO<ICreditDTO>> {
    return this.apiModule.getData<IBaseListDTO<ICreditDTO>>(
      this.urlPrefix,
      searchParams
    );
  }

  deleteCredit(id: string | number): Promise<void> {
    return this.apiModule.putData(`${this.urlPrefix}/${id}/false`);
  }
}
