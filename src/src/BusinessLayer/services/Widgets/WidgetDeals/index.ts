import {inject, injectable} from 'inversify';
import {Params} from 'router5/dist/types/base';
import {IWidgetDealsApiClient} from '../../../../IntegrationLayer/APIClients/Widgets/WidgetDeals/interfaces';
import {API_CLIENT} from '../../../../IntegrationLayer/identifiers';
import {IWidgetDealsService} from './interfaces';

@injectable()
export class WidgetDealsService implements IWidgetDealsService {
  @inject(API_CLIENT.WidgetDeals) protected APIClient!: IWidgetDealsApiClient;

  getSource = (params: Params) => {
    return this.APIClient.getSource(params);
  };
}
