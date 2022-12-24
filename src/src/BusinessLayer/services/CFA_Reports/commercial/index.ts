import {CFA_ReportsService} from '../base';
import {ICFA_ReportsCommercialService} from '../interfaces';
import {ICFA_ReportCommercialAPIClient} from '../../../../IntegrationLayer/APIClients/CFA_Reports';
import {inject, injectable} from 'inversify';
import {API_CLIENT} from '../../../../IntegrationLayer/identifiers';

@injectable()
export class CFA_ReportsCommercialService
  extends CFA_ReportsService
  implements ICFA_ReportsCommercialService {
  @inject(API_CLIENT.CFA_Reports)
  protected APIClient!: ICFA_ReportCommercialAPIClient;

  createReportEnable = () => {
    return this.APIClient.createReportEnable();
  };
  createReport = async () => {
    return this.APIClient.createReport();
  };
}
