import {Params} from 'router5/dist/types/base';
import {IAPIModule} from '../../../../InfrastructureLayer/APIModule/interfaces';
import {IAccreditation_BankDTO} from '../../../../Model/Banks';
import {IBankForAccreditationApiClient} from '../interfaces';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {EAccreditationStatuses} from '../../../../Model/Accreditation';
import {d_BaseList} from '../../../Decorators/d_BaseList';

export class BankForAccreditationApiClient
  implements IBankForAccreditationApiClient {
  constructor(protected apiModule: IAPIModule, protected urlPrefix: string) {}

  @d_BaseList
  async getItems(
    searchParams?: Params
  ): Promise<IBaseListDTO<IAccreditation_BankDTO>> {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.getData<IBaseListDTO<IAccreditation_BankDTO>>(
        `${this.urlPrefix}/list`,
        {
          ...searchParams,
          notInStatuses: [EAccreditationStatuses.REJECTED],
        }
      );
    }

    return this.apiModule.getData<IBaseListDTO<IAccreditation_BankDTO>>(
      `${this.urlPrefix}/reb/list`,
      {
        ...searchParams,
        notInStatuses: [EAccreditationStatuses.REJECTED],
      }
    );
  }
}
