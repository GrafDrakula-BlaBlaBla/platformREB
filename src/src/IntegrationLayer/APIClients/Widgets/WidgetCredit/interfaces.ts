import {Params} from 'router5/dist/types/base';
import {IWidgetCreditInfoDTO} from '../../../../Model/Widgets/WidgetCredit';

export interface IWidgetCreditApiClient {
  getCreditInfo: (params: Params) => Promise<IWidgetCreditInfoDTO>;
}
