import {Params} from 'router5/dist/types/base';
import {IWidgetCreditApiClient} from '../../../../IntegrationLayer/APIClients/Widgets/WidgetCredit/interfaces';
import {IWidgetCreditInfoDTO} from '../../../../Model/Widgets/WidgetCredit';
import {IWidgetCreditService} from './interfaces';
import {inject, injectable} from 'inversify';
import {API_CLIENT} from '../../../../IntegrationLayer/identifiers';

@injectable()
export class WidgetCreditService implements IWidgetCreditService {
  @inject(API_CLIENT.WidgetCredit)
  protected APIClient!: IWidgetCreditApiClient;

  getCreditInfo = async (params: Params): Promise<IWidgetCreditInfoDTO> => {
    return this.APIClient.getCreditInfo(params);
  };
}
