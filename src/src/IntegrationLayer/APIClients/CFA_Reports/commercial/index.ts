import {Params} from 'router5/dist/types/base';
import {IAPIModule} from '../../../../InfrastructureLayer/APIModule/interfaces';
import {CFA_ReportsAPIClient} from '../base';
import {
  ICFA_ReportDealDTO,
  ICFA_ReportDetailedDTO,
  ICFA_ReportDTO,
} from '../../../../Model/CFA_Reports';
import {ICFA_ReportCommercialAPIClient} from '../interfaces';
import {IBaseListDTO} from '../../../../Model/BaseList';
import mockSession from '../../../../Model/Session/mock';
import {d_BaseList} from '../../../Decorators/d_BaseList';
import {inject, injectable} from 'inversify';
import {INFRASTRUCTURE_MODULE} from '../../../../InfrastructureLayer/identifiers';

@injectable()
export class CFA_ReportsCommercialAPIClient
  extends CFA_ReportsAPIClient
  implements ICFA_ReportCommercialAPIClient {
  protected urlPrefix: string = 'credit-for-accreditive/report';
  @inject(INFRASTRUCTURE_MODULE.APIModule) protected apiModule!: IAPIModule;

  @d_BaseList
  async getItems(params?: Params): Promise<IBaseListDTO<ICFA_ReportDTO>> {
    if (process.env.NODE_ENV === 'development') {
      if (!params) params = {};
      params.bankId = mockSession?.bank.objectId;
      params.bankType = 'COM';
      return super.getItems(params);
    }
    return this.apiModule.getData(`${this.urlPrefix}/commercial/bank`, params);
  }

  getReportDetailed(reportId: string): Promise<ICFA_ReportDetailedDTO> {
    if (process.env.NODE_ENV === 'development') {
      return super.getReportDetailed(reportId);
    }
    return this.apiModule.getData(
      `${this.urlPrefix}/commercial/${reportId}/detailed-common`
    );
  }

  createReportEnable = async () => {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.getData<boolean>(`${this.urlPrefix}/is-valid/date`);
    }
    return this.apiModule.getData<boolean>(
      `${this.urlPrefix}/commercial/is-valid/date`
    );
  };
  createReport = async (): Promise<ICFA_ReportDTO> => {
    if (process.env.NODE_ENV === 'development') {
      return this.apiModule.postData<ICFA_ReportDTO>(
        `${this.urlPrefix}/${mockSession?.bank.objectId}`
      );
    }
    return this.apiModule.postData<ICFA_ReportDTO>(
      `${this.urlPrefix}/commercial`
    );
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
      `${this.urlPrefix}/commercial/${reportId}/detailed-deals/general-agreement`,
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
      `${this.urlPrefix}/commercial/${reportId}/detailed-deals/credit-agreement`,
      params
    );
  }
}
