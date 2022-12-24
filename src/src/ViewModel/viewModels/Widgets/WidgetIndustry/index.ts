import {action, makeObservable, observable} from 'mobx';
import {Params} from 'router5/dist/types/base';
import {IWidgetIndustryService} from '../../../../BusinessLayer/services/Widgets/WidgetIndustry/interfaces';
import {
  IIndustryDivisionOKKDTO,
  IIndustryDivisionOKKItem,
  IIndustryDivisionOKVEDDTO,
  IIndustryDivisionOKVEDItem,
} from '../../../../Model/Widgets/WidgetIndustry';
import {BaseViewModel} from '../../Base';
import {IWidgetIndustryViewModel} from './interfaces';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../BusinessLayer/identifiers';

export type TKindOfDataOKVED = keyof Pick<
  IWidgetIndustryViewModel,
  'okvedData' | 'okvedFullData' | 'okvedDetailedData'
>;

export type TKindOfDataOKK = keyof Pick<
  IWidgetIndustryViewModel,
  'okkData' | 'okkFullData' | 'okkDetailedData'
>;

@injectable()
export class WidgetIndustryViewModel
  extends BaseViewModel
  implements IWidgetIndustryViewModel {
  @inject(SERVICE.WidgetIndustry) protected service!: IWidgetIndustryService;

  constructor() {
    super();
    makeObservable(this, {
      okkData: observable,
      okkFullData: observable,
      okkDetailedData: observable,
      okvedData: observable,
      okvedFullData: observable,
      okvedDetailedData: observable,
      fullDataLoading: observable,
      detailedDataLoading: observable,

      setOkkData: action,
      setOkvedData: action,
      _setLoading: action,
      clearData: action,
      setData: action,
    });
  }

  okkData?: IIndustryDivisionOKKDTO;
  okkFullData?: IIndustryDivisionOKKDTO;
  okkDetailedData?: IIndustryDivisionOKKDTO;

  okvedData?: IIndustryDivisionOKVEDDTO;
  okvedFullData?: IIndustryDivisionOKVEDDTO;
  okvedDetailedData?: IIndustryDivisionOKVEDDTO;

  fullDataLoading: boolean = false;
  detailedDataLoading: boolean = false;

  getOKK = async (dataType: TKindOfDataOKK, params?: Params) => {
    this._setLoading(dataType, true);
    const data = await this.service.getOKK(params).finally(() => {
      this._setLoading(dataType, false);
    });
    this.setOkkData(dataType, data);
  };

  getOKVED = async (dataType: TKindOfDataOKVED, params?: Params) => {
    this._setLoading(dataType, true);
    const data = await this.service.getOKVED(params).finally(() => {
      this._setLoading(dataType, false);
    });
    this.setOkvedData(dataType, data);
  };

  setOkkData = (dataType: TKindOfDataOKK, data: IIndustryDivisionOKKDTO) => {
    this[dataType] = data;
  };

  setOkvedData = (
    dataType: TKindOfDataOKVED,
    data: IIndustryDivisionOKVEDDTO
  ) => {
    this[dataType] = data;
  };

  clearData = (dataType: TKindOfDataOKK | TKindOfDataOKVED) => {
    this[dataType] = undefined;
  };

  _setLoading = (
    dataType: TKindOfDataOKVED | TKindOfDataOKK,
    value: boolean
  ) => {
    switch (dataType) {
      case 'okvedData':
        value ? this.setLoading() : this.unsetLoading();
        break;
      case 'okkData':
        value ? this.setLoading() : this.unsetLoading();
        break;
      case 'okvedFullData':
        this.fullDataLoading = value;
        break;
      case 'okkFullData':
        this.fullDataLoading = value;
        break;
      case 'okvedDetailedData':
        this.detailedDataLoading = value;
        break;
      case 'okkDetailedData':
        this.detailedDataLoading = value;
        break;
    }
  };

  setData = (
    dataType: TKindOfDataOKK | TKindOfDataOKVED,
    data: IIndustryDivisionOKKItem[] | IIndustryDivisionOKVEDItem[]
  ) => {
    switch (dataType) {
      case 'okvedData':
        if (this.okvedData)
          this.okvedData.items = data as IIndustryDivisionOKVEDItem[];
        break;
      case 'okkData':
        if (this.okkData)
          this.okkData.items = data as IIndustryDivisionOKKItem[];
        break;
      case 'okvedFullData':
        if (this.okvedFullData)
          this.okvedFullData.items = data as IIndustryDivisionOKVEDItem[];
        break;
      case 'okkFullData':
        if (this.okkFullData)
          this.okkFullData.items = data as IIndustryDivisionOKKItem[];
        break;
      case 'okvedDetailedData':
        if (this.okvedDetailedData)
          this.okvedDetailedData.items = data as IIndustryDivisionOKVEDItem[];
        break;
      case 'okkDetailedData':
        if (this.okkDetailedData)
          this.okkDetailedData.items = data as IIndustryDivisionOKKItem[];
        break;
    }
  };
}
