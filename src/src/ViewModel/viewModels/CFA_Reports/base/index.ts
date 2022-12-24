import {ICFA_ReportsService} from '../../../../BusinessLayer/services/CFA_Reports';
import {ListViewModel} from '../../List';
import {ICFA_ReportsViewModel} from '../interfaces';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {Params} from 'router5/dist/types/base';
import {action, makeObservable, observable} from 'mobx';
import {
  ICFA_ReportDealDTO,
  ICFA_ReportDetailedDTO,
  ICFA_ReportDTO,
} from '../../../../Model/CFA_Reports';
import {injectable} from 'inversify';

@injectable()
export class CFA_ReportsViewModel
  extends ListViewModel<ICFA_ReportDTO, ICFA_ReportsService>
  implements ICFA_ReportsViewModel {
  reports: Array<ICFA_ReportDTO> = [];
  report?: ICFA_ReportDetailedDTO;
  reportGeneralAgreements?: IBaseListDTO<ICFA_ReportDealDTO>;
  reportCreditAgreements?: IBaseListDTO<ICFA_ReportDealDTO>;

  protected service!: ICFA_ReportsService;
  constructor() {
    super();
    makeObservable(this, {
      loadingReport: observable,
      setLoadingReport: action,
      report: observable,
      getReport: action,
      setReport: action,
      clearReport: action,

      reportGeneralAgreements: observable,
      getReportGeneralAgreements: action,
      setReportGeneralAgreements: action,

      reportCreditAgreements: observable,
      getReportCreditAgreements: action,
      setReportCreditAgreements: action,
    });
  }

  loadingReport: boolean = false;
  setLoadingReport = (value: boolean) => {
    this.loadingReport = value;
  };

  getReport = async (reportId: string): Promise<void> => {
    this.setLoadingReport(true);
    try {
      const data = await this.service.getReportDetailed(reportId);
      this.setReport(data);
    } finally {
      this.setLoadingReport(false);
    }
  };
  setReport = (data?: ICFA_ReportDetailedDTO) => {
    this.report = data;
  };
  clearReport = () => {
    this.report = undefined;
    this.setReportGeneralAgreements(undefined);
    this.setReportCreditAgreements(undefined);
  };

  setReportGeneralAgreements = (data?: IBaseListDTO<ICFA_ReportDealDTO>) => {
    this.reportGeneralAgreements = data;
  };
  getReportGeneralAgreements = async (
    reportId: string,
    params?: Params
  ): Promise<void> => {
    this.setLoading();
    try {
      const deals = await this.service.getReportGeneralAgreements(
        reportId,
        params
      );
      this.setReportGeneralAgreements(deals);
    } finally {
      this.unsetLoading();
    }
  };

  setReportCreditAgreements = (data?: IBaseListDTO<ICFA_ReportDealDTO>) => {
    this.reportCreditAgreements = data;
  };
  getReportCreditAgreements = async (
    reportId: string,
    params?: Params
  ): Promise<void> => {
    this.setLoading();
    try {
      const deals = await this.service.getReportCreditAgreements(
        reportId,
        params
      );
      this.setReportCreditAgreements(deals);
    } finally {
      this.unsetLoading();
    }
  };
}
