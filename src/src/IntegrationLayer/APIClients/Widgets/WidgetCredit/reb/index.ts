import {inject, injectable} from 'inversify';
import {IWidgetCreditApiClient} from '../interfaces';
import {INFRASTRUCTURE_MODULE} from '../../../../../InfrastructureLayer/identifiers';
import {IAPIModule} from '../../../../../InfrastructureLayer/APIModule/interfaces';
import {Params} from 'router5/dist/types/base';
import {IWidgetCreditInfoDTO} from '../../../../../Model/Widgets/WidgetCredit';
import {WIDGET_CREDIT_MOCK} from '../../../../../Model/Widgets/WidgetCredit/mock';

@injectable()
export class WidgetCreditRebApiClient implements IWidgetCreditApiClient {
  protected urlPrefix: string = 'dashboard';
  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;

  getCreditInfo = async (params: Params): Promise<IWidgetCreditInfoDTO> => {
    if (process.env.REACT_APP_MOCK) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(WIDGET_CREDIT_MOCK), 1000)
      );
    }
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.getData(`${this.urlPrefix}/bar-chart`, params);
    }
    return this.apiModule.getData(`${this.urlPrefix}/reb/bar-chart`, params);
  };
}
