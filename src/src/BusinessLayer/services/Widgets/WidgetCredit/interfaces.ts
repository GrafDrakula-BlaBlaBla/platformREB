import {Params} from 'router5/dist/types/base';
import {IWidgetCreditInfoDTO} from '../../../../Model/Widgets/WidgetCredit';

export interface IWidgetCreditService {
  getCreditInfo: (params: Params) => Promise<IWidgetCreditInfoDTO>;
}
