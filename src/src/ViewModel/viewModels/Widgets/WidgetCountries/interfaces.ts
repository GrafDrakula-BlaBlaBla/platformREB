import {Params} from 'router5/dist/types/base';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {IWidgetCountriesDTO} from '../../../../Model/Widgets/WidgetCountries';
import {IBaseViewModel} from '../../Base/interfaces';

export interface IWidgetCountriesViewModel extends IBaseViewModel {
  countryList: IBaseListDTO<IWidgetCountriesDTO>;
  countryFullList: IBaseListDTO<IWidgetCountriesDTO>;
  loadingFullList: boolean;
  getCountryList(params?: Params): Promise<void>;
  getFullCountryList(params?: Params): Promise<void>;
  setCountryList(data: IBaseListDTO<IWidgetCountriesDTO>): void;
  setFullCountryList(data: IBaseListDTO<IWidgetCountriesDTO>): void;
}
