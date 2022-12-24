import {Params} from 'router5/dist/types/base';
import {IWidgetDealsSourceData} from '../../../../Model/Widgets/WidgetDeals';

export interface IWidgetDealsApiClient {
  getSource: (params: Params) => Promise<IWidgetDealsSourceData>;
}
