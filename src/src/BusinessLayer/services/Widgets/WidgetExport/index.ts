import {Params} from 'router5/dist/types/base';
import {IWidgetExportService} from './interfaces';
import {IWidgetExportApiClient} from '../../../../IntegrationLayer/APIClients/Widgets/WidgetExport/interfaces';
import {inject, injectable} from 'inversify';
import {API_CLIENT} from '../../../../IntegrationLayer/identifiers';

@injectable()
export class WidgetExportService implements IWidgetExportService {
  @inject(API_CLIENT.WidgetExport) protected APIClient!: IWidgetExportApiClient;

  getSource = (params: Params) => {
    return this.APIClient.getSource(params);
  };
}
