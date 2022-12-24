import {inject, injectable} from 'inversify';
import {IWidgetIndustryAPIClient} from '../interfaces';
import {INFRASTRUCTURE_MODULE} from '../../../../../InfrastructureLayer/identifiers';
import {IAPIModule} from '../../../../../InfrastructureLayer/APIModule/interfaces';
import {Params} from 'router5/dist/types/base';
import {
  IIndustryDivisionOKKDTO,
  IIndustryDivisionOKVEDDTO,
} from '../../../../../Model/Widgets/WidgetIndustry';
import {session_kb_mock} from '../../../../../Model/Session/mock';

@injectable()
export class WidgetIndustryComAPIClient implements IWidgetIndustryAPIClient {
  protected urlPrefix: string = 'dashboard';
  @inject(INFRASTRUCTURE_MODULE.APIModule) protected APIModule!: IAPIModule;

  getOKK = async (params?: Params): Promise<IIndustryDivisionOKKDTO> => {
    if (process.env.NODE_ENV === 'development') {
      return this.APIModule.getData<IIndustryDivisionOKKDTO>(
        `${this.urlPrefix}/industrial-division/okk`,
        {
          ...params,
          bankId: session_kb_mock.bank.objectId,
        }
      ).catch(() => {
        return {depth: '', items: [], total: 0};
      });
    }
    return this.APIModule.getData(
      `${this.urlPrefix}/commercial/industrial-division/okk`,
      params
    );
  };

  getOKVED = async (params: Params): Promise<IIndustryDivisionOKVEDDTO> => {
    if (process.env.NODE_ENV === 'development') {
      return this.APIModule.getData<IIndustryDivisionOKVEDDTO>(
        `${this.urlPrefix}/industrial-division/okved2`,
        {
          ...params,
          bankId: session_kb_mock.bank.objectId,
        }
      );
    }
    return this.APIModule.getData(
      `${this.urlPrefix}/commercial/industrial-division/okved2`,
      params
    );
  };
}
