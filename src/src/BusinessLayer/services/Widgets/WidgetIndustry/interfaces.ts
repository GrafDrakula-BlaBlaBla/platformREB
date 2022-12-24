import {Params} from 'router5/dist/types/base';
import {
  IIndustryDivisionOKKDTO,
  IIndustryDivisionOKVEDDTO,
} from '../../../../Model/Widgets/WidgetIndustry';

export interface IWidgetIndustryService {
  getOKK(params?: Params): Promise<IIndustryDivisionOKKDTO>;
  getOKVED(params?: Params): Promise<IIndustryDivisionOKVEDDTO>;
}
