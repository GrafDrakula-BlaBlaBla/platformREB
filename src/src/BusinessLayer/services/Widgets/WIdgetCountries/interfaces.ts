import {Params} from 'router5/dist/types/base';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {IWidgetCountriesDTO} from '../../../../Model/Widgets/WidgetCountries';

export interface IWidgetCountriesService {
  getCountryList: (
    params?: Params
  ) => Promise<IBaseListDTO<IWidgetCountriesDTO>>;
}
