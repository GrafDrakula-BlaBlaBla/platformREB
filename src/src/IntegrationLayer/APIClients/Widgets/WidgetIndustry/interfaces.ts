import {Params} from 'router5/dist/types/base';
import {IIndustryDivisionOKVEDDTO} from '../../../../Model/Widgets/WidgetIndustry';

export interface IWidgetIndustryAPIClient {
  getOKK(params?: Params): Promise<any>;
  getOKVED(params?: Params): Promise<IIndustryDivisionOKVEDDTO>;
}
