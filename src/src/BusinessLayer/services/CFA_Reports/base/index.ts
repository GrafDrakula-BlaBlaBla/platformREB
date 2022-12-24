import {ICFA_ReportAPIClient} from '../../../../IntegrationLayer/APIClients/CFA_Reports';
import {ICFA_ReportsService} from '../interfaces';
import {BaseListService} from '../../BaseList';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {Params} from 'router5/dist/types/base';
import {
  ICFA_ReportDealDTO,
  ICFA_ReportDetailedDTO,
  ICFA_ReportDTO,
} from '../../../../Model/CFA_Reports';
import moment from 'moment';
import {injectable} from 'inversify';

@injectable()
export class CFA_ReportsService
  extends BaseListService<ICFA_ReportDTO, ICFA_ReportAPIClient>
  implements ICFA_ReportsService {
  protected APIClient!: ICFA_ReportAPIClient;

  getReportDetailed = async (
    reportId: string
  ): Promise<ICFA_ReportDetailedDTO> => {
    const report = await this.APIClient.getReportDetailed(reportId);
    return report || {};
  };

  getReportGeneralAgreements = async (
    reportId: string,
    params?: Params
  ): Promise<IBaseListDTO<ICFA_ReportDealDTO>> => {
    const deals = await this.APIClient.getReportGeneralAgreements(
      reportId,
      params
    );
    deals.items.forEach(this.mapReportAgreements);
    return deals;
  };

  getReportCreditAgreements = async (
    reportId: string,
    params?: Params
  ): Promise<IBaseListDTO<ICFA_ReportDealDTO>> => {
    const deals = await this.APIClient.getReportCreditAgreements(
      reportId,
      params
    );
    deals.items.forEach(this.mapReportAgreements);
    return deals;
  };

  mapReportAgreements = (item: ICFA_ReportDealDTO) => {
    item.conclusionDt = moment(item.conclusionDt).format('DD.MM.YYYY');
    item.endDate = moment(item.endDate).format('DD.MM.YYYY');
    item.exportContracts.forEach((contract) => {
      contract.exportConfirmedDocument.dateOfExportContract = moment(
        contract.exportConfirmedDocument.dateOfExportContract
      ).format('DD.MM.YYYY');
    });
  };
}
