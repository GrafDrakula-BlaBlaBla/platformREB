import {Params} from 'router5/dist/types/base';
import {IWidgetIndustryAPIClient} from '../../../../IntegrationLayer/APIClients/Widgets/WidgetIndustry/interfaces';
import {
  IIndustryDivisionOKKDTO,
  IIndustryDivisionOKVEDDTO,
} from '../../../../Model/Widgets/WidgetIndustry';
import {IWidgetIndustryService} from './interfaces';
import {inject, injectable} from 'inversify';
import {API_CLIENT} from '../../../../IntegrationLayer/identifiers';

@injectable()
export class WidgetIndustryService implements IWidgetIndustryService {
  @inject(API_CLIENT.WidgetIndustry)
  protected APIClient!: IWidgetIndustryAPIClient;

  getOKK = async (params?: Params): Promise<IIndustryDivisionOKKDTO> => {
    return this.APIClient.getOKK(params);
  };

  getOKVED = async (params?: Params): Promise<IIndustryDivisionOKVEDDTO> => {
    return this.APIClient.getOKVED(params);
  };
}
