import {
  ICurrencyDTO,
  IDictionaryCountriesDTO,
  IDictionaryDTO,
  IDictionaryTerritorialBankDTO,
} from '../../../Model/Dictionary';
import {IAPIModule} from '../../../InfrastructureLayer/APIModule/interfaces';
import {IDictionaryAPIClient} from './interfaces';
import {BaseListDTO, IBaseListDTO} from '../../../Model/BaseList';
import {Params} from 'router5/dist/types/base';
import mockSession from '../../../Model/Session/mock';
import {d_BaseList} from '../../Decorators/d_BaseList';
import {inject, injectable} from 'inversify';
import {INFRASTRUCTURE_MODULE} from '../../../InfrastructureLayer/identifiers';
import {CURRENCY_MOCK} from '../../../Model/Dictionary/mock';

@injectable()
export class DictionaryAPIClient implements IDictionaryAPIClient {
  protected urlPrefix: string = 'dictionary';

  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;

  getCFAStatuses = async () => {
    return this.apiModule.getData<IDictionaryDTO>(
      `${this.urlPrefix}/credit-for-accreditive/statuses`
    );
  };
  getIndividualCategories = async () => {
    return this.apiModule.getData<IDictionaryDTO>(
      `${this.urlPrefix}/individual-categories`
    );
  };
  getOkk = async (depth: number) => {
    return this.apiModule.getData<IDictionaryDTO>(`${this.urlPrefix}/okk`, {
      depth: depth,
    });
  };

  @d_BaseList
  getCountries(params: Params): Promise<IBaseListDTO<IDictionaryCountriesDTO>> {
    return this.apiModule.getData<IBaseListDTO<IDictionaryCountriesDTO>>(
      `${this.urlPrefix}/country`,
      params
    );
  }

  async getTerritorialBanks() {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.getData<IDictionaryTerritorialBankDTO[]>(
        `${this.urlPrefix}/tb`,
        {
          bankId: mockSession?.bank?.objectId,
        }
      );
    }
    return this.apiModule.getData<IDictionaryTerritorialBankDTO[]>(
      `${this.urlPrefix}/tb`
    );
  }

  createTerritorialBank = async (data: IDictionaryTerritorialBankDTO) => {
    return this.apiModule.postData<IDictionaryTerritorialBankDTO>(
      `${this.urlPrefix}/tb`,
      data
    );
  };
  updateTerritorialBank = async (data: IDictionaryTerritorialBankDTO) => {
    return this.apiModule.putData<IDictionaryTerritorialBankDTO>(
      `${this.urlPrefix}/tb/${data.id}`,
      data
    );
  };
  deleteTerritorialBank = async (id: string) => {
    return this.apiModule.deleteData(`${this.urlPrefix}/tb/${id}`);
  };

  @d_BaseList
  getCurrencies(params: Params): Promise<IBaseListDTO<ICurrencyDTO>> {
    if (process.env.REACT_APP_MOCK) {
      return new Promise<BaseListDTO<ICurrencyDTO>>((resolve) =>
        setTimeout(() => resolve(CURRENCY_MOCK), 1000)
      );
    }

    return this.apiModule.getData<BaseListDTO<ICurrencyDTO>>(
      `${this.urlPrefix}/currency`,
      params
    );
  }
}
