import {IAPIModule} from '../../../../InfrastructureLayer/APIModule/interfaces';
import {
  ICFA_ReportDealDTO,
  ICFA_ReportDetailedDTO,
  ICFA_ReportDTO,
} from '../../../../Model/CFA_Reports';
import {ICFA_ReportAPIClient} from '../interfaces';
import {Params} from 'router5/dist/types/base';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {d_BaseList} from '../../../Decorators/d_BaseList';
import {injectable} from 'inversify';
import {
  CFA_REPORT_DEALS_CA_MOCK,
  CFA_REPORT_DEALS_GA_MOCK,
  CFA_REPORT_MOCK,
  CFA_REPORTS_MOCK,
} from '../../../../Model/CFA_Reports/mock';

@injectable()
export class CFA_ReportsAPIClient implements ICFA_ReportAPIClient {
  protected urlPrefix!: string;
  protected apiModule!: IAPIModule;

  getReportDetailed(reportId: string): Promise<ICFA_ReportDetailedDTO> {
    if (process.env.REACT_APP_MOCK) {
      return new Promise<ICFA_ReportDetailedDTO>((resolve) =>
        setTimeout(() => resolve(CFA_REPORT_MOCK), 1000)
      );
    }
    return this.apiModule.getData(`${this.urlPrefix}/detailed-common`, {
      reportId: reportId,
    });
  }

  @d_BaseList
  async getItems(params?: Params): Promise<IBaseListDTO<ICFA_ReportDTO>> {
    if (process.env.REACT_APP_MOCK) {
      return new Promise<IBaseListDTO<ICFA_ReportDTO>>((resolve) =>
        setTimeout(
          () =>
            resolve({items: CFA_REPORTS_MOCK, total: CFA_REPORTS_MOCK.length}),
          1000
        )
      );
    }
    return this.apiModule.getData<IBaseListDTO<ICFA_ReportDTO>>(
      `${this.urlPrefix}/bank`,
      params
    );
  }

  @d_BaseList
  async getReportGeneralAgreements(
    reportId: string,
    params?: Params
  ): Promise<IBaseListDTO<ICFA_ReportDealDTO>> {
    if (process.env.REACT_APP_MOCK) {
      return new Promise<IBaseListDTO<ICFA_ReportDealDTO>>((resolve) =>
        setTimeout(
          () =>
            resolve({
              items: CFA_REPORT_DEALS_GA_MOCK,
              total: CFA_REPORT_DEALS_GA_MOCK.length,
            }),
          1000
        )
      );
    }
    if (params) params.reportId = reportId;
    return this.apiModule.getData<IBaseListDTO<ICFA_ReportDealDTO>>(
      `${this.urlPrefix}/detailed-deals/general-agreement`,
      params
    );
  }

  @d_BaseList
  async getReportCreditAgreements(
    reportId: string,
    params?: Params
  ): Promise<IBaseListDTO<ICFA_ReportDealDTO>> {
    if (process.env.REACT_APP_MOCK) {
      return new Promise<IBaseListDTO<ICFA_ReportDealDTO>>((resolve) =>
        setTimeout(
          () =>
            resolve({
              items: CFA_REPORT_DEALS_CA_MOCK,
              total: CFA_REPORT_DEALS_CA_MOCK.length,
            }),
          1000
        )
      );
    }
    if (params) params.reportId = reportId;
    return this.apiModule.getData<IBaseListDTO<ICFA_ReportDealDTO>>(
      `${this.urlPrefix}/detailed-deals/credit-agreement`,
      params
    );
  }
}
