import {Params} from 'router5/dist/types/base';
import {IWidgetCountriesApiClient} from '../../../../IntegrationLayer/APIClients/Widgets/WidgetCountries/interfaces';
import {IWidgetCountriesService} from './interfaces';
import {inject, injectable} from 'inversify';
import {API_CLIENT} from '../../../../IntegrationLayer/identifiers';

@injectable()
export class WidgetCountriesService implements IWidgetCountriesService {
  @inject(API_CLIENT.WidgetCountries)
  protected APIClient!: IWidgetCountriesApiClient;

  getCountryList = async (params?: Params) => {
    return this.APIClient.getCountryList(params);
  };
}
