import {CFA_ReportsService} from '../base';
import {ICFA_ReportsRebService} from '../interfaces';
import {ICFA_ReportRebAPIClient} from '../../../../IntegrationLayer/APIClients/CFA_Reports';
import {inject, injectable} from 'inversify';
import {API_CLIENT} from '../../../../IntegrationLayer/identifiers';

@injectable()
export class CFA_ReportsRebService
  extends CFA_ReportsService
  implements ICFA_ReportsRebService {
  @inject(API_CLIENT.CFA_Reports) protected APIClient!: ICFA_ReportRebAPIClient;

  getActualBankList = async () => {
    return this.APIClient.getActualBankList();
  };

  acceptReport = (reportId: string): Promise<void> => {
    return this.APIClient.acceptReport(reportId);
  };
}
