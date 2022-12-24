import {Params} from 'router5/dist/types/base';
import {IWidgetCreditInfoDTO} from '../../../../Model/Widgets/WidgetCredit';
import {IBaseViewModel} from '../../Base/interfaces';

export interface IWidgetCreditViewModel extends IBaseViewModel {
  creditInfo: IWidgetCreditInfoDTO | null;
  setCreditInfo(creditInfo: IWidgetCreditInfoDTO): void;
  load(params: Params): Promise<void>;
}
