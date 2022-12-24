import {Params} from 'router5/dist/types/base';
import {IAPIModule} from '../../../../InfrastructureLayer/APIModule/interfaces';
import {CFA_ReportsAPIClient} from '../base';
import {
  IActualBankCFA_ReportDTO,
  ICFA_ReportDealDTO,
  ICFA_ReportDetailedDTO,
  ICFA_ReportDTO,
} from '../../../../Model/CFA_Reports';
import {ICFA_ReportRebAPIClient} from '../interfaces';
import {IBaseListDTO} from '../../../../Model/BaseList';
import {d_BaseList} from '../../../Decorators/d_BaseList';
import {inject, injectable} from 'inversify';
import {INFRASTRUCTURE_MODULE} from '../../../../InfrastructureLayer/identifiers';

@injectable()
export class CFA_ReportsREBAPIClient
  extends CFA_ReportsAPIClient
  implements ICFA_ReportRebAPIClient {
  protected urlPrefix: string = 'credit-for-accreditive/report';
  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;

  @d_BaseList
  async getItems(params?: Params): Promise<IBaseListDTO<ICFA_ReportDTO>> {
    if (process.env.NODE_ENV === 'development') {
      if (!params) params = {};
      params.bankType = 'REB';
      return super.getItems(params);
    }
    return this.apiModule.getData<IBaseListDTO<ICFA_ReportDTO>>(
      `${this.urlPrefix}/reb/bank`,
      params
    );
  }

  getReportDetailed(reportId: string): Promise<ICFA_ReportDetailedDTO> {
    if (process.env.NODE_ENV === 'development') {
      return super.getReportDetailed(reportId);
    }
    return this.apiModule.getData(
      `${this.urlPrefix}/reb/${reportId}/detailed-common`
    );
  }

  acceptReport = async (reportId: string) => {
    if (process.env.NODE_ENV === 'development') {
      this.apiModule.putData(
        `${this.urlPrefix}/${reportId}/ACCEPTED/${new Date().getTime()}`
      );
    } else {
      this.apiModule.putData(
        `${this.urlPrefix}/reb/${reportId}/ACCEPTED/${new Date().getTime()}`
      );
    }
  };

  @d_BaseList
  async getReportGeneralAgreements(
    reportId: string,
    params?: Params
  ): Promise<IBaseListDTO<ICFA_ReportDealDTO>> {
    if (process.env.NODE_ENV === 'development') {
      return super.getReportGeneralAgreements(reportId, params);
    }
    return this.apiModule.getData<IBaseListDTO<ICFA_ReportDealDTO>>(
      `${this.urlPrefix}/reb/${reportId}/detailed-deals/general-agreement`,
      params
    );
  }

  @d_BaseList
  async getReportCreditAgreements(
    reportId: string,
    params?: Params
  ): Promise<IBaseListDTO<ICFA_ReportDealDTO>> {
    if (process.env.NODE_ENV === 'development') {
      return super.getReportCreditAgreements(reportId, params);
    }
    return this.apiModule.getData<IBaseListDTO<ICFA_ReportDealDTO>>(
      `${this.urlPrefix}/reb/${reportId}/detailed-deals/credit-agreement`,
      params
    );
  }

  getActualBankList = async (): Promise<IActualBankCFA_ReportDTO[]> => {
    if (process.env.NODE_ENV === 'development')
      return this.apiModule.getData(`${this.urlPrefix}/banks`);
    return this.apiModule.getData(`${this.urlPrefix}/reb/banks`);
  };
}
