import {ICFA_ReportsCommercialService} from '../../../../BusinessLayer/services/CFA_Reports';
import {ICFA_ReportsCommercialViewModel} from '../interfaces';
import {CFA_ReportsViewModel} from '../base';
import {inject, injectable} from 'inversify';
import {SERVICE} from '../../../../BusinessLayer/identifiers';

@injectable()
export class CFA_ReportsCommercialViewModel
  extends CFA_ReportsViewModel
  implements ICFA_ReportsCommercialViewModel {
  @inject(SERVICE.CFA_Reports)
  protected service!: ICFA_ReportsCommercialService;

  createReportEnable = () => {
    this.setLoadingReport(true);
    return this.service
      .createReportEnable()
      .finally(() => this.setLoadingReport(false));
  };

  createReport = () => {
    this.setLoadingReport(true);
    return this.service
      .createReport()
      .finally(() => this.setLoadingReport(false));
  };
}
