import {
  ICurrencyDTO,
  IDictionaryCountriesDTO,
  IDictionaryDTO,
  IDictionaryTerritorialBankDTO,
} from '../../../Model/Dictionary';
import {IBaseViewModel} from '../Base/interfaces';
import {IBaseListDTO} from '../../../Model/BaseList';
import {Params} from 'router5/dist/types/base';

export interface IDictionaryViewModel extends IBaseViewModel {
  individualCategories?: IDictionaryDTO;
  cfaStatuses?: IDictionaryDTO;
  cfaIndustries?: IDictionaryDTO;
  countriesList?: IBaseListDTO<IDictionaryCountriesDTO>;
  territorialBanks?: IDictionaryTerritorialBankDTO[];
  territorialBanksDictionary?: IDictionaryDTO;
  currencies?: IBaseListDTO<ICurrencyDTO>;

  getIndividualCategories(): Promise<IDictionaryDTO>;
  getCFAStatuses(): Promise<IDictionaryDTO>;
  getCFAIndustries(): Promise<IDictionaryDTO>;
  getCountries(params: Params): Promise<IBaseListDTO<IDictionaryCountriesDTO>>;
  getTerritorialBanks(): Promise<IDictionaryTerritorialBankDTO[]>;
  getCurrencies(params: Params): Promise<IBaseListDTO<ICurrencyDTO>>;
  getCurrency(params: Params): Promise<ICurrencyDTO>;
}
