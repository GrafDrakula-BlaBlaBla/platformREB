import {inject, injectable} from 'inversify';
import {IWidgetDealsApiClient} from '../interfaces';
import {INFRASTRUCTURE_MODULE} from '../../../../../InfrastructureLayer/identifiers';
import {IAPIModule} from '../../../../../InfrastructureLayer/APIModule/interfaces';
import {Params} from 'router5/dist/types/base';
import {IWidgetDealsSourceData} from '../../../../../Model/Widgets/WidgetDeals';
import {WIDGET_DEALS_SOURCE} from '../../../../../Model/Widgets/WidgetDeals/mock';
import mockSession from '../../../../../Model/Session/mock';

@injectable()
export class WidgetDealsRebApiClient implements IWidgetDealsApiClient {
  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;

  protected urlPrefix: string = 'dashboard';

  getSource = async (params: Params): Promise<IWidgetDealsSourceData> => {
    if (process.env.REACT_APP_MOCK) {
      return new Promise<IWidgetDealsSourceData>((resolve) =>
        setTimeout(() => resolve(WIDGET_DEALS_SOURCE), 1000)
      );
    }
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.getData(`${this.urlPrefix}/deals/pie-chart-sber`, {
        bankId: mockSession?.bank.objectId,
        ...params,
      });
    }
    return this.apiModule.getData(
      `${this.urlPrefix}/reb/deals/pie-chart-sber`,
      params
    );
  };
}
