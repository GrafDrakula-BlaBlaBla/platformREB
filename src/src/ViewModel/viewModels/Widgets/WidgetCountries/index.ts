import {action, makeObservable, observable} from 'mobx';
import {Params} from 'router5/dist/types/base';
import {IWidgetCountriesService} from '../../../../BusinessLayer/services/Widgets/WIdgetCountries/interfaces';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {IWidgetCountriesDTO} from '../../../../Model/Widgets/WidgetCountries';
import {BaseViewModel} from '../../Base';
import {IWidgetCountriesViewModel} from './interfaces';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../BusinessLayer/identifiers';

@injectable()
export class WidgetCountriesViewModel
  extends BaseViewModel
  implements IWidgetCountriesViewModel {
  @inject(SERVICE.WidgetCountries) protected service!: IWidgetCountriesService;

  constructor() {
    super();
    makeObservable(this, {
      countryList: observable,
      countryFullList: observable,
      loadingFullList: observable,
      setLoadingFullList: action,
      setCountryList: action,
      setFullCountryList: action,
    });
  }

  countryList: IBaseListDTO<IWidgetCountriesDTO> = {items: [], total: 0};
  countryFullList: IBaseListDTO<IWidgetCountriesDTO> = {items: [], total: 0};
  loadingFullList: boolean = false;

  setLoadingFullList = (value: boolean) => {
    this.loadingFullList = value;
  };

  getCountryList = async (params?: Params) => {
    this.setLoading();
    const list = await this.service.getCountryList(params).finally(() => {
      this.unsetLoading();
    });
    this.setCountryList(list);
  };

  getFullCountryList = async (params?: Params) => {
    this.setLoadingFullList(true);
    const list = await this.service.getCountryList(params).finally(() => {
      this.setLoadingFullList(false);
    });
    this.setFullCountryList(list);
  };

  setCountryList = (data: IBaseListDTO<IWidgetCountriesDTO>) => {
    this.countryList = data;
  };

  setFullCountryList = (data: IBaseListDTO<IWidgetCountriesDTO>) => {
    this.countryFullList = data;
  };
}
