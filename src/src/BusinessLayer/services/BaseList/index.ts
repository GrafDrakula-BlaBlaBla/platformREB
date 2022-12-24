import {IBaseListService} from './interfaces';
import {Params} from 'router5/dist/types/base';
import {IBaseListDTO} from '../../../Model/BaseList';
import {IBaseListAPIClient} from '../../../IntegrationLayer/APIClients/BaseList/interfaces';
import {injectable} from 'inversify';

@injectable()
export abstract class BaseListService<T, A extends IBaseListAPIClient>
  implements IBaseListService<T> {
  protected APIClient!: A;

  initList(searchParams?: Params): Promise<IBaseListDTO<T>> {
    return this.APIClient.getItems(searchParams);
  }
}
