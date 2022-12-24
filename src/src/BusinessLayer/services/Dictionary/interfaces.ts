import {
  ICurrencyDTO,
  IDictionaryCountriesDTO,
  IDictionaryDTO,
  IDictionaryTerritorialBankDTO,
} from '../../../Model/Dictionary';
import {IBaseListDTO} from '../../../Model/BaseList';
import {Params} from 'router5/dist/types/base';

export interface IDictionaryService {
  getIndividualCategories(): Promise<IDictionaryDTO>;
  getCFAStatuses(): Promise<IDictionaryDTO>;
  getCFAIndustries(): Promise<IDictionaryDTO>;
  getCountries(params: Params): Promise<IBaseListDTO<IDictionaryCountriesDTO>>;
  getTerritorialBanks(): Promise<IDictionaryTerritorialBankDTO[]>;

  createTerritorialBank(
    data: IDictionaryTerritorialBankDTO
  ): Promise<IDictionaryTerritorialBankDTO>;
  updateTerritorialBank(
    data: IDictionaryTerritorialBankDTO
  ): Promise<IDictionaryTerritorialBankDTO>;
  deleteTerritorialBank(id: string): Promise<void>;
  getCurrencies(params: Params): Promise<IBaseListDTO<ICurrencyDTO>>;
}
