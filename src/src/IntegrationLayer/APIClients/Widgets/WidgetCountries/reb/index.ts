import {inject, injectable} from 'inversify';
import {Params} from 'router5/dist/types/base';
import {IAPIModule} from '../../../../../InfrastructureLayer/APIModule/interfaces';
import {INFRASTRUCTURE_MODULE} from '../../../../../InfrastructureLayer/identifiers';
import {IBaseListDTO} from '../../../../../Model/BaseList';
import {IWidgetCountriesDTO} from '../../../../../Model/Widgets/WidgetCountries';
import {d_BaseList} from '../../../../Decorators/d_BaseList';
import {IWidgetCountriesApiClient} from '../interfaces';
import mockSession from '../../../../../Model/Session/mock';

@injectable()
export class WidgetCountriesRebApiClient implements IWidgetCountriesApiClient {
  protected urlPrefix: string = 'dashboard';
  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;

  @d_BaseList
  async getCountryList(
    params?: Params
  ): Promise<IBaseListDTO<IWidgetCountriesDTO>> {
    if (process.env.NODE_ENV === 'development') {
      params = {...params, bankId: mockSession?.bank.objectId};
      return this.apiModule.getData<IBaseListDTO<IWidgetCountriesDTO>>(
        `${this.urlPrefix}/country`,
        params
      );
    }
    return this.apiModule.getData<IBaseListDTO<IWidgetCountriesDTO>>(
      `${this.urlPrefix}/reb/country`,
      params
    );
  }
}
