import {inject, injectable} from 'inversify';
import {IWidgetExportApiClient} from '../interfaces';
import {INFRASTRUCTURE_MODULE} from '../../../../../InfrastructureLayer/identifiers';
import {IAPIModule} from '../../../../../InfrastructureLayer/APIModule/interfaces';
import {Params} from 'router5/dist/types/base';
import {IWidgetExportSource} from '../../../../../Model/Widgets/WidgetExport';
import mockSession from '../../../../../Model/Session/mock';
import {WIDGET_EXPORT_MOCK} from '../../../../../Model/Widgets/WidgetExport/mock';

@injectable()
export class WidgetExportRebApiClient implements IWidgetExportApiClient {
  protected urlPrefix: string = 'dashboard';
  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;

  getSource = async (params: Params): Promise<IWidgetExportSource> => {
    if (process.env.REACT_APP_MOCK) {
      return new Promise((resolve) =>
        setTimeout(() => resolve(WIDGET_EXPORT_MOCK), 1000)
      );
    }
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.getData(`${this.urlPrefix}/liner`, {
        bankId: mockSession?.bank.objectId,
        ...params,
      });
    }
    return this.apiModule.getData(`${this.urlPrefix}/reb/liner`, params);
  };
}
