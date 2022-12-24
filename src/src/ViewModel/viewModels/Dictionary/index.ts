import {action, computed, makeObservable, observable} from 'mobx';
import {BaseViewModel} from '../Base';
import {IDictionaryViewModel} from './interfaces';
import {
  ICurrencyDTO,
  IDictionaryCountriesDTO,
  IDictionaryDTO,
  IDictionaryTerritorialBankDTO,
} from '../../../Model/Dictionary';
import {IDictionaryService} from '../../../BusinessLayer/services/Dictionary/interfaces';
import {IBaseListDTO} from '../../../Model/BaseList';
import {Params} from 'router5/dist/types/base';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../BusinessLayer/identifiers';

@injectable()
export class DictionaryViewModel
  extends BaseViewModel
  implements IDictionaryViewModel {
  @inject(SERVICE.Dictionary) protected service!: IDictionaryService;

  constructor() {
    super();
    makeObservable(this, {
      individualCategories: observable,
      cfaStatuses: observable,
      cfaIndustries: observable,
      countriesList: observable,
      territorialBanks: observable,
      territorialBanksDictionary: computed,
      currencies: observable,
      setIndividualCategories: action,
      setCFAStatuses: action,
      setCFAIndustries: action,
      setCountries: action,
      setTerritorialBanks: action,
      setCurrencies: action,
    });
  }

  individualCategories?: IDictionaryDTO;
  cfaStatuses?: IDictionaryDTO;
  cfaIndustries?: IDictionaryDTO;
  countriesList?: IBaseListDTO<IDictionaryCountriesDTO>;
  territorialBanks?: IDictionaryTerritorialBankDTO[];
  currencies?: IBaseListDTO<ICurrencyDTO>;

  getIndividualCategories = async () => {
    const data = await this.service.getIndividualCategories();
    this.setIndividualCategories(data);
    return data;
  };
  setIndividualCategories = (data: IDictionaryDTO) => {
    this.individualCategories = data;
  };

  getCFAStatuses = async (): Promise<IDictionaryDTO> => {
    const data = await this.service.getCFAStatuses();
    this.setCFAStatuses(data);
    return data;
  };
  setCFAStatuses = (data: IDictionaryDTO) => {
    this.cfaStatuses = data;
  };

  getCFAIndustries = async () => {
    const data = await this.service.getCFAIndustries();
    this.setCFAIndustries(data);
    return data;
  };
  setCFAIndustries = (data: IDictionaryDTO) => {
    this.cfaIndustries = data;
  };

  getCountries = async (
    params: Params
  ): Promise<IBaseListDTO<IDictionaryCountriesDTO>> => {
    const list = await this.service.getCountries(params);
    this.setCountries(list);
    return list;
  };
  setCountries = (countriesList: IBaseListDTO<IDictionaryCountriesDTO>) => {
    this.countriesList = countriesList;
  };

  getTerritorialBanks = async () => {
    this.setLoading();
    const territorialBanks = await this.service.getTerritorialBanks();
    this.setTerritorialBanks(territorialBanks);
    this.unsetLoading();
    return territorialBanks;
  };
  setTerritorialBanks = (territorialBanks: IDictionaryTerritorialBankDTO[]) => {
    this.territorialBanks = territorialBanks;
  };
  get territorialBanksDictionary() {
    const banks = {} as IDictionaryDTO;
    this.territorialBanks?.forEach((bank) => {
      banks[bank.id] = bank.fullName;
    });
    return banks;
  }

  getCurrencies = async (
    params: Params
  ): Promise<IBaseListDTO<ICurrencyDTO>> => {
    const list = await this.service.getCurrencies(params);
    this.setCurrencies(list);
    return list;
  };

  getCurrency = async (params: Params): Promise<ICurrencyDTO> => {
    const list = await this.service.getCurrencies(params);
    return list.items[0];
  };
  setCurrencies = (currencies: IBaseListDTO<ICurrencyDTO>) => {
    this.currencies = currencies;
  };
}
