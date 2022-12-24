import moment from 'moment';
import {IReportDTO} from '../../../Model/Reports';
import {BaseListService} from '../BaseList';
import {IBaseListDTO} from '../../../Model/BaseList';
import {mapCreditToView} from '../Credits';
import {Params} from 'router5/dist/types/base';
import {IReportsAPIClient} from '../../../IntegrationLayer/APIClients/Reports/interfaces';
import {IReportsService} from './interfaces';
import {inject, injectable} from 'inversify';
import {API_CLIENT} from '../../../IntegrationLayer/identifiers';

@injectable()
export class ReportsService
  extends BaseListService<IReportDTO, IReportsAPIClient>
  implements IReportsService {
  @inject(API_CLIENT.Reports) protected APIClient!: IReportsAPIClient;

  initList = async (
    searchParams?: Params
  ): Promise<IBaseListDTO<IReportDTO>> => {
    const response = await super.initList(searchParams);
    response.items = response.items.map(mapReportToView);
    return response;
  };

  async getItem(id: string): Promise<IReportDTO> {
    const report = await this.APIClient.getItem(id);
    return mapReportToView(report);
  }

  async createItem(): Promise<IReportDTO> {
    const report = await this.APIClient.createItem();
    return mapReportToView(report);
  }

  async updateItem(id: string, status: string): Promise<IReportDTO> {
    const report = await this.APIClient.updateItem(id, status);
    return mapReportToView(report);
  }
}

function mapReportToView(report: IReportDTO): IReportDTO {
  const format = 'DD.MM.YYYY';
  if (report) {
    return {
      ...report,
      createDate: moment(report.createDate).format(format),
      credits: report.credits?.map(mapCreditToView),
    };
  }
  return report;
}
