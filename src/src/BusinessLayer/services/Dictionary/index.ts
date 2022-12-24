import {IDictionaryService} from './interfaces';
import {IDictionaryAPIClient} from '../../../IntegrationLayer/APIClients/Dictionary/interfaces';
import {
  ICurrencyDTO,
  IDictionaryCountriesDTO,
  IDictionaryTerritorialBankDTO,
} from '../../../Model/Dictionary';
import {IBaseListDTO} from '../../../Model/BaseList';
import {Params} from 'router5/dist/types/base';
import {inject, injectable} from 'inversify';
import {API_CLIENT} from '../../../IntegrationLayer/identifiers';

@injectable()
export class DictionaryService implements IDictionaryService {
  @inject(API_CLIENT.Dictionary) protected APIClient!: IDictionaryAPIClient;

  getIndividualCategories = async () => {
    return this.APIClient.getIndividualCategories();
  };
  getCFAStatuses = async () => {
    return this.APIClient.getCFAStatuses();
  };
  getCFAIndustries = async () => {
    return this.APIClient.getOkk(1);
  };
  getCountries = async (
    params: Params
  ): Promise<IBaseListDTO<IDictionaryCountriesDTO>> => {
    return this.APIClient.getCountries(params);
  };
  getTerritorialBanks = async (): Promise<IDictionaryTerritorialBankDTO[]> => {
    return this.APIClient.getTerritorialBanks();
  };

  createTerritorialBank = async (data: IDictionaryTerritorialBankDTO) => {
    return this.APIClient.createTerritorialBank(data);
  };
  updateTerritorialBank = async (data: IDictionaryTerritorialBankDTO) => {
    return this.APIClient.updateTerritorialBank(data);
  };
  deleteTerritorialBank = async (id: string) => {
    return this.APIClient.deleteTerritorialBank(id);
  };
  getCurrencies = async (
    params: Params
  ): Promise<IBaseListDTO<ICurrencyDTO>> => {
    return this.APIClient.getCurrencies(params);
  };
}
