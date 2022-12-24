import {Params} from 'router5/dist/types/base';
import {TKindOfDataOKK, TKindOfDataOKVED} from '.';
import {
  IIndustryDivisionOKKDTO,
  IIndustryDivisionOKKItem,
  IIndustryDivisionOKVEDDTO,
  IIndustryDivisionOKVEDItem,
} from '../../../../Model/Widgets/WidgetIndustry';
import {IBaseViewModel} from '../../Base/interfaces';

export interface IWidgetIndustryViewModel extends IBaseViewModel {
  okkData?: IIndustryDivisionOKKDTO;
  okkFullData?: IIndustryDivisionOKKDTO;
  okkDetailedData?: IIndustryDivisionOKKDTO;
  okvedData?: IIndustryDivisionOKVEDDTO;
  okvedFullData?: IIndustryDivisionOKVEDDTO;
  okvedDetailedData?: IIndustryDivisionOKVEDDTO;
  fullDataLoading: boolean;
  detailedDataLoading: boolean;
  getOKK(kindOfData: TKindOfDataOKK, params?: Params): Promise<void>;
  getOKVED(kindOfData: TKindOfDataOKVED, params?: Params): Promise<void>;
  setData(
    dataType: TKindOfDataOKK | TKindOfDataOKVED,
    data: IIndustryDivisionOKKItem[] | IIndustryDivisionOKVEDItem[]
  ): void;
  clearData(dataType: TKindOfDataOKK | TKindOfDataOKVED): void;
}
