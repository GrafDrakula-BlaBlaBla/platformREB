import {Params} from 'router5/dist/types/base';
import {IAPIModule} from '../../../../InfrastructureLayer/APIModule/interfaces';
import {ICFA_BankDTO} from '../../../../Model/Banks';
import {IBankForCFAApiClient} from '../interfaces';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {d_BaseList} from '../../../Decorators/d_BaseList';
import {CFA_BanksMock} from '../../../../Model/Banks/mock';

export class BankForCFAApiClient implements IBankForCFAApiClient {
  constructor(protected apiModule: IAPIModule, protected urlPrefix: string) {}

  @d_BaseList
  async getItems(searchParams?: Params): Promise<IBaseListDTO<ICFA_BankDTO>> {
    if (process.env.REACT_APP_MOCK) {
      return new Promise((resolve) =>
        setTimeout(
          () => resolve({items: CFA_BanksMock, total: CFA_BanksMock.length}),
          1000
        )
      );
    }

    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.getData(
        `${this.urlPrefix}/reb/summary`,
        searchParams
      );
    }
    return this.apiModule.getData<IBaseListDTO<ICFA_BankDTO>>(
      `${this.urlPrefix}/reb/summary`,
      searchParams
    );
  }
}
